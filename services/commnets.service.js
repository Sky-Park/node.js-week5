const CommentsRepository = require('../repositories/commnets.repository');

class CommentsService {

    commentsRepository = new CommentsRepository()

    createComment = async ({postId, comment, userId, nickname}) => {
        
        const createComments = await this.commentsRepository.createComment({postId, comment, userId, nickname})

        return ({data: createComments})
    }
    getAllComments = async ({postId}) => {
        
        const getAllComment = await this.commentsRepository.getAllComments({postId})

        return getAllComment;
    }

    amendComment = async ({commentId, comment, userId}) => {

        const amendCommentOne = await this.commentsRepository.amendComment({commentId, comment, userId});

        return amendCommentOne;
        
    }

    deleteComment = async ({commentId, userId }) => {

        const deleteCommentOne = await this.commentsRepository.deleteComment({commentId, userId });

        return deleteCommentOne;
    }
}

module.exports = CommentsService