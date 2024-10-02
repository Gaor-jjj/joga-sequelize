const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/Joga_sequelize');

// read model data for table representation
const models = require('../models/');

const getAuthorById = (req, res) => {
    const authorId = req.params.id;

    models.Author.findByPk(authorId, {
        include: [{ model: models.Article, as: 'articles' }]
    })
    .then(author => {
        if (!author) {
            return res.status(404).send('Author not found');
        }
        return res.status(200).json({ author });
    })
    .catch(error => {
        return res.status(500).send(error.message);
    });
};

module.exports = { getAuthorById };