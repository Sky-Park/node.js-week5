const PostService = require('../services/posts.service')

class PostsController {
    postService = new PostService();
    //게시글 전체조회
    getPosts = async (req, res, next) => {
        try{
            const posts = await this.postService.findAllPost()

             res.status(200).json({ data: posts });
        } catch (error) {
            res.status(404).json({error: error.message})
        }
        
    };
    //게시글 작성
    createPost = async (req, res, next) => {
        const { title, content } = req.body;
        const { userId, nickname } = res.locals.users;
        
        try {
            const createPostData = await this.postService.createPost({userId, nickname, title, content})
            res.status(200).json({ data: createPostData })

        } catch (error) {
            res.status(400).json({error: error.message})
        }
        
    };
    
    //게시글 상세보기
    getPostsDetail = async (req, res, next) => {
        const { postId } = req.params;
        try{
            const postDetail = await this.postService.findOnePost({postId})

             res.status(200).json({ data: postDetail })
        } catch (error) {

            res.status(404).json({error: error.message})
        }
        
    };
    
    //게시글 수정
    amendPost = async (req, res, next) => {
        const { postId } = req.params;
        const { title, content } = req.body;
        const { userId } = res.locals.users
        try {
            await this.postService.amendPost({postId, userId, title, content})
            res.status(201).json({message : "게시글이 수정되었습니다." })
        } catch (error) {
            res.status(400).json({error: error.message})
        }              
    };  

    deletePost = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.users;
        
        const deletePostOne = await this.postService.deletePost({postId, userId});

        if (deletePostOne) {
            res.status(201).json({"message": "게시글이 삭제되었습니다."})
        } else {
            res.status(404).json({ "message": "게시글이 존재하지않습니다."})
        }
    }

    getLikePosts = async (req, res, next) => {
        const { userId } = res.locals.users;
        try{
            const getLikePost = await this.postService.getLikePosts({userId})
            res.status(200).json({data: getLikePost})
        } catch (error) {
            res.status(400).json({error: error.message})
        }

    }
    
    putLike = async (req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.users;

        try{
            const Like = await this.postService.putLike({postId, userId})
            res.status(200).json({data: Like})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = PostsController;