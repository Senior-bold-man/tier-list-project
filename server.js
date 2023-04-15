if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const path = require('path')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Admin:admin@cluster0.szfhoky.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to Database Successful"))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

const User = mongoose.model('User', userSchema);

const initializePassport = require('./passport-config');
initializePassport(passport, User, 
  async email => {
    const user = await User.findOne({ email: email });
    return user;
  },
  async id => {
    const user = await User.findById(id);
    return user;
  }
);

const users = []

app.set('view-engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: process.env.NODE_ENV === 'production'
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/',checkAuthenticated,(req,res)=>{
    res.render('index.ejs',{username: req.user.name})
})

app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',checkNotAuthenticated,passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('register.ejs')
})

app.post('/register',checkNotAuthenticated,async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          name: req.body.username,
          email: req.body.email,
          password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
      } catch {
        res.redirect('/register');
      }
})

function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

app.listen(4000)