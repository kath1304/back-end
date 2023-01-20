import express from 'express'
import {User} from '../../object/User.js'
import {WebToken} from '../../services/WebToken.js'
import {LoggedSession} from "../../object/LoggedSession.js"

const login = express.Router()
let webToken = new WebToken()

login.post('/auth', async (req, res, next) => {
    let user = await User.getCompleteUser(req.body.username)
    if(!user) {
        let error = new Error(`username ${req.body.username} not valid`)
        error.status = 403
        return next(error)
    }
    let verified = await User.verifyUser(req.body.password, user.password, user.salt)
    if(!verified) {
        let error = new Error("Wrong Password")
        error.status = 403
        return next(error)
    }
    let newToken = webToken.generate(user.username, user.role_name)
    let session = new LoggedSession(req.ip, user.username, new Date())
    await session.save()
    return res.json({
        token: newToken,
        role: user.role_name,
        username: user.username,
    })
})

export default login