import express from "express";
import {Role} from "../../object/Role.js";
import bodyParser from "body-parser";

const roles = express.Router();

let role1 = new Role('user1', 'userWithStandardPrivileges', 'redLabel');

/*GET:cerca l'elemento con valore name, se non lo trova restituisce 404 not found*/
roles.get('/:name?',async (req, res, next) => {
    if(!req.params.name) return  res.send(await role1.getAll()); //se non viene passato un nome, restituisco l'intero array
    let result= new Role();
    await result.getByName(req.params.name)
    if (result)
        return res.send(result)
    const error = new Error('Resource not found')
    error.status = 404
    return next(error)
})

/*POST:prende un parametro e l'aggiunge all'array creato*/
roles.post('/', async(req, res, _next) => {
    let result= new Role(req.body.name, req.body.description, req.body.label);
    await result.save();
    console.log('i dati sono stati caricati sul server')
    res.send('dati ricevuti correttamente e caricati')
})

/*DELETE:usato per eliminare un elemento dall'array di dati*/
roles.delete('/:name', async(req, res, _next) => {
    //if (role1.getAll().length === 0) return res.send('db vuoto')

    await role1.deleteByName(req.params.name);
    return res.send("deleted element with name"+ req.params.name);
})

roles.delete('/', async(req, res, _next) => {
    await role1.deleteAll();
    return res.send("all elements deleted");
})

/*PUT usato per modificare il valore di un elemento cercandolo per parametro*/
roles.put('/:name', async(req, res, _next) => {
    if (roles.length === 0) return res.json('DB vuoto')

    let role;
    role= new Role(req.body.name, req.body.description, req.body.label);
    await role.updateByName(req.params.name);
    return res.send("role with name "+req.params.name+" updated");
})

//module.exports = roles;

export default roles













