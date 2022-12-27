import {Role} from "../object/Role.js"
import {database} from "../services/Database.js";

//const role= require("../object/Role.js");
/*chiamo i metodi per testare le richieste REST*/
let role1 = new Role('user1', 'userWithStandardPrivileges', 'redLabel');
let role2 = new Role('user2', 'userWithStandardPrivileges', 'greenLabel');
let role3 = new Role('user3', 'userWithRootPrivileges', 'blueLabel');
let role4 = new Role('user4', 'userWithStandardPrivileges', 'blackLabel');

//role1.deleteByName(role1.name).then(r => console.log('eliminazione riuscita'));
//role1.deleteByName(r2.name).then(r => console.log('eliminazione riuscita'));


//DELETE TEST METHOD-->delete all
const testDeleteAll = async () => {
    await role1.deleteAll()
}

//SAVE METHOD TEST
const testSave1 = async () => {
    let result;
    result = await role1.save()
    if (result.affectedRows === 1) console.log('role1 uploaded')
    else console.error('role1 upload fail')
}
const testSave2 = async () => {
    let result;
    result = await role2.save()
    if (result.affectedRows === 1) console.log('role2 uploaded')
    else console.error('role2 upload fail')
}
const testSave3 = async () => {
    let result;
    result = await role3.save()
    if (result.affectedRows === 1) console.log('role3 uploaded')
    else console.error('role3 upload fail')
}
const testUpdate = async () => {
    let result;
    result = await role3.update(role4)
    if (result.affectedRows === 1) console.log('role3 updated')
    else console.error('role3 fail to update')
}



/*lancio tutti i test*/
const main = async () => {
    await database.init()
    await testDeleteAll()
    await testSave1()
    await testSave2()
    await testSave3()
    await testUpdate()
}

main().catch(e => {
    database.endConnection();
    console.error(e);
    process.exit(1)
})



















