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

    //GETTER AND SETTER

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
        this.lastname= surname;
    }

    //EMAIL

    get email() {
        return this.email;
    }

    set email(email) {
        this.email = email;
    }

    //READ METHOD BY USERNAME --> RETURN COMPLETE USER OBJ
    async getByUsername(nickname) {
        let result

        try {
            result = await database.request('SELECT * FROM `user` WHERE `username`=nickname');
            console.log(result);
        } catch (error) {
            console.error(error)
        }
        return result;
    }

    //SAVE METHOD  --> PUT THE NEW USER INTO THE DB AND RETURN THE OBJ
    async save() {
        let result
        try {
            result = await database.request('INSERT INTO user SET ?', this);
            console.log(result);
        } catch (error) {
            console.error(error)
        }
        return result;
    }

    //DELETE METHOD BY USERNAME --> RETURN THE USER OBJ DELETED
    async deleteByUserName(nickname) {
        let result
        try {
            result = await database.request('DELETE FROM user WHERE `username`=nickname');
            console.log(result);
        } catch (error) {
            console.log(error)
        }
        return result;
    }

    //UPDATE METHOD BY USER --> UPLOAD THE REFRESH USER INTO THE DB AND RETURN THE UPLOADED USER OBJ
    //OSS: CASCADE
    async upDateByUserName(user) {
        let result
        try {
            result = await database.request('UPDATE user SET ? WHERE `username`=this.username', user);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        return result;
    }


}



