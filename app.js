var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));



app.get('/', function(req, res) {
	res.render('index.html');
});
app.get('/fly', function(req, res) {
	res.render('flights.json');
});
app.get('/login-register', function(req, res) {
	res.render('login-register.html');
});
app.get('/flight-results', function(req, res) {
	res.render('flight-results.html');
});
app.get('/hotel-results', function(req, res) {
	res.render('hotel-results.html');
});
app.get('/final-results', function(req, res) {
	res.render('final-results.html');
});
app.get('/round-trip-results', function(req, res) {
	res.render('round-trip-results.html');
});
app.get('/save', function(req, res) {
	res.render('save');
});
app.post('/save', function(req, res) {

	var counter = 0;
	var currentLocation = req.body.fromTXB;
	var destination = req.body.toTXB;
	var options;
	options = "<div id='from2'>" + currentLocation + "</div>" + "<div id='to2'>" + destination + "</div>";
	fs = require('fs');
	fs.writeFile('public/options.html', options, function(err) {
		if (err) return console.log(err);
		console.log('Write successful!');

	});
	res.render('/flight-results.html');

});

app.listen(8008);
console.log("Roshan respawned at port 8008!");