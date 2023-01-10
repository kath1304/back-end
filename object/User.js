import {database} from "../services/Database.js";
import {EncrypterDecrypter} from "../services/EncrypterDecrypter.js";
import crypto from "crypto";

export class User {
    username;
    firstname;
    lastname;
    email;
    password;
    salt;
    role_name;


    constructor(username, name, surname, email, role, password, salt) {
        this.username = username;
        this.firstname = name;
        this.lastname = surname;
        this.email = email;
        this.role_name = role;
        this.password = password
        this.salt = salt
    }

    /*GETTER AND SETTER*/

    //USERNAME
    get username() {
        return this.username;
    }

    set username(username) {
        this.username = username;
    }

    //NAME
    get firstname() {
        return this.firstname;
    }

    set firstname(name) {
        this.firstname = name;
    }

    //SURNAME

    get lastname() {
        return this.lastname;
    }

    set lastname(surname) {
        this.lastname = surname;
    }

    //EMAIL

    get email() {
        return this.email;
    }

    set email(email) {
        this.email = email;
    }
    get role_name(){
        return this.role_name;
    }
    set role_name(role){
        this.role_name = role;
    }

    get password() {
        return this.password
    }

    set password(password) {
        this.password = password
    }

    get salt() {
        return this.salt
    }

    set salt(salt) {
        this.salt = salt
    }

    /* METHODS*/

    //READ METHOD BY USERNAME --> RETURN COMPLETE USER OBJ
    static async getByUsername(username) {
        let result
        let newUser
        result = await database.request('SELECT * FROM `user` WHERE `username`=?', username);
        if(result.length)
            newUser = new User(result[0].username, await EncrypterDecrypter.decrypt(result[0].firstname), await EncrypterDecrypter.decrypt(result[0].lastname), await EncrypterDecrypter.decrypt(result[0].email), result[0].role_name)
        else
            return null;
        return newUser;

    }
    static async getCompleteUser(username) {
        let newUser

        let result = await database.request('SELECT * FROM `user` WHERE `username`=?', username);
        if(result.length)
            newUser = new User(result[0].username, await EncrypterDecrypter.decrypt(result[0].firstname), await EncrypterDecrypter.decrypt(result[0].lastname), await EncrypterDecrypter.decrypt(result[0].email), result[0].role_name, result[0].password, result[0].salt)
        else
            return null;

        return newUser;
    }

    //READ ALL METHOD --> RETURN ALL OBJS IN THE DB
    static async getAll() {
        let result
        let arrayResult = []
        result = await database.request('SELECT * FROM user')

        for (let i = 0; i < result.length; i++) {
            arrayResult.push(new User(result[i].username, await EncrypterDecrypter.decrypt(result[i].firstname), await EncrypterDecrypter.decrypt(result[i].lastname), await EncrypterDecrypter.decrypt(result[i].email), result[i].role_name))
        }

        return arrayResult;
    }

    //SAVE METHOD  --> PUT THE NEW USER INTO THE DB AND RETURN SET_HEADER
    async save() {
        return await database.request('INSERT INTO user VALUES  (?, ?, ?, ?, ?)',
            this.username, await EncrypterDecrypter.encryptMultipleFields(this.firstname, this.lastname, this.email), this.role_name, this.password, this.salt)
    }

    //DELETE METHOD BY USERNAME --> RETURN SET_HEADER
    static async deleteByUserName(username) {
        let result
        result = await database.request('DELETE FROM user WHERE `username`=?', username);

        return result;
    }

    //DELETE ALL METHOD AND RETURN SET_HEADER
    static async delete() {
        let result
        result = await database.request('DELETE FROM user');

        return result;
    }

    //UPDATE METHOD BY USER --> UPLOAD THE REFRESH USER INTO THE DB AND RETURN THE UPLOADED USER OBJ
    async upDateByUserName(oldUsername) {
        return await database.request('UPDATE user SET username = ?, firstname = ?, lastname = ?, email = ?, role_name = ?, `password` = ? , salt = ? WHERE username = ?',
            this.username, await EncrypterDecrypter.encrypt(this.firstname), await EncrypterDecrypter.encrypt(this.lastname), await EncrypterDecrypter.encrypt(this.email), this.role_name, this.password, this.salt, oldUsername)
    }

    static async verifyUser(bodyPassword, password, salt) {
        return password === crypto.createHash('sha256').update(bodyPassword + salt).digest('hex')
    }

    static async hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('base64').slice(0, 16)

        const hashed = crypto.createHash('sha256').update(password + salt).digest('hex')

        return {
            hashedPassword : hashed,
            salt: salt
        }
    }
}