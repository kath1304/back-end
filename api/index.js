import express from 'express'
import users from './routes/users.js'
class index {
    app
    port
    constructor() {
        this.app = express()
        this.port = 3000
    }

    init() {

        this.app.listen(this.port, () => {
            console.log('Server in ascolto su ' + this.port)
        })

        this.app.get('/', (req, res) => {
            res.send('Index home page')
        })

        this.app.use('/users', users)
    }
}

let newIndex = new index()
newIndex.init()