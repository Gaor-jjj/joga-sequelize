const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/Joga_sequelize');

// read model data for table representation
const models = require('../../models/');

const createArticle = (req, res) => {
    // get form data
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body

    // create new article by Article model
    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
    .then(article => {
        console.log(article)
        return res.status(200).json({ message: 'New article is added' })
    })
    .catch(error => {
        return res.status(500).send(error.message);
    })
}
const updateArticle = async (req, res) => {
    const articleId = req.params.id;

    if (req.method === 'GET') {
        try {
            const article = await models.Article.findByPk(articleId);
            if (!article) {
                return res.status(404).send({ message: 'Article not found'})
            }
            return res.status(200).json({ article })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    if (req.method === 'POST') {
        let { name, slug, image, body, author_id } = req.body;

        try {
            const updatedArticle = await models.Article.update(
                { name, slug, image, body, author_id },
                { where: { id: articleId }}
            )

            if (updatedArticle[0] === 0) {
                return res.status(404).json({ message: 'Article not found or no changes made.' });
            }
            
            return res.status(200).json({ message: 'Article updated successfully'})
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    if (req.method === 'DELETE') {
        try {
            const deletedArticle = await models.Article.destroy({
                where: { id: articleId }
            })

            if (deletedArticle === 0) {
                return res.status(404).json({ message: 'Article not found.' });
            }

            return res.status(200).json({ message: 'Article deleted successfully'})
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}

module.exports = {
    createArticle,
    updateArticle
}