import {User} from "../object/User.js";
import {database} from "../services/Database.js";

let user1;
let user2;
let user3;

let pass1;
let pass2;
const init = async() => {
    await database.init()
    pass1 = await User.hashPassword("qwerty")
    pass2 = await User.hashPassword("asdfg")

    user1 = new User('kath', 'caterina', 'cretoni', 'caterina.cretoni@gmail.com', 'user', pass1.hashedPassword, pass1.salt)
    user2 = new User('jessy', 'jessica', 'rabbit', 'jessica.robbit@gmail.com', 'admin', pass2.hashedPassword, pass2.salt)
    user3 = new User('pippo', 'franco', 'titto', 'asdf@gmail.com', 'admin', pass1.hashedPassword, pass1.salt)

    //await user1.save()
    //await user2.save()
    await user3.save()
}

await init()
