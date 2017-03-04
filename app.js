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
app.get('/loading', function(req, res) {
	res.render('loading');
});

app.post('/save', function(req, res) {

	var counter = 0;
	var currentLocation = req.body.xx;
	var destination = req.body.yy;
	if(currentLocation == destination)
	{
		res.render('index');

	}
	else {
	var from3 = req.body.xxx;
	var to3 = req.body.yyy;
	var tripType=req.body.triptype;
	var dateDep = req.body.dateDepart;
	var dateAr = req.body.dateArrive;
	var passengerNum = req.body.numberOfPassengers;
	var options;
	options = "<div id='from2'>" + currentLocation + "</div>" + "<div id='to2'>" + destination + "</div>";//Writes HTML file containing user input
	options = options + "<div id='from3'>" + from3 + "</div>" + "<div id='to3'>" + to3 + "</div>" +  "<div id='typeofTrip'>" + tripType + "</div>" ;
	options = options + "<div id='dateD'>"+ dateDep + "</div>" + "<div id='dateA'>" + dateAr + "</div>" + "<div id='numPass'>" + passengerNum + "</div>";
	fs = require('fs');
	fs.writeFile('public/options.html', options, function(err) {
		if (err) return console.log(err);
		console.log('Write successful!');
	});
	if(tripType == "0")
	{
		res.render('loading');
	}
	else
	{
		res.render('round-trip-results');
	}
}
});

app.listen(process.env.PORT || 8008);
console.log("Roshan respawned at port 8008!");