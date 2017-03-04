var parser = require('rss-parser');
 


parser.parseURL('http://www.philippinecompanies.com/searchapi.php?what=hotels&where=davao', function(err, parsed) {
 // console.log(parsed.feed.title);
 	var hotels = [];
	for(var i = 0;i<21;i++){
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