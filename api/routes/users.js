import express from 'express'
const router = express.Router()
import {User} from "../../object/User.js"

// USER GET ROUTER
router.get('/:username', async (req, res) => {
    const result= await User.getByUsername(req.params.username)
    res.send(result)
})

//USER GET ALL ROUTER
router.get('/',async (req,res)=>{
    const result= await User.getAll()
    res.send(result)
})

// USER DELETE ALL ROUTER
router.delete('/', async(req,res)=>{
    await User.delete()
    res.send('db clean')
})

// USER DELETE ROUTER
router.delete('/:username',async(req,res)=>{
    const result = await User.deleteByUserName(req.params.username)
    res.send('element deleted from the db')
})


// USER POST ROUTER
router.post('/',async (req,res, next)=>{
    const user1 = new User(req.body.username,req.body.firstname,req.body.lastname,req.body.email);
    try {
        await user1.save()
    }
    catch(e) {
        return next(e)
    }
    res.send('element add in the db')
})

// USER PUT ROUTER
router.put('/:user',async(req,res)=>{
    let user1;
    user1 = new User(req.body.username,req.body.firstname,req.body.lastname,req.body.email);
    await user1.upDateByUserName(req.params.user)
    res.send('user replace in the db')
})





export default router