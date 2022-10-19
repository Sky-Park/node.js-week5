const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', postsController.getPosts);
router.get('/like', authMiddleware, postsController.getLikePosts)
router.put('/:postId/like', authMiddleware, postsController.putLike)
router.get('/:postId', authMiddleware, postsController.getPostsDetail);
router.post('/', authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.amendPost);
router.delete('/:postId', authMiddleware, postsController.deletePost);


module.exports = router; // router를 모듈로써 내보냄




//6. 좋아요 누른 게시글 찾기
// router.get('/like', authMiddleware, async (req, res) => {
//     const { userId } = res.locals.users;

//     //해당 유저가 좋아요 누른 게시글 postId 찾기
//     const postLike = await likes.findAll({
//         where: { userId: userId },
//         attributes: ['postId'],
//     });

//     //값만 가지는 배열 만들기
//     const postLikeNumber = postLike.map((post) => {
//         return post.getDataValue('postId');
//     });

//     //좋아요 누른 postId와 동일한 게시글찾기
//     const postLikeList = await posts.findAll({
//         where: {
//             postId: postLikeNumber,
//         },
//         order: [['likesCount', 'DESC']], // 좋아요 누른 수가 많은 것부터 내림차순으로
//     });

//     res.json({ data: postLikeList });
// });

// //3. 게시글 상세보기
// router.get('/:postId', async (req, res) => {
//     const { postId } = req.params;
//     //postId값 을 params에 담아서 가져옴
//     const postdetail = await posts.findOne({
//         where: {
//             postId,
//         },
//     });

//     res.json({ data: postdetail });
// });

// //4. 게시글 수정하기
// router.put('/:postId', authMiddleware, async (req, res) => {
//     const { postId } = req.params;
//     const { title, content } = req.body;
//     const { userId } = res.locals.users;

//     await posts.update(
//         {
//             title,
//             content,
//         },
//         {
//             where: {
//                 userId,
//                 postId,
//             },
//         }
//     );
//     res.status(201).json({ message: '게시글을 수정하였습니다.' });
// });

// //5. 게시글 삭제하기
// router.delete('/:postId', authMiddleware, async (req, res) => {
//     const { postId } = req.params;
//     const { userId } = res.locals.users;

//     await posts.destroy({
//         where: {
//             postId,
//             userId,
//         },
//     });
//     res.json({ message: '게시글을 삭제하였습니다.' });
// });

// //7. 게시글 좋아요 누르기
// router.put('/:postId/like', authMiddleware, async (req, res) => {
//     const { postId } = req.params;
//     const { userId } = res.locals.users;

//     const postLikeOne = await posts.findOne({ where: { postId } });
//     //포스트DB에서 좋아요 누를 해당 포스트 가져오기
//     const userlike = await likes.findOne({ where: { postId, userId } });
//     //좋어요DB에서 좋아요한 기록있는지 찾기

//     //좋아요한 기록이 없을경우 좋아요 게시글에 좋아요 카운트 추가 및 좋아요 기록 등록
//     //좋아요한 기록이 있는경우 좋아요 게시글에 좋아요 카운트 감소 및 좋아요 기록 삭제
//     if (!userlike) {
//         await postLikeOne.increment({ likesCount: 1 }, { where: { postId } });
//         await likes.create({ userId, postId });
//         res.json({ message: '게시글에 좋아요를 등록하였습니다.' });
//     } else {
//         await postLikeOne.increment({ likesCount: -1 }, { where: { postId } });
//         await likes.destroy({ where: { userId, postId } });
//         res.json({ message: '게시글에 좋아요를 취소하였습니다.' });
//     }
// });

module.exports = router; // router를 모듈로써 내보냄
