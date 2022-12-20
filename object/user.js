import {database} from "../services/Database";

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

    //READ METHOD BY USERNAME --> RETURN COMPLETE USER OBJ
   async  getByUsername(nickname){
        let result= await database.request('SELECT * FROM `user` WHERE `username`=nickname');
        console.log(result);
    }

    //SAVE METHOD  --> PUT THE NEW USER INTO THE DB
    async  save(){
        let result= await database.request('INSERT INTO user SET ?',this);
        console.log(result);
    }

    //DELETE METHOD BY USERNAME --> RETURN THE USER OBJ DELETED
    async  deleteByUserName(nickname){
        let result= await database.request('DELETE FROM user WHERE `username`=nickname');
        console.log(result);
    }

    //UPDATE METHOD BY USER --> UPLOAD THE REFRESH USER INTO THE DB
    //OSS: CASCADE
    async  upDateByUserName(user){
        let result= await database.request('UPDATE user SET ? WHERE `username`=this.username',user);
        console.log(result);
    }














}



