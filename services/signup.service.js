const SignUpRepository = require('../repositories/signup.repository')
const Joi = require('joi');

const validId = Joi.object().keys({
    nickname: Joi.string().alphanum().min(3).max(30),
});

const validPw = Joi.object().keys({
    password: Joi.string().alphanum().min(4),
});

class SignUpService {

    signUpRepository = new SignUpRepository();

    createUser = async ({authorization, nickname, password, confirmPassword}) => { 
        const [tokenType, tokenValue] = (authorization || '').split(' ');

        if (tokenValue || tokenType === 'Bearer') {
            throw new Error('이미 로그인 되어있습니다.')
        }
        
        if (password !== confirmPassword) {
            throw new Error('비밀번호가 비밀번호 확인란과 동일하지 않습니다.')
        }

        try {
            await validId.validateAsync({ nickname });
        } catch (err) {
            throw new Error ('닉네임의 형식이 올바르지 않습니다.')
        }
    
        try {
            await validPw.validateAsync({ password });
        } catch (err) {
            throw new Error('비밀번호의 형식이 올바르지 않습니다');
        }

        if (password.search(nickname) !== -1) {
            throw new Error('비밀번호에 닉네임과 같은값이 있습니다.') 
        }
        
        const existUser = await this.signUpRepository.findUser(nickname)
        
        console.log(existUser.length)
        
        if (existUser.length) {
            throw new Error ('해당 닉네임이 이미 존재합니다.')
        } 
            
        const createUserOne = await this.signUpRepository.createUser(nickname, password)
            
        
        return;
    }
}

module.exports = SignUpService;