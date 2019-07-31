const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body).then(user => {
        res.status(201).json(user);
    }).catch(error => {
        res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    postDb.insert(req.body).then(post => {
        res.status(201).json(post);
    }).catch(error => {
        res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    });
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

router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.params.id).then(records => {
        res.status(200).json(req.user);
    }).then(error => {
        res.status(500).json({ error: 'The user could not be removed.' });
    });
});

router.put('/:id', validateUserId, (req, res) => {
    userDb.update(req.params.id, req.body).then(records => {
        res.status(200).json(req.user);
    }).catch(error => {
        res.status(500).json({ error: 'The user information could not be modified.' });
    });
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
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: 'Missing required name field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing user data.' });
    }
};

function validatePost(req, res, next) {
    if (req.body) {
        if (req.body.text) {
            if (req.body.user_id) {
                next();
            } else {
                res.status(400).json({ message: 'Missing required user_id field.' });
            }
        } else {
            res.status(400).json({ message: 'Missing required text field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing post data.' });
    }
};

module.exports = router;
