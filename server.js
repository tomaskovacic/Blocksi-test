const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Contact = require('./models/Contact');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./models/User');

mongoose.connect('mongodb+srv://tomas123:tomas123@test.znk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Routes
app.post('/register', (req, res, next) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    })
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'Username already in use.'
            })
        }
        return res.status(200).json({
            title: 'Registration seccussful'
        })
    })
})
app.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'Server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: 'User not found',
                error: 'Invalid credentials'
            })
        }
        //Incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'Invalid credentials'
            })
        }
        //If all is good create a token
        let token = jwt.sign({ userId: user._id }, 'secretkey123');
        return res.status(200).json({
            title: 'login success',
            token: token
        })
    })
})

//Grabbing user info
app.get('/user', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        //token is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    email: user.email,
                    firstname: user.firstname
                }
            })
        })
    })
})

// Adding new contact
app.post('/contacts', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: err
        })
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)

            //token is valid
            const newContact = new Contact({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                number: req.body.number,
                userId: user._id,
            })
            newContact.save(err => {
                if (err) {
                    return res.status(400).json({
                        title: 'This phone number already exist!',
                    })
                }
                return res.status(200).json({
                    title: 'Contact added to the DB!'
                })
            })
        })
    })
})

// Getting all contacts
app.get('/contacts', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: err
        })
        //token is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)

            var MongoClient = require('mongodb').MongoClient;

            MongoClient.connect('mongodb+srv://tomas123:tomas123@test.znk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("myFirstDatabase");
                dbo.collection("contacts").find({ userId: user._id.toString() }).toArray(function (err, result) {
                    if (err) throw err;
                    //console.log(result);
                    return res.status(200).json({
                        title: 'user grabbed',
                        user: {
                            data: result,
                        }
                    })
                    db.close();
                });
            });



        })
    })
})

// Get specific id
app.get('/contacts/:id', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        //token is valid
        Contact.findById(req.params.id)
        .then(result =>{
            return res.status(200).json({
                contact: result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })
})

// Contact delete
app.delete('/contacts/:id', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        //token is valid
        Contact.findByIdAndRemove({_id: req.params.id})
        .then(result =>{
            return res.status(200).json({
                contact: result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })
})

// Contact update
app.put('/contacts/:id', (req, res, next) => {
    let token = req.headers.token //token
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        //token is valid
        console.log(req.body.firstname)
        Contact.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(result =>{
            return res.status(200).json({
                title: 'Contact successfully updated!',
                contact: result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })
})

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on port ' + port);
})