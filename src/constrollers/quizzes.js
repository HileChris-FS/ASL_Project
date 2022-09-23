const express = require('express');
const router = express.Router();
const {Quiz} = require('../models')
const { isAuthenticated } = require('../middlewares/auth')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}))


router.get('/', isAuthenticated, async (req, res) => {
    const quizzes = await Quiz.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        res.render('quiz/index', {quizzes})
    }
});

router.get('/new', isAuthenticated, (req,res) => {
    res.render('quiz/create')
})

router.post('/', isAuthenticated, async (req, res) => {
    const { name, weight } = req.body
    const quizzes = await Quiz.create({ name, weight })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        res.redirect('/quizzes/' + quizzes.id)
    }
   
});

router.get('/:id', isAuthenticated, async(req, res) => {
    const quizzes = await Quiz.findByPk(req.params.id)
    
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        res.render('quiz/show', { quizzes })
    }
    
});

router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const quizzes = await Quiz.findByPk(req.params.id)
    res.render('quiz/edit', { quizzes})
})

router.post('/:id', async (req, res) => {
    const { name, weight } = req.body
    const { id } =req.params
    const quizzes = await Quiz.update({ name, weight }, {
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        res.redirect('/quizzes/' + id)
    }
    
});

router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const { id } =req.params
    const deleted = await Quiz.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': deleted})
    } else {
        res.redirect('/quizzes')
    }
     
});

module.exports = router;