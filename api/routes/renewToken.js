import {WebToken} from '../../services/WebToken.js'
import express from 'express'

const renewToken = express.Router()
let webToken = new WebToken()

renewToken.get('/', (req, res, next) => {
    let token = req.headers["authorization"].split(" ")[1]
    let data = webToken.validate(token)
    if(data) {
        let newToken = webToken.generate(data.username, data.role)
        return res.json({
            token: newToken,
            role: data.role
        })
    }
    const error = new Error("Token not valid")
    error.status = 403
    return next(error)
})

export default renewToken