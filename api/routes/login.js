import express from 'express'
import {User} from '../../object/User.js'
import {WebToken} from '../../services/WebToken.js'

const login = express.Router()
let webToken = new WebToken()

login.get('/auth', async (req, res, next) => {
    let user = await User.verifyAndGetUser(req.body.username, req.body.password)
    if(!user) {
        let error = new Error("Credenziali errate o utente inesistente")
        //aggiungere codice errore
        return next(error)
    }
    res.header("Authorization", webToken.generate(user))
    return res.send()
})

export default login