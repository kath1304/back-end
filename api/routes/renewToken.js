import {WebToken} from '../../services/WebToken.js'
import express from 'express'

const renewToken = express.Router()
let webToken = new WebToken()

renewToken.get('/newToken', (req, res, next) => {
    let token = req.headers["authorization"]
    let data = webToken.validate(token)
    if(data) {
        res.header('Authorization', webToken.generate(data.username))
        return res.send()
    }
    const error = new Error("Token not valid")
    //aggiungere status dell'errore
    return next(error)
})

export default renewToken