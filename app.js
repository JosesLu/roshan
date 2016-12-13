var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
	res.render('index');
});
app.get('/fly', function(req, res) {
	res.render('flights.json');
});
app.get('/login-register', function(req, res) {
	res.render('login-register');
});
app.get('/flight-results', function(req, res) {
	res.render('flight-results');
});
app.get('/hotel-results', function(req, res) {
	res.render('hotel-results');
});
app.get('/final-results', function(req, res) {
	res.render('final-results');
});
app.get('/round-trip-results', function(req, res) {
	res.render('round-trip-results');
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
	res.render('flight-results');

});

app.listen(8008);
console.log("Roshan respawned at port 8008!");