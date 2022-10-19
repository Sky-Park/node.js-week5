const { comments } = require('../models');

class CommentsRepository {
    createComment = async ({ postId, comment, userId, nickname }) => {
        const createComments = await comments.create({
            postId,
            comment,
            userId,
            nickname,
        });

        return { data: createComments };
    };

    getAllComments = async ({ postId }) => {
        const getAllComment = await comments.findAll({ where: { postId } });

        return getAllComment;
    };

    amendComment = async ({ commentId, comment, userId }) => {
        const amendCommentOne = await comments.update(
            {
                comment,
            },
            {
                where: {
                    commentId,
                    userId,
                },
            }
        );
        return amendCommentOne;
    };

    deleteComment = async ({commentId, userId }) => {
        const deleteCommentOne = await comments.destroy(
            {where:{
                commentId, 
                userId
            }}
        )
        return deleteCommentOne;
    };
}

module.exports = CommentsRepository;
