// const SignUpRepository = require('../../repositories/signup.repository');
// const {
//     createUserResultSchema,
//     createUserInputSchema,
// } = require('../fixtures/signup.fixtures');
// const mockSignUpModel = () => ({
//     findAll: jest.fn(),
//     create: jest.fn(),
// });
const request = require('supertest');
const app = require('../../app.js');
const db = require('../../models');

beforeAll(async () => {
    await db.sequelize.sync();
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2022-10-20'));
});

describe('signup test', () => {
    // let signUpRepository = new SignUpRepository();
    // signUpRepository.users = mockSignUpModel();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    // test('signup repository test method findAll', async () => {
    //     const findAllUserResult = [];

    //     signUpRepository.users.findAll = jest.fn(() => {
    //         return findAllUserResult;
    //     });

    //     const existUsers = await signUpRepository.findUser({});

    //     //findAll을 몇번 실행했는가?
    //     expect(signUpRepository.users.findAll).toHaveBeenCalledTimes(1);

    //     //findAll의 결과값이 return값과 동일한가?
    //     expect(existUsers).toEqual(findAllUserResult);
    // });

    // test('signUp repository test method creat', async () => {
    //     signUpRepository.users.create = jest.fn(() => {
    //         return createUserResultSchema;
    //     });

    //     const creatOneUser = await signUpRepository.createUser({
    //         createUserInputSchema,
    //     });
    //     console.log(creatOneUser);

    //     //create을 몇번 실행했는가?
    //     expect(signUpRepository.users.create).toHaveBeenCalledTimes(1);

    //     //create의 결과값이 retunr값과 동일한가?
    //     expect(creatOneUser).toStrictEqual(createUserResultSchema);
    // });


    // test('POST /signup 테스트', async () => {
    //     await request(app)
    //         .post('/signup')
    //         .send({
    //             "nickname": "Developer1",
    //             "password": "1234",
    //             "confirmPassword": "1234",
    //         })
    //         .expect(201)
    //         .then((res) => {
    //             expect(res.body).toStrictEqual({});
    //         });
    // });


    test('POST /login 테스트', async () => {
        await request(app)
            .post('/login')
            .send({
                nickname: 'Developer',
                password: '1234',
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toStrictEqual({
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6bnVsbH0.AXA4L6CfPPqtRGgNhcoJBYA-X5sxmvYpAENGHKH0wwo',
                });
            });
    });
});
