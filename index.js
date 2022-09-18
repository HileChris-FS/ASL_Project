const express = require('express')
const app = express();
const { Quiz } = require('./src/models')
const quizzesCtrl = require('./src/constrollers/quizzes');
const choicesCtrl = require('./src/constrollers/choices');
const questionsCtrl = require('./src/constrollers/questions');


app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

app.get('/', async (request, response) =>{
    response.render('home/home')
})

app.use('/quizzes', quizzesCtrl);
app.use('/choices', choicesCtrl);
app.use('/questions', questionsCtrl)

app.listen(3000);