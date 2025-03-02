const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const dotEnv = require('dotenv');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware  = multer({dest: 'upload/'});
const fs = require('fs');
const Post = require('./models/Post');



dotEnv.config();
const app = express();
app.use(cors({
    credentials: true, 
    origin:'http://localhost:3000'}));
app.use(express.json());
const salt = bCrypt.genSaltSync(10);
const secret = 'jkajhksahksuioeu9w89w9w9w7'
app.use(cookieParser());
app.use('/upload',express.static(__dirname+'/upload'));

mongoose.connect(process.env.MONGODB_URL);


app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    try{
    const userDoc = await User.create({
        username,
        password:bCrypt.hashSync(password,salt)});
    res.json(userDoc);
    }catch(err){
       res.status(400).json(err);
    }
});

app.post('/login', async (req,res)=> {
    const {username,password} = req.body;
    try{
        const userDoc = await User.findOne({username});
        const passOK = bCrypt.compareSync(password,userDoc.password);
        if(passOK){
            jwt.sign({username,id:userDoc._id},secret,{}, (err,token)=> {
                if(err) throw err;
                res.cookie('token',token).json({
                    if: userDoc._id,
                    username
                });
            });
        } else{
            res.status(400).json('Wrong credentials!');
        }
    }catch(err) {
        res.status(400).json(err);
    }
});


app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,secret,{}, (err,info)=>{
        if(err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
});

app.post('/logout', (req,res) => {
    res.cookie('token','').json('ok');
})



app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts.pop();
    const newPath = `${path}.${ext}`;

    try {
        await fs.promises.rename(path, newPath);
        const {token} = req.cookies;
        jwt.verify(token,secret,{},async (err,info)=>{
            if(err) throw err;
            const {title,summary,content} = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author: info._id,
            });
            res.json(postDoc);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'File rename failed' });
    }
});


// app.get('/post',async (req,res)=> {
//     const posts = await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
//     res.json(posts);
// });

app.get('/post', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/post/:id',async (req,res) => {
//     const {id} = req.params;
//     const postDoc = await Post.findById(id).populate('author',['username']);
//     res.json(postDoc);
// })

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const postDoc = await Post.findById(id).populate('author', ['username']);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000, ()=> {
    console.log('Server is running on 4000')
})