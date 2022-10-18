const PostsRepository = require('../repositories/posts.repository')

class PostsService {
    postRepository = new PostsRepository();

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();

        allPost.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })

        return allPost.map((post) => {
            return {
              postId: post.postId,
              nickname: post.nickname,
              title: post.title,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt
            }
        });
    }

    createPost = async (userId, nickname, title, content) => {
      // 저장소(Repository)에게 데이터를 요청합니다.
      const createPostData = await this.postRepository.createPost(userId, nickname, title, content);

      // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
      return {
        postId: createPostData.null,
        nickname: createPostData.nickname,
        title: createPostData.title,
        content: createPostData.content,
        createdAt: createPostData.createdAt,
        updatedAt: createPostData.updatedAt,
      };
    }

    findOnePost = async (postId) => {

        const postDetail = await this.postRepository.findOnePost(postId);

        if (!postDetail) {
            throw new Error("해당 게시글이 존재하지 않습니다.")
        }

        return {
            postId: postDetail.postId,
            nickname: postDetail.nickname,
            title: postDetail.title,
            content: postDetail.content,
            createdAt: postDetail.createdAt,
            updatedAt: postDetail.updatedAt,
        }
    }

    amendPost = async (postId, userId, title, content) => {
        
        const amendPostData = await this.postRepository.amendPost(postId, userId, title, content);

        return {
            postId: amendPostData.postId,
            nickname: amendPostData.nickname,
            title: amendPostData.title,
            content: amendPostData.content,
            createdAt: amendPostData.createdAt,
            updatedAt: amendPostData.updatedAt,
        }
    }

    deletePost = async (postId, userId) => {

        const deletePostData = await this.postRepository.deletePost(postId, userId);

        return deletePostData;
    }
}

module.exports = PostsService;