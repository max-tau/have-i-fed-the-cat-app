const express = require('express');

const app = express();
const { Cat } = require('./models');

app.use(express.json());

app.post('/cats', (req, res) => {
    Cat.create(req.body).then(cat => res.status(201).json(cat))
});

app.get('/cats', (req, res) => {
    Cat.findAll({ where: req.query }).then(catList => res.status(200).json(catList))
})
app.get('cats/:id', (req, res) => {
    const { id } = req.params
    Cat.find(id).then(catById => res.status(200).json(catById))
})

module.exports = app;