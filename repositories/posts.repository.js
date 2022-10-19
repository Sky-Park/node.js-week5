const { posts } = require('../models');
const { likes } = require('../models');

class PostRepository {
    findAllPost = async () => {
        // ORM인 Sequelize에서 posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
        const postlist = await posts.findAll();

        return postlist;
    };

    createPost = async ({ userId, nickname, title, content }) => {
        // ORM인 Sequelize에서 posts 모델의 create 메소드를 사용해 데이터를 요청합니다.

        const createPostData = await posts.create({
            userId,
            nickname,
            title,
            content,
        });

        return createPostData;
    };

    findOnePost = async ({ postId }) => {
        const postDetail = await posts.findOne({ where: { postId } });

        return postDetail;
    };

    amendPost = async ({ postId, userId, title, content }) => {
        const amendPostData = await posts.update(
            { title, content },
            { where: { postId, userId } }
        );

        console.log(amendPostData);

        return amendPostData;
    };

    deletePost = async ({ postId, userId }) => {
        const deletPostData = await posts.destroy({
            where: {
                postId,
                userId,
            },
        });

        return deletPostData;
    };

    getLikePosts = async ({ userId }) => {
        const getLikeAll = await likes.findAll({
            where: { userId },
            attributes: ['postId'],
        });

        const postLikeNumber = getLikeAll.map((post) => {
            return post.getDataValue('postId')});

        console.log(postLikeNumber);

        const getLikePostsAll = await posts.findAll({
            where: { postId: postLikeNumber },
        });

        return getLikePostsAll;
    };

    findLikeLog = async ({postId, userId}) => {
        const userlike = await likes.findOne({ where: { postId, userId } })

        return userlike
    }

    increaseLike = async ({postId, userId}) => {
        await likes.create({postId, userId})
        await posts.increment({ likesCount: 1 }, { where: { postId } })

        return ({});
    };

    decreaseLike = async ({postId, userId}) => {
        await likes.destroy({where: {postId, userId}})
        await posts.decrement({ likesCount: 1 }, { where: { postId } })

        return ({});
    };
}

module.exports = PostRepository;
