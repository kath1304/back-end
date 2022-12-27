import express from 'express'
const router = express.Router()
import {User} from "../../object/User.js";



let user;
user = new User('kath', 'caterina', 'cretoni', 'caterina.cretoni@gmail.com');



// USER GET ROUTER
router.get('/:username', async (req, res) => {
    const result= await user.getByUsername(req.params.username)
    res.send(result)
})

//USER GET ALL ROUTER
router.get('/',async (req,res)=>{
    const result= await user.getAll()
    res.send(result)
})

// USER DELETE ALL ROUTER
router.delete('/', async(req,res)=>{
    const result= await user.delete()
    res.send('db clean')
})

// USER DELETE ROUTER
router.delete('/:username',async(req,res)=>{
    const result= await user.deleteByUserName(req.params.username)
    res.send('element deleted from the db')
})


// USER POST ROUTER
router.post('/',async (req,res)=>{
    let user1;
    user1 = new User(req.body.username,req.body.firstname,req.body.lastname,req.body.email);
    await user1.save()
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