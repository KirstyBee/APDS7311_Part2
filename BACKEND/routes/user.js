const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/user');
const {hasPassword} = require('../utils/hash');
const auth = require('../middleware/auth')

//CREATE NEW USER
router.post('/', async (req, res) => {
const {error} = validateUser (req.body);
if(error) return res.status(400).json(error.details[0].message);

const isUnique = (await User.count({username: req.body.username})) ===0;
if(!isUnique)
return res.status(400).json({error: 'The username or password is invalid'});



try{
    const user = new User(req.body);
    user.password = await hasPassword(user.password);
    await user.save();
}catch (err){
    return res.status(500).json(err);
}
res.sendStatus(201);
});

//GET CURRENT USER DETAILS
router.get('/', auth, async (req, res) => {
    res.send({currentUser: req, res});
});

module.exports = router;