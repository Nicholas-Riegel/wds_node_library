const express = require('express')
const router = express.Router()
const AuthorModel = require('../models/author')

// all authors
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name1 != null && req.query.name1 !== "") {
        searchOptions.name = new RegExp(req.query.name1, 'i')//case insensitive
    }
    try {
        const all_authors = await AuthorModel.find(searchOptions)
        res.render('authors/index', {
            all_authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// new author form
router.get('/new', (req, res) => {
    res.render('authors/new' /*, { author_model: new AuthorModel()}*/)
})

// create new author
router.post('/', async (req, res) => {
    const author_model = new AuthorModel({
        name: req.body.name0
    })
    try {
        const newAuthor = await author_model.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author_model: author_model,
            errorMessage: 'Error creating Author'
        })
    }
    // author_model.save((err, newAuthor) => {
    //     if (err) {
    //         res.render('authors/new', {
    //             author_model: author_model,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else {
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
    // // res.send(req.body.nameX)
})

module.exports = router