import {Role} from './Role.js';
import {Database} from './Database.js';

const database= new Database();
const findByNome= (nome) => {
    database.query("SELECT * FROM role WHERE role.nome=name");

}
const findAll= () => {
    database.query("SELECT * FROM role WHERE role.nome=name");

}






















