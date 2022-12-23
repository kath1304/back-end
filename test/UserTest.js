import {User} from "../object/User.js";
import {database} from "../services/Database.js";


//CREATE USER
let user;
let user1;
let user2;
let user3;
let user4;
user = new User('kath', 'caterina', 'cretoni', 'caterina.cretoni@gmail.com');
user1 = new User('jessy', 'jessica', 'rabbit', 'jessica.robbit@gmail.com');
user2 = new User('007', 'james', 'bond', 'james.bond@gmail.com');
user3 = new User('tommy', 'tom', 'hollan', 'tom.holland@gmail.com');
user4 = new User('madame', 'marie', 'rose', 'marie.rose@gmail.com');


//SAVE METHOD TEST
const testSave = () => {
    let result;
    result = user.save()
    if (result === user)
        console.log('kath user uploaded')
    console.error('kath user upload fail')
}

const testSave2 = () => {
    let result;
    result = user2.save()
    if (result === user2)
        console.log('james user uploaded')
    console.error('james user upload fail')
}

const testSave3 = () => {
    let result;
    result = user1.save()
    if (result === user1)
        console.log('jessy user uploaded')
    console.error('jessy user upload fail')
}

const testSave4 = () => {
    let result;
    result = user3.save()
    if (result === user3)
        console.log('tom user uploaded')
    console.error('tom user upload fail')
}

//READ METHOD TEST
const testRead = async () => {
    let result;
    result = await user.getByUsername('kath')
    if (result.username === user.username) {
        console.log('kath user is in the db,you can read it')
        console.log(user)
        return
    }
    console.error('kath user is not in the db')
}

//UPDATE METHOD TEST
const testUpDate = () => {
    let result;
    result = user.upDateByUserName(user4)
    if (result === user1)
        console.log('kath user replaced with madame one')
    console.error('fail')
}

//DELETE TEST METHOD-->delete all
const testDelete = () => {
    let result;
    result = user1.deleteByUserName('jessy')
    if (result === user1)
        console.log('jessy user deleted')
    console.error('not fount or not deleted')
}

const main = async () => {
    await database.init()
    // testSave()
    // testSave2()
    //testSave3()
//testSave4()
    await testRead()
//testUpDate()
//testDelete()
}

main.catch(e => {
    database.endConnection();
    console.error(e);
    process.exit(1)
})




