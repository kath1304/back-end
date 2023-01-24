import express from 'express'

const router = express.Router()
import {User} from "../../object/User.js"
import {WebToken} from '../../services/WebToken.js'

let webToken = new WebToken()


// USER GET ROUTER
router.get('/:username', async (req, res, next) => {
    let result;
    try {
        result = await User.getByUsername(req.params.username)
    } catch (e) {
        return next(e)
    }
    if (result === null) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }
    res.send(result)

})

//USER GET ALL ROUTER
router.get('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    let result;
    try {
        result = await User.getAll()
    } catch (e) {
        return next(e);
    }
    res.send(result)
})

// USER DELETE ALL ROUTER
router.delete('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    try {
        await User.delete()
    } catch (e) {
        return next(e);
    }
    res.send('Database clean')
})

// USER DELETE ROUTER
router.delete('/:username', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    let result;
    try {
        result = await User.deleteByUserName(req.params.username)
    } catch (e) {
        return next(e)
    }
    if (result?.affectedRows === 0) {
        const error = new Error('Resource not found or not deleted')
        error.status = 404
        return next(error)
    }
    res.send('element deleted from the Database')
})

// USER POST ROUTER
router.post('/', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }

    //check if user with username given already exists
    if(await User.getByUsername(req.body.username)) {
        const error = new Error('Duplicate entry in DB')
        error.status = 409
        return next(error)
    }

    const requiredFieldsUser = ['username', 'firstname', 'lastname', 'email', 'password']
    const missingFieldsUser = []

    /*if there's a field not defined put it in the missingFields array*/
    requiredFieldsUser.forEach((field) => {
        if (req.body[field] === undefined)
            missingFieldsUser.push(field)
    })

    /*if there's some empty fields -> error*/
    if (missingFieldsUser.length) {
        const error = new Error(`The following required fields is/are undefined: ${missingFieldsUser.join(' , ')}`)
        error.status = 400
        return next(error)
    }
    let values = await User.hashPassword(req.body.password)
    const user = new User(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.role_name, values.hashedPassword, values.salt);
    try {
        await user.save()
    } catch (e) {
        return next(e)
    }
    res.send('element add in the Database')
})

// USER PUT ROUTER
router.put('/:user', async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(webToken.validate(token).role === 'user') {
        let error = new Error("Not authorized")
        error.status = 403
        return next(error)
    }
    //At first search the element to be replaced, if there's not -->error
    const oldUser = await User.getCompleteUser(req.params.user);
    if (oldUser === null) {
        const error = new Error('Resource not found')
        error.status = 404
        return next(error)
    }

    //check if user with username given already exists
    if(await User.getByUsername(req.body.username) !== oldUser.username) {
        const error = new Error('Duplicate entry in DB')
        error.status = 409
        return next(error)
    }

    if(req.body.password) {
        let values = await User.hashPassword(req.body.password)
        req.body.password = values.hashedPassword
        req.body.salt = values.salt
    }
    //if in the new obj there's undefined fields, these will be equal to old ones
    const fieldsToUpdateUser = ['username', 'firstname', 'lastname', 'email', 'role_name', 'password', 'salt']
    fieldsToUpdateUser.forEach((field) => {
        if (req.body[field] === undefined)
            req.body[field] = oldUser[field]
    })
    let user;
    user = new User(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.role_name, req.body.password, req.body.salt);
    try {
        await user.upDateByUserName(req.params.user)
    } catch (e) {
        return next(e);
    }
    res.send('user replace in the db')
})


export default router