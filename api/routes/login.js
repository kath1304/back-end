import express from 'express'
import {User} from '../../object/User.js'
import {WebToken} from '../../services/WebToken.js'

const login = express.Router()
let webToken = new WebToken()

login.get('/auth', async (req, res, next) => {
    let username = await User.verifyAndGetUser(req.body.username, req.body.password)
    if(!username) {
        let error = new Error("Credenziali errate o utente inesistente")//aggiungere username
        error.status(403)
        return next(error)
    }
    res.header("Authorization", webToken.generate(username))
    return res.send()
})

export default login