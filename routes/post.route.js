import { Router } from 'express';
import {
    addPost,
    deletePost,
    editPost,
    getAllPosts,
    getAllPostsByUser,
    getPost,
    getPreSignedUrls,
} from '../controllers/post.controller.js';

const router = Router();

router.post('/createpost', addPost);
router.post('/generateUrls', getPreSignedUrls);
router.get('/:postId', getPost);
router.get('/getAllPostsByUser/:userId', getAllPostsByUser);
router.post('/getAllPosts', getAllPosts);
router.put('/:postId', editPost);
router.delete('/:postId', deletePost);

export default router;
