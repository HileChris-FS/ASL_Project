const express = require('express');
const router = express.Router();
const {Question} = require('../models')
const { isAuthenticated } = require('../middlewares/auth')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}))


router.get('/', isAuthenticated, async (req, res) => {
    const questions = await Question.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.render('questions/index', {questions})
    }
});

router.get('/new', isAuthenticated, (req,res) => {
    res.render('questions/create')
})

router.post('/', isAuthenticated, async (req, res) => {
    const { name } = req.body
    const questions = await Question.create({ name })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect('/questions/' + questions.id)
    }
});

router.get('/:id', isAuthenticated, async(req, res) => {
    const questions = await Question.findByPk(req.params.id)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.render('questions/show', { questions })
    }
});

router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const questions = await Question.findByPk(req.params.id)
    res.render('questions/edit', { questions})
})

router.post('/:id', isAuthenticated, async (req, res) => {
    const { name } = req.body
    const { id } =req.params
    const questions = await Question.update({ name }, {
        where: { id }
    })
    
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect('/questions/' + id)
    }
});

router.get('/:id/delete', isAuthenticated, async (req, res) => {
    const { id } =req.params
    const deleted = await Question.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': deleted})
    } else {
        res.redirect('/questions')
    }
});

module.exports = router;