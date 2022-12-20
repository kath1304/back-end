import {User} from "./User.js";
import {Database} from "./Database.js"

class UserService {
    database;
    user;

    constructor() {
        this.database = new Database();

    }

    //GET METHOD

    get(user){
        const result= this.database.query()
    }

}


