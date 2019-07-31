const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

server.use(logger);

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('webapi-iii-challenge');
});

server.listen(8000, () => {
    console.log("API running on port 8000!");
});