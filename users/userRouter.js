const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({ error: 'The users information could not be retrieved.' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.params.id).then(posts => {
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    userDb.getById(req.params.id).then(user => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
    });
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
