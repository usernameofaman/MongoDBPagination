const e = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./users')

mongoose.connect('mongodb://localhost:27017/pagination', {useNewUrlParser: true, useUnifiedTopology: true} )
const db = mongoose.connection
db.once('open', async () => {
    if(await User.countDocuments().exec() > 0) return

    Promise.all([
        User.create({ name: 'user 1'}),
        User.create({ name: 'user 2'}),
        User.create({ name: 'user 3'}),
        User.create({ name: 'user 4'}),
        User.create({ name: 'user 5'}),
        User.create({ name: 'user 6'}),
        User.create({ name: 'user 7'}),
        User.create({ name: 'user 8'}),
        User.create({ name: 'user 9'}),
        User.create({ name: 'user 10'}),
        User.create({ name: 'user 11'}),
        User.create({ name: 'user 12'}),
        User.create({ name: 'user 13'}),
    ]).then(() => console.log('Added'))
})

app.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults)
})
// app.get('/posts', paginatedResults(posts), (req, res) => {
//     res.json(res.paginatedResults)
// }) 



function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }

        try{
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        next()
        }catch (e) {
            res.status(500).json( {messege: e.messege})
        }
        
    }
}

app.listen(8000)