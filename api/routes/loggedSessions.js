import express from 'express'
import {LoggedSession} from "../../object/LoggedSession.js"

const router = express.Router()

let loggedSession = new LoggedSession()

router.get('/', async (req, res) => {
    res.send(await loggedSession.getAll())
})

router.get('/:ip', async (req, res) => {
    const result = await loggedSession.getByIp(req.params.ip)
    if (result) res.send(result)
    else res.send('nessun elemento con ip ' + req.params.ip)
})

router.post('/', async (req, res) => {
    let newLoggedSession = await new LoggedSession(req.body.ip, req.body.username, req.body.date)
    const result = await newLoggedSession.save()
    if(result) res.send('aggiunto elemento con ip ' + req.body.ip)
    else res.send('errore')
})

router.delete('/:ip', async (req, res) => {
    await loggedSession.deleteByIp(req.params.ip)
    res.send('rimosso elemento con ip ' + req.params.ip)
})

router.put('/:ip', async (req, res) => {
    const newLoggedSession = new LoggedSession(req.body.ip, req.body.username, req.body.date)
    await newLoggedSession.updateByIp(req.params.ip)
    res.send('aggiornato elemento con ip ' + newLoggedSession.ipAddress)
})

export default router