import express from "express";
import {Role} from "../../object/Role.js";
import bodyParser from "body-parser";
import {WebToken} from '../../services/WebToken.js'

const roles = express.Router();

let webToken = new WebToken()

/*GET:cerca l'elemento con valore name, se non lo trova restituisce 404 not found*/
roles.get('/:name', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    let result;
    try {
        result = await Role.getByName(req.params.name);
    } catch (e) {
        return next(e)
    }
    if (result === null) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }
    return res.send(result);
})

roles.get('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    try {
        return res.send(await Role.getAll());
    } catch (e) {
        return next(e)
    }
})

/*POST:prende l'oggetto costruito con i parametri(tutti i campi tranne decription sono obbligatori) del body e l'aggiunge al db*/
roles.post('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    const requiredFieldsRole = ['name', 'label']
    const missingFieldsRole = []
    requiredFieldsRole.forEach((field) => {
        if (req.body[field] === undefined) missingFieldsRole.push(field)
    })
    /*se ci sono dei campi mancanti, restituisci un errore*/
    if (missingFieldsRole.length) {
        const error = new Error(`The following required fields are undefined: ${missingFieldsRole.join(', ')}`)
        error.status = 409
        return next(error)
    }
    try {
        let result = new Role(req.body.name, req.body.description, req.body.label);
        await result.save();
        console.log('i dati sono stati caricati sul server')
    } catch (e) {
        return next(e)
    }
    res.send('dati ricevuti correttamente e caricati')
})

/*DELETE:usato per eliminare un elemento dal db*/
roles.delete('/:name', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    let result;
    try {
        result = await Role.deleteByName(req.params.name);
    } catch (e) {
        return next(e)
    }
    if (result?.affectedRows === 0) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }
    return res.send("deleted element with name" + req.params.name);
})

roles.delete('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    try {
        await Role.deleteAll();
    } catch (e) {
        return next(e)
    }
    return res.send("all elements deleted");
})

/*PUT usato per modificare il valore di un elemento cercandolo per parametro*/
roles.put('/:name', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    //cerco il ruolo su cui voglio fare l'update, se non c'è ritorno errore
    const oldRole = await Role.getByName(req.params.name);
    if (oldRole === null) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }

    /*se nel body, uno o più campi sono undefined, allora li pongo uguale ai campi dell'oggetto da modificare*/
    const fieldsToUpdate = ['name', 'description', 'label']
    fieldsToUpdate.forEach((field) => {
        if (req.body[field] === undefined) req.body[field] = oldRole[field]
    })

    let role;
    role = new Role(req.body.name, req.body.description, req.body.label);
    try {
        await role.updateByName(req.params.name);
    } catch (e) {
        return next(e)
    }
    return res.send("role with name " + req.params.name + " updated");
})


export default roles













