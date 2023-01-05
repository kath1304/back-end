import express from 'express'
import {LoggedSession} from "../../object/LoggedSession.js"
import {Role} from "../../object/Role.js";
import {WebToken} from '../../services/WebToken.js'

const router = express.Router()

let webToken = new WebToken()

router.get('/:ip', async (req, res, next) => {
    let result;
    try {
        result= await LoggedSession.getByIp(req.params.ip);
    } catch (e) {
        return next(e)
    }
    if (result===null){
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }
    return res.send(result)
})

router.get('/', async (req, res, next) => {
    try{
        res.send(await LoggedSession.getAll())
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    const requiredFieldsLoggedSession = ['ip_address', 'user_username', 'access_date']
    const missingFieldsLoggedSession = []
    requiredFieldsLoggedSession.forEach((field) => {
        if (req.body[field] === undefined) missingFieldsLoggedSession.push(field)
    })
    /*se ci sono dei campi mancanti, restituisci un errore*/
    if (missingFieldsLoggedSession.length) {
        const error = new Error(`The following required fields are undefined: ${missingFieldsLoggedSession.join(', ')}`)
        error.status = 409
        return next(error)
    }
    try {
        let result = new LoggedSession(req.body.ip, req.body.username, req.body.date)
        await result.save();
        console.log('i dati sono stati caricati sul server')
    } catch (e) {
        return next(e)
    }
    res.send('dati ricevuti correttamente e caricati')
})

router.delete('/:ip', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    let result;
    try {
        result = await LoggedSession.deleteByIp(req.params.ip)
    } catch (e) {
        return next(e)
    }
    if (result?.affectedRows === 0) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }
    return res.send("deleted element with ip" + req.params.ip);
})

router.put('/:ip', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    //cerco la loggedSession su cui voglio fare l'update, se non c'è ritorno errore
    const oldLoggedSession = await LoggedSession.getByIp(req.params.ip);
    if (oldLoggedSession === null) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }

    /*se nel body, uno o più campi sono undefined, allora li pongo uguale ai campi dell'oggetto da modificare*/
    const fieldsToUpdateLoggedSession = ['ip_address', 'user_username', 'access_date']
    fieldsToUpdateLoggedSession.forEach((field) => {
        if (req.body[field] === undefined) req.body[field] = oldLoggedSession[field]
    })

    let newLoggedSession = new LoggedSession(req.body.ip, req.body.username, req.body.date)

    try{
        await newLoggedSession.updateByIp(req.params.ip)
    } catch (e) {
        return next(e)
    }
    return res.send('aggiornato elemento con ip ' + newLoggedSession.ipAddress)
})

export default router