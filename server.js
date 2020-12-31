require('dotenv').config();
const express = require('express');
const myapp = require('./myApp');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl/new', function(req,res){
    myapp.createShortUrl(req.body.url,res);
});

app.get('/api/shorturl/:shorturl', function(req,res){
    myapp.redirectShortUrl(req.params.shorturl,res);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
