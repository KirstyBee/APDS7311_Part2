const express = require('express');
const app = express();
const router = express.Router();
const {Post, validatePost} = require('../models/post');
const auth = require ('../middleware/auth')

//GET ALL POST
router.get('/', auth, async (req, res) => {
const posts = await Post.find();
res.send(posts);
});

//CREATE NEW POST
router.post('/', auth, async (req, res) => {
    const{error} = validatePost(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const post = new Post(req.body);
    post.save()

    res.send(post);
});

//GET SINGLE POST
router.get('/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post) return res.send(post);
    res.status(404);
});

//DELETE SINGLE POST
router.delete('/:id', auth, async(req, res) => {
    const result = await Post.deleteOne({_id: req.params.id});

    res.send(result);
});

module.exports = router;