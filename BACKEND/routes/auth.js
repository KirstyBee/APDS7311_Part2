const express = require('express');
const app = express();
const router = express.Router();
const {User} = require('../models/user');
const {isValidPassword} = require ('../utils/hash');
const jwt = require('jsonwebtoken');

//LOGIN ROUTE
router.post('/',async (req, res) => {
const user = await User.findOne({username: req.body.username});
if(!user)
return res.status(401).json({err: 'Incorrect username or password'});

const valid = await isValidPassword(req.body.password, user.password);

if(!valid)
return res.status(401).json({error:'Incorrect username or password'});

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
res.send({token});
});

module.exports = router;