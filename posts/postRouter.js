const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
    postDb.remove(req.params.id).then(records => {
        res.status(200).json(req.post);
    }).catch(error => {
        res.status(500).json({ error: 'The post could not be removed.' });
    });
});

router.put('/:id', validatePostId, (req, res) => {
    postDb.update(req.params.id, req.body).then(records => {
        res.status(200).json(req.post);
    }).catch(error => {
        res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

// custom middleware

function validatePostId(req, res, next) {
    postDb.getById(req.params.id).then(post => {
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    });
};

module.exports = router;