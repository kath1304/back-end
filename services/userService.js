import {User} from "./User.js";
import {Database} from "./Database.js"

class UserService
{
    database;
    user;

    constructor()
    {
        this.database = new Database();
        this.user= new User();
    }











    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});


