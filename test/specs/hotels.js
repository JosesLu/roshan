describe('Crawl', function() {
it('Expedia Hotels', function() {
	browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
	fullFrom = $('div#from2').getText(); //Gets values from "From" ID in html file I wrote
	fullTo = $('div#to2').getText(); //Gets values from "To" ID in html file I wrote
	htmlFrom = $('div#from3').getText(); //Gets values from "From" ID in html file I wrote
	htmlTo = $('div#to3').getText(); //Gets values from "To" ID in html file I wrote
	htmlTripType = $('div#typeofTrip').getText();
	htmlDepDate = $('div#dateD').getText();
	var userDateDep = htmlDepDate[3] + htmlDepDate[4] + htmlDepDate[2] + htmlDepDate[0] + htmlDepDate[1] + htmlDepDate[2] + htmlDepDate[6] + htmlDepDate[7] + htmlDepDate[8] + htmlDepDate[9]; 
	htmlArDate = $('div#dateA').getText();
	var useDateRet = htmlArDate[3] + htmlArDate[4] + htmlArDate[2] + htmlArDate[0] + htmlArDate[1] + htmlArDate[2] + htmlArDate[6] + htmlArDate[7] + htmlArDate[8] + htmlArDate[9]; 
	htmlPassengers = $('div#numPass').getText();
	browser.close();


	var parser = require('rss-parser');
	var link = 'http://www.philippinecompanies.com/searchapi.php?what=hotels&where=davao'
	link = link.replace('davao',fullTo);
	parser.parseURL(link, function(err, parsed) {
	 // console.log(parsed.feed.title);
	 	var hotels = [];
		for(var i = 0;i<20;i++){
		hotels[i] = parsed.feed.entries[i].title + " "  + parsed.feed.entries[i].contentSnippet;	
		//console.log(parsed.feed.entries[i].contentSnippet);
		//var data = parsed.feed;

		}
		hotels = hotels.toString();
		
		hotels = hotels.replace(/\n/g, '');
		hotels = hotels.replace(/\t/g, '');

		var hotelCharArray = hotels.split("");

		for(var i = 0;i < hotelCharArray.length;i++)
		{
			if(hotelCharArray[i] == " " && hotelCharArray[i+1] == "B" && hotelCharArray[i+2] == "u" && hotelCharArray[i+3] == "s" && hotelCharArray[i+14] == ":")
			{
				hotelCharArray[i] = "\n";
			}
			if (hotelCharArray[i] == ":" && hotelCharArray[i+1] == ",")
			{
				hotelCharArray[i + 1] = "\n";
			}
			if (hotelCharArray[i] == "." && hotelCharArray[i+1] == "c" && hotelCharArray[i+4] == ",")
			{
				hotelCharArray[i+4] = "\n";
			}
		}


		hotels = hotelCharArray.join('');
	    fs = require('fs');
		fs.writeFile('D:/Roshan/public/hotels.txt',hotels, function(err) {
			if (err) return console.log(err);
			console.log('Write successful!');
		});

	})
});
});
