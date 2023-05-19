const express = require('express');

const { Cat } = require('./models');
const app = express();


app.use(express.json());

app.post('/cats', (req, res) => {
    Cat.create(req.body).then(cat => res.status(201).json(cat))});

app.get('/cats', (req, res) => {
    Cat.findAll({ where: req.query }).then(catList => res.status(200).json(catList))
})
app.get('/cats/:id', (req, res) => {
    const { id } = req.params
    Cat.findOne({ where: { id: `${id}` }}).then(catById => res.status(200).json(catById))
})
app.patch('/cats/:id', (req, res) => {
    const { id } = req.params
    Cat.update(req.body, { where: { id: `${id}` }}).then(fedCat => res.status(200).json(fedCat))
})
app.patch('/feed/cats/:id', (req, res) => {
    const { id } = req.params
    Cat.update({ lastFed: new Date()}, { where: { id: `${id}`}}).then(easyFeedCat => res.status(200).json(easyFeedCat))
})
app.delete('/cats/:id', (req, res) => {
    const { id } = req.params
    Cat.destroy({ where: { id: `${id}`}}).then(deletedCat => res.status(200).json(deletedCat))
})

module.exports = app;