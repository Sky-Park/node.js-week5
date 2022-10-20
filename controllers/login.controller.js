const LoginService = require('../services/login.service')

class LoginController {

    loginService = new LoginService();

    login = async (req, res, next) => {
        const { nickname, password } = req.body;

        try{
            const user = await this.loginService.login({nickname, password})
            
            res.status(200).json({token: user})
        }
        catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = LoginController