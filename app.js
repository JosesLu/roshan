var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));



app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/login-register', function (req, res) {
    res.render('login-register.html');
});
app.get('/hotel-results',function(req,res) {
	res.render('flight-results.html');
});
app.get('/flight-results', function(req,res) {
	res.render('hotel-results.html');
});
app.get('/final-results', function(req,res) {
	res.render('final-results.html');
});
app.get('/fly', function(req,res) {
	res.render('hah.html');
});	
app.get('/round-trip-results', function(req,res) {
	res.render('round-trip-results.html');
});
app.get('/db', function(req,res) {
	res.send(JSON.stringify(db));
});

app.listen(8008);
console.log("Roshan respawned at port 8008!");