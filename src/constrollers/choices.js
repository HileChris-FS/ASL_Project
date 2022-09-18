const express = require('express');
const router = express.Router();
const {Choice} = require('../models')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}))


router.get('/', async (req, res) => {
    const choices = await Choice.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.render('choices/index', {choices})
    }
});

router.get('/new', (req,res) => {
    res.render('choices/create')
})

router.post('/', async (req, res) => {
    const { a,b }  = req.body
    const choices = await Choice.create({ a,b })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.redirect('/choices/' + choices.id)
    }
});

router.get('/:id', async(req, res) => {
    const choices = await Choice.findByPk(req.params.id)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.render('choices/show', { choices })
    }
});

router.get('/:id/edit', async (req, res) => {
    const choices = await Choice.findByPk(req.params.id)
    res.render('choices/edit', { choices})
})

router.post('/:id', async (req, res) => {
    const { a,b  } = req.body
    const { id } =req.params
    const choices = await Choice.update({ a,b }, {
        where: { id }
    })
    
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.redirect('/choices/' + id)
    }
});

router.get('/:id/delete', async (req, res) => {
    const { id } =req.params
    const deleted = await Choice.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': deleted})
    } else {
        res.redirect('/choices')
    }
});

module.exports = router;