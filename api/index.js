import express from 'express'
import users from './routes/users.js'
import loggedSessions from "./routes/loggedSessions.js";
import roles from "./routes/roles.js";
import {database} from "../services/Database.js";
import bodyParser from "body-parser";
import {WebToken} from "../services/WebToken.js"
import renewToken from "./routes/renewToken.js"
import login from "./routes/login.js"
import cors from 'cors'

const authorize = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(token) {
        const newToken = new WebToken()
        if(newToken.validate(token)) {
            next()
        }
        else res.sendStatus(403)
    }
    else {
        res.sendStatus(401)
    }
}

class index {
    app
    port
    constructor() {
        this.app = express()
        this.port = 3001
    }

    async init() {
        await database.init()

        this.app.use(bodyParser.json({limit: '50mb'}))
        this.app.use(cors())

        this.app.listen(this.port, () => {
            console.log('Server in ascolto su ' + this.port)
        })

        this.app.get('/validate', (req, res) => {
            if(!req.headers["authorization"]) return res.send(false)
            const token = req.headers["authorization"].split(" ")[1]
            if(token){
                const newToken = new WebToken()
                if(newToken.validate(token)) {
                    return res.send(true)
                }
            }
            return res.send(false)
        })

        this.app.use('/login', login)
        this.app.use(authorize)
        this.app.use('/users', users)
        this.app.use('/loggedSessions', loggedSessions)
        this.app.use('/roles', roles)
        this.app.use('/renewToken', renewToken)
    }
}

let newIndex = new index()
await newIndex.init()