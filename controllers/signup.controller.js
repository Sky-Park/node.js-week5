const SignUpService = require('../services/signup.service')

class SignUpController {
    signUpService = new SignUpService();

    createUser = async(req, res, next) => {
        const { authorization } = req.headers;
        const { nickname, password, confirmPassword } = req.body;
        try{
            const createUserOne = await this.signUpService.createUser({ authorization, nickname, password, confirmPassword })
            res.status(201).json({ data: createUserOne })
        }
        catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = SignUpController;
