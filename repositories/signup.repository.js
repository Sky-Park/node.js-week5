const { users } = require('../models');

class SignUpRepository {
    createUser = async (nickname, password) => {

        await users.create({nickname, password});
    }

    findUser = async (nickname) => {
        const existUser = await users.findAll({
            where: {nickname}
        });
        
        return existUser;
    }
}

module.exports = SignUpRepository;