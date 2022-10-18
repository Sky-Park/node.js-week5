const jwt = require('jsonwebtoken');

const LoginRepository = require('../repositories/login.repository')

class LoginService {

    loginRepository = new LoginRepository();

    login = async ({nickname, password}) => {
        
        const user = await this.loginRepository.login({nickname, password})

        if (!user) {
            throw new Error( '회원 정보가 존재하지 않습니다.')
        }

        const token = jwt.sign({ userId: user.userId }, 'my-secret-key')

        return token;
    }
}

module.exports = LoginService