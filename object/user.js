import express from "express";

export class User

{
    _username;
    _name;
    _surname;
    _email;

    constructor(username, name, surname, email)
    {
        this._username = username;
        this._name = name;
        this._surname = surname;
        this._email = email;

    }
 //GETTER AND SETTER

    //USERNAME
    get
    username()
    {
        return this._username;
    }
    set
    username(username)
    {
        this._username = name;
    }

    //NAME
    get
    name()
    {
        return this._name;
    }
    set
    name(name)
    {
        this._name = name;
    }

    //SURNAME

    get
    surname()
    {
        return this._surname;
    }
    set
    surname(surname)
    {
        this._surname = surname;
    }

    //EMAIL

    get
    email()
    {
        return this._email;
    }
    set
    email(email)
    {
        this._email = email;
    }

}



