const CommentsService = require('../services/commnets.service');

class CommentsController {

    commentsService = new CommentsService()

    createComment = async (req, res, next) => {
        const { postId } = req.params;
        const { comment } = req.body;
        const { userId, nickname } = res.locals.users;
        
        try{
           const createComments = await this.commentsService.createComment({postId, comment, userId, nickname})
            res.status(201).json({data: createComments, message: "댓글을 작성하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    getAllComments = async (req, res, next) => {
        const { postId } = req.params;

        try {
            const getAllComment = await this.commentsService.getAllComments({postId})
            res.status(200).json({data: getAllComment})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    amendComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals.users;

        try{
            await this.commentsService.amendComment({commentId, comment, userId})
            res.status(200).json({message: "댓글을 수정하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { userId } = res.locals.users;

        try{
            await this.commentsService.deleteComment({commentId, userId })
            res.status(200).json({message: "댓글을 삭제하였습니다."})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
        
    }

}

module.exports = CommentsController