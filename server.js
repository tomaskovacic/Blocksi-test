const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
/*app.get('/', (req, res, next)=>{
    res.send('Hello')
})*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.post('/register', (req, res, next)=>{
    console.log(req.body)
})

const port = process.env.PORT || 5000;

app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log('Server running on port ' + port);
})