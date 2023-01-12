import express from 'express'
import {WebToken} from '../../services/WebToken.js'
import {LoggedSession} from "../../object/LoggedSession.js"

const logout = express.Router()
let webToken = new WebToken()

logout.get('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    let data = webToken.validate(token)
    if(!data) {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    await LoggedSession.deleteByUsername(data.username)
    return res.send()
})

logout.post('/delete', async (req, res, next) => {
    await LoggedSession.deleteByUsername(req.body.username)
    return res.send()
})
export default logout