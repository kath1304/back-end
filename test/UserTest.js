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
const testSave = async () => {
    let result;
    result = await user.save()
    if (result.affectedRows === 1) {
        console.log('kath user uploaded')
        return
    }
    console.error('kath user upload fail')
}

const testSave2 = async () => {
    let result;
    result = await user2.save()
    if (result.affectedRows === 1) {
        console.log('james user uploaded')
        return
    }
    console.error('james user upload fail')
}

const testSave3 = async () => {
    let result;
    result = await user1.save()
    if (result.affectedRows === 1) {
        console.log('jessy user uploaded')
        return
    }
    console.error('jessy user upload fail')
}

const testSave4 = async () => {
    let result;
    result = await user3.save()
    if (result.affectedRows === 1) {
        console.log('tom user uploaded')
        return
    }
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
const testUpDate = async () => {
    let result;
    result = await user.upDateByUserName(user4)
    if (result.affectedRows === 1) {
        console.log('kath user replaced with madame one')
        return
    }
    console.error('fail')
}

//DELETE TEST METHOD-->delete all
const testDeleteUser = async () => {
    let result;
    result = await user1.deleteByUserName('jessy')
    if (result.affectedRows === 1) {
        console.log('jessy user deleted')
        return
    }
    console.error('not fount or not deleted')
}

//DELETE TEST METHOD-->delete a user
const testDelete = async () => {
    let result;
    result = await user1.delete()
    if (result.affectedRows === 4)
        console.log('database clean')
    console.error('not fount or not deleted')
}

const main = async () => {
    await database.init()
    await testSave()
    await testSave2()
    await testSave3()
    await testSave4()
    await testRead()
    await testDelete()
    await testUpDate()
    await testDeleteUser()
}

main().catch(e => {
    database.endConnection();
    console.error(e);
    process.exit(1)
})




