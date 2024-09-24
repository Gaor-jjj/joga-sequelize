const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/Joga_sequelize');

// read model data for table representation
const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

const getAllArticles = (req, res) => {
    Article.findAll()
    .then (articles => {
        console.log(articles)
        return res.status(200).json({articles});
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
};

const getArticleBySlug = (req, res) => {
    Article.findOne()
    .then (article => {
        console.log(article)
        return res.status(200).json({article});
    })
    .catch (error => {
        return res.status(500).send(error.message);
    })
};

module.exports = {
    getAllArticles,
    getArticleBySlug
};