import {database} from "../services/Database.js";

export class User {
    username;
    firstname;
    lastname;
    email;


    constructor(username, name, surname, email) {
        this.username = username;
        this.firstname = name;
        this.lastname = surname;
        this.email = email;


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

    /* METHODS*/

    //READ METHOD BY USERNAME --> RETURN COMPLETE USER OBJ
    static async getByUsername(username) {
        let result
        let newUser
        result = await database.request('SELECT * FROM `user` WHERE `username`=?', username);
        if(result.length)
            newUser = new User(result[0].username, result[0].firstname, result[0].lastname, result[0].email)
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
            arrayResult.push(new User(result[i].username, result[i].firstname, result[i].lastname, result[i].email))
        }

        return arrayResult;
    }

    //SAVE METHOD  --> PUT THE NEW USER INTO THE DB AND RETURN SET_HEADER
    async save() {
        let result
        result = await database.request('INSERT INTO user SET ?', this);

        return result;
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
        let result
        result = await database.request('UPDATE user SET ? WHERE `username`= ?', this, oldUsername);

        return result;
    }


}



