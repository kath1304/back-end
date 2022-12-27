import express from 'express'
import users from './routes/users.js'
import loggedSessions from "./routes/loggedSessions.js";
import roles from "./routes/roles.js";
import {database} from "../services/Database.js";
import bodyParser from "body-parser";
class index {
    app
    port
    constructor() {
        this.app = express()
        this.port = 3000
    }

    async init() {
        await database.init()
        this.app.use(bodyParser.json({limit: '50mb'}))

        this.app.listen(this.port, () => {
            console.log('Server in ascolto su ' + this.port)
        })

        this.app.get('/', (req, res) => {
            res.send('Index home page')
        })

        this.app.use('/users', users)
        this.app.use('/loggedSessions', loggedSessions)
        this.app.use('/roles', roles)
    }
}

let newIndex = new index()
await newIndex.init()