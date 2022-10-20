const { users } = require('../models');

class LoginRepository {
    
    login = async ({nickname, password}) => {
        
        
        const user = await users.findOne({ where: { nickname, password } })
        
        return user;
    }
}
        
module.exports = LoginRepository