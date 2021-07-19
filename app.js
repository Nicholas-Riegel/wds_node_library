// REQUIRES
const express = require('express')
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv/config')
}

// APP
const app = express()

// LISTEN
app.listen(process.env.PORT || 3000)

// SETS
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// USE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
// OR app.use(express.urlencoded({ limit: '10mb', extended: false }));

// CONNECTION
mongoose.connect(
    process.env.DATABASE_URL, // in .env
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('Connected to MongoDB'))

// ROUTERS
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)