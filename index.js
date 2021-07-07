require('dotenv').config();

const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

server.use(logger);
server.use(express.json())

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send('webapi-iii-challenge');
});

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`API running on port ${port}!`);
});