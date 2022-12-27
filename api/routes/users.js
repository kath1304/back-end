import express from 'express'

const router = express.Router()

/* router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
}) */

// define the home page route
router.get('/', (req, res) => {
    res.send('Users home page');
})

// define the about route
router.get('/about', (req, res) => {
    res.send('About users');
})

export default router