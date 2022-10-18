const express = require('express');
const router = express.Router();

const SignUpController = require('../controllers/signup.controller')
const signUpController = new SignUpController();

router.post('/', signUpController.createUser)

module.exports = router; // router를 모듈로써 내보냄



// router.post('/', async (req, res) => {
//     const { authorization } = req.headers;
//     const [tokenType, tokenValue] = (authorization || '').split(' ');

//     if (tokenValue || tokenType === 'Bearer') {
//         res.status(401).send({
//             errorMessage: '이미 로그인 되어있습니다.',
//         });
//         return;
//     }

//     const { nickname, password, confirmPassword } = req.body;

    

    

    
//     console.log({ nickname, password });

    

    

//     res.status(201).send({  });
// });


