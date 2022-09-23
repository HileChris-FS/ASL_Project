const express = require('express')
const app = express();
const { Quiz } = require('./src/models')
const quizzesCtrl = require('./src/constrollers/quizzes');
const choicesCtrl = require('./src/constrollers/choices');
const questionsCtrl = require('./src/constrollers/questions');
const authCtrl = require('./src/constrollers/auth')
const bodyParser =require('body-parser')
const session = require('express-session')

app.use(session({
    saveUninitialized: false,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

app.get('/', (request, response, next) => { response.render('home/home') })

app.use('/quizzes', quizzesCtrl);
app.use('/choices', choicesCtrl);
app.use('/questions', questionsCtrl)
app.use('/auth', authCtrl)

app.listen(3000);