const { users } = require('../models');

class SignUpRepository {
    constructor() {
        this.users = users;
    }
    createUser = async (nickname, password) => {

        const createUsers = await this.users.create({nickname, password});

        return createUsers;
    }

    findUser = async (nickname) => {
        const existUser = await this.users.findAll({
            where: {nickname}
        });
        
        return existUser;
    }
}

module.exports = SignUpRepository;