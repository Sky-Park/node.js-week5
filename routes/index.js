const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.routes.js');
const commentsRouter = require('./comments.routes.js');
const signupRouter = require('./signup.routes.js');
const loginRouter = require('./login.routes.js');

router.use('/posts', postsRouter);
router.use('/signup', signupRouter);
router.use('/comments', commentsRouter);
router.use('/login', loginRouter);

module.exports = router;
