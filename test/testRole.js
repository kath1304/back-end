import {Role} from "../object/Role.js"

//const role= require("../object/Role.js");
/*chiamo i metodi per testare le richieste REST*/
const r= new Role('user1', 'userWithStandardPrivileges', 'greenLabel');
const r2= new Role('user2', 'userWithStandardPrivileges', 'greenLabel');
const r3= new Role('user3', 'userWithStandardPrivileges', 'redLabel');

r.deleteByName(r.name).then(r => console.log('eliminazione riuscita'));
r.deleteByName(r2.name).then(r => console.log('eliminazione riuscita'));
r.save().then(r => console.log('aggiunta riuscita')); //aggiungo r al db
r2.save().then(r2 => console.log('aggiunta riuscita')); //aggiungo r2 al db

const user1=  r.getByName('user1');
const userAll=  r.getAll();

const testSave = () => {
    let result = r3.save()
    if (result === r3)
        console.log('r3 role uploaded')
    console.error('r3 role upload fail')
}




















