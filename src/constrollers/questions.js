const express = require('express');
const router = express.Router();
const {Question} = require('../models')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}))


router.get('/', async (req, res) => {
    const questions = await Question.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.render('questions/index', {questions})
    }
});

router.get('/new', (req,res) => {
    res.render('questions/create')
})

router.post('/', async (req, res) => {
    const { name } = req.body
    const questions = await Question.create({ name })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect('/questions/' + questions.id)
    }
});

router.get('/:id', async(req, res) => {
    const questions = await Question.findByPk(req.params.id)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.render('questions/show', { questions })
    }
});

router.get('/:id/edit', async (req, res) => {
    const questions = await Question.findByPk(req.params.id)
    res.render('questions/edit', { questions})
})

router.post('/:id', async (req, res) => {
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

router.get('/:id/delete', async (req, res) => {
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