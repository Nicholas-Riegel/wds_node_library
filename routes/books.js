const express = require('express')
const router = express.Router()
const BookModel = require('../models/book')
const AuthorModel = require('../models/author')

// all books
router.get('/', async (req, res) => {
    res.render('books/index')
})

// new book form
router.get('/new', async (req, res) => {
    try {
        const all_authors0 = await AuthorModel.find({})
        const newBook = new BookModel()
        res.render('books/new', {
            all_authors0,
            newBook
        })
    } catch {
        res.redirect('/books')
    }
})

// create new book
router.post('/', async (req, res) => {
    const newBook2 = new BookModel({
        title: req.body.title0,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
})

module.exports = router