const { posts } = require('../models');

class PostRepository {
    findAllPost = async () => {
      // ORM인 Sequelize에서 posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
      const postlist = await posts.findAll();
  
      return postlist;
    }
  
    createPost = async (userId, nickname, title, content) => {
      // ORM인 Sequelize에서 posts 모델의 create 메소드를 사용해 데이터를 요청합니다.

      const createPostData = await posts.create(userId, nickname, title, content);
  
      return createPostData;
    }

    findOnePost = async (postId) => {
        
        const postDetail = await posts.findOne({where: postId});

        return postDetail;
    }

    amendPost = async (postId, userId, title, content) => {
        console.log(postId, userId, title, content)
        const amendPostData = await posts.update(
            {title,
            content},
        {where: 
            postId,
            userId
        })

        return amendPostData;
    }
    
    deletePost = async (postId, userId) => {

        const deletPostData = await posts.destroy({
            where: 
                postId,
                userId,
        })

        return deletPostData;
    }

  }
  
  module.exports = PostRepository;