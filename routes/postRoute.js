const express = require('express');
const router = express.Router();
const { createPost, showPost, showSinglePost, deletePost, updatePost, addComment, addLike, removeLike } = require('../controllers/postController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const {createCategory,showCategory,filtercategories}=require("../controllers/category")
const{createsidePost,showsidePost,deletesidePost,updatesidePost,showSidesinglePost}=require("../controllers/sidebarpost")




//blog routes
router.post('/post/create', isAuthenticated, isAdmin, createPost);
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deletePost);
router.put('/update/post/:id', isAuthenticated, isAdmin, updatePost);
router.put('/comment/post/:id', isAuthenticated, addComment);
router.put('/addlike/post/:id', isAuthenticated, addLike);
router.put('/removelike/post/:id', isAuthenticated, removeLike);




//category
router.post('/post/category',isAuthenticated,isAdmin,createCategory);
router.get('/show/category',showCategory);
router.get('/show/filter',filtercategories)



// sidebar post routes
router.post('/sidebar/post-create',isAuthenticated,isAdmin,createsidePost);
router.get('/sidebar/show-post',showsidePost);
router.put('/sidebar/update-post/:id', isAuthenticated, isAdmin, updatesidePost);
router.delete('/sidebar/delete-post/:id', isAuthenticated, isAdmin, deletesidePost);
router.get('/sidebar/posts/:id',showSidesinglePost);




module.exports = router;