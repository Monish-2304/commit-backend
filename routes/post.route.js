import { Router } from 'express';
import {
    addPost,
    deletePost,
    editPost,
    getAllPostsByUser,
    getPost,
    getPreSignedUrls,
} from '../controllers/post.controller.js';

const router = Router();

router.post('/addpost', addPost);
router.post('/generateUrls', getPreSignedUrls);
router.get('/getPost', getPost);
router.get('/getAllPosts', getAllPostsByUser);
router.put('/editPost', editPost);
router.delete('/:postId', deletePost);

export default router;
