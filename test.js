var casper = require('casper').create();
// var x = require('casper').selectXPath;
// casper.start('http://www.jetcost.com.ph/en/');
// casper.then(function() {
//     // aggregate results for the 'casperjs' search
  
//     // now search for 'phantomjs' by filling the form again
//     this.fill('form[action="/en/wait.php"]', { trip_from: 'dvo',tripTo: 'mnl', date1 :'14/01/2017',date2 :'15/01/2017' },  true);
//     this.capture('screens/fuck.png');
// });

// casper.run();


var x = require('casper').selectXPath;
casper.start('http://www.jetcost.com.ph/en/', function() {
    this.echo(this.getTitle());
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    this.fill('form#main-search-flight', { 'trip_from': 'mnl','tripTo': 'dvo', 'date1' :'16/01/2017','date2' :'17/01/2017' });

    // now search for 'phantomjs' by filling the form again
  //  this.fill('form[action="/en/wait.php"]', { trip_from: 'mnl',tripTo: 'dvo', date1 :'16/01/2017',date2 :'17/01/2017' },  true);

});


casper.wait(10000,function() {
	this.capture('screens/filled.png');
  this.echo(this.getCurrentUrl());	
  
this.capture('screens/bforesrch.png');
});

// casper.thenClick('[name="btnK"]', function(){
// this.echo('searching');
// this.capture('searching.png');

// });

casper.run();
	