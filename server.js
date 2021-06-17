const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://tomas123:tomas123@test.znk5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Routes
app.post('/register', (req, res, next)=>{
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'E-mail in use.'
            })
        }
        return res.status(200).json({
            title: 'Registration seccussful'
        })
    })
})

const port = process.env.PORT || 5000;

app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log('Server running on port ' + port);
})