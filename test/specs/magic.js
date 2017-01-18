var assert = require('assert');
var URL, htmlFrom, htmlTo, htmlDepDate, htmlArDate, htmlPassengers;
describe('Where the magic happens', function() {
	it('Crawl for results', function() {
		var temp = 'http://www.jetcost.com.ph/en/flights/philippines/from/to-from/?date1=insDate1&date2=insDate2';
		browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
		fullFrom = $('div#from2').getText(); //Gets values from "From" ID in html file I wrote
		fullTo = $('div#to2').getText(); //Gets values from "To" ID in html file I wrote
		htmlFrom = $('div#from3').getText(); //Gets values from "From" ID in html file I wrote
		htmlTo = $('div#to3').getText(); //Gets values from "To" ID in html file I wrote
		htmlTripType = $('div#typeofTrip').getText();
		htmlDepDate = $('div#dateD').getText();
		htmlArDate = $('div#dateA').getText();
		htmlPassengers = $('div#numPass').getText();
		browser.close();
		htmlDepDate = htmlDepDate.replace("/","%2F")
		htmlArDate = htmlArDate.replace("/","%2F")
		temp = temp.replace(/from/g,fullTo);
		temp = temp.replace('to',fullFrom);
		temp = temp.replace('insDate1',htmlDepDate);
		temp = temp.replace('insDate2',htmlArDate);
		browser.url(temp);
		if (htmlTripType == "1") {
			browser.setValue('[name="_from"]', fullFrom); //Sets value of "From" txtbox to whatever user input
			browser.pause(1000);
			browser.keys('\uE004');
			browser.setValue('[name="To"]', fullTo); //Sets value of "To" txtbox to whatever user input
			browser.pause(1000);
			browser.keys('\uE004'); //Equivalent to pressing tab key
			
			browser.click('//*[@id="main-search-flight"]/section/div[3]/button');
			for(var i=1;i<htmlPassengers;i++)
			{
				browser.click('//*[@id="main-search-flight"]/section/div[3]/div[2]/div[1]/div[2]/div/span[2]/button');
			}
			browser.click('//*[@id="main-search-flight"]/section/div[3]/button');

			browser.click('.form-search-btn--submit'); //Click submit button
			URL = browser.getUrl(); //Gets URL of whatever the fuck airline site gave
			//Where the magic happens
			var loc = [];
			loc = htmlFrom.split('');
			var des = [];
			des = htmlTo.split('');
			var inputUser = $('ul.result__list.list-group');


			var imgArray = [];
    		var source = browser.getSource();
    		for(var i=0;i<10;i++)
    		{
	    		var v = source.indexOf('<img class="logo hidden-xxs" src="http://a.jtcstatic.com/images/MicroCompagnies/square/medium/')
	    		imgArray[i] = source.substring(v+94,v+96);
	    		source = source.replace('<img class="logo hidden-xxs" src="http://a.jtcstatic.com/images/MicroCompagnies/square/medium/',"");
	    		console.log(imgArray[i] + "\n");
    		}



			var value;
			value = inputUser.getText();
			for (x = 0; x < value.length; x++) {
				value = value.replace("(+1)", "");
			}
			for (x = 0; x < value.length; x++) {
				value = value.replace("\n", " ");
			}
			var z = [];
			var counter = 1;
			for (x = 1; x < value.length; x++) {
				if (value[x] == loc[0] && value[x + 1] == loc[1] && value[x + 2] == loc[2] && (value[x - 2] * 1 == value[x - 2] || value[x - 5] == 'l')) {
					z[x] = "\n" + counter + " ";
					counter++;
				} else {
					z[x] = value[x];
				}
			}
			for (x = 1; x < z.length; x++) {
				if (z[x] == "A" || z[x] == "B" || z[x] == "C" || z[x] == "D" || z[x] == "E" || z[x] == "F" || z[x] == "G" ||
					z[x] == "H" || z[x] == "I" || z[x] == "J" || z[x] == "K" || z[x] == "L" || z[x] == "M" || z[x] == "N" ||
					z[x] == "O" || z[x] == "P" || z[x] == "Q" || z[x] == "R" || z[x] == "S" || z[x] == "T" || z[x] == "U" ||
					z[x] == "V" || z[x] == "W" || z[x] == "X" || z[x] == "Y" || z[x] == "Z" || z[x] == "a" || z[x] == "b" ||
					z[x] == "c" || z[x] == "d" || z[x] == "e" || z[x] == "f" || z[x] == "g" || z[x] == "h" || z[x] == "i" ||
					z[x] == "j" || z[x] == "k" || z[x] == "l" || z[x] == "m" || z[x] == "n" || z[x] == "o" || z[x] == "p" ||
					z[x] == "q" || z[x] == "r" || z[x] == "s" || z[x] == "t" || z[x] == "u" || z[x] == "v" || z[x] == "w" ||
					z[x] == "x" || z[x] == "y" || z[x] == "z")
					z[x] = "";
			}
			var str = z.join("");
			for (var i = 0; i < str.length; i++) {
				str = str.replace(" 1 ", "");
			}
			str = "0" + str;
			str = "id timeDepart departDuration timeArrive returnDepartTime arriveDuration returnArriveTime price1 price2 price3 price4 \n" + str;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights.txt', str, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});
		}
		if (htmlTripType == "0") {
			browser.click("//label[contains(., 'One-way')]");
			browser.setValue('[name="_from"]', fullFrom); //Sets value of "From" txtbox to whatever user input
			browser.pause(1000);
			browser.keys('\uE004');
			browser.setValue('[name="To"]', fullTo); //Sets value of "To" txtbox to whatever user input
			browser.pause(1000);
			browser.keys('\uE004'); //Equivalent to pressing tab key

			browser.click('//*[@id="main-search-flight"]/section/div[3]/button');
			for(var i=1;i<htmlPassengers;i++)
			{
				browser.click('//*[@id="main-search-flight"]/section/div[3]/div[2]/div[1]/div[2]/div/span[2]/button');
			}
			browser.click('//*[@id="main-search-flight"]/section/div[3]/button');

			browser.click('.form-search-btn--submit'); //Click submit button
			URL = browser.getUrl(); //Gets URL of whatever the fuck airline site gave
			//Where the magic happens
			var loc = [];
			loc = htmlFrom.split('');
			var des = [];
			des = htmlTo.split('');
			var inputUser = $('ul.result__list.list-group');


			var imgArray = [];
    		var source = browser.getSource();
    		for(var i=0;i<5;i++)
    		{
	    		var v = source.indexOf('<img class="logo hidden-xxs" src="http://a.jtcstatic.com/images/MicroCompagnies/square/medium/')
	    		imgArray[i] = source.substring(v+94,v+96);
	    		source = source.replace('<img class="logo hidden-xxs" src="http://a.jtcstatic.com/images/MicroCompagnies/square/medium/',"");
	    		console.log(imgArray[i] + "\n");
    		}
    		
			var value;
			value = inputUser.getText();
			for (x = 0; x < value.length; x++) {
				value = value.replace("(+1)", "");
			}
			for (x = 0; x < value.length; x++) {
				value = value.replace("\n", " ");
			}
			var z = [];
			var counter = 1;
			for (x = 1; x < value.length; x++) {
				if (value[x] == loc[0] && value[x + 1] == loc[1] && value[x + 2] == loc[2] && (value[x - 2] * 1 == value[x - 2] || value[x - 5] == 'l')) {
					z[x] = "\n" + counter + " ";
					counter++;
				} else {
					z[x] = value[x];
				}
			}
			
			for (x = 1; x < z.length; x++) {
				if (z[x] == "A" || z[x] == "B" || z[x] == "C" || z[x] == "D" || z[x] == "E" || z[x] == "F" || z[x] == "G" ||
					z[x] == "H" || z[x] == "I" || z[x] == "J" || z[x] == "K" || z[x] == "L" || z[x] == "M" || z[x] == "N" ||
					z[x] == "O" || z[x] == "P" || z[x] == "Q" || z[x] == "R" || z[x] == "S" || z[x] == "T" || z[x] == "U" ||
					z[x] == "V" || z[x] == "W" || z[x] == "X" || z[x] == "Y" || z[x] == "Z" || z[x] == "a" || z[x] == "b" ||
					z[x] == "c" || z[x] == "d" || z[x] == "e" || z[x] == "f" || z[x] == "g" || z[x] == "h" || z[x] == "i" ||
					z[x] == "j" || z[x] == "k" || z[x] == "l" || z[x] == "m" || z[x] == "n" || z[x] == "o" || z[x] == "p" ||
					z[x] == "q" || z[x] == "r" || z[x] == "s" || z[x] == "t" || z[x] == "u" || z[x] == "v" || z[x] == "w" ||
					z[x] == "x" || z[x] == "y" || z[x] == "z")
					z[x] = "";
			}
			var str = z.join("");
			for (var i = 0; i < str.length; i++) {
				str = str.replace(" 1 ", "");
			}
			for (var i = 0; i < str.length; i++) {
				str = str.replace("..", "");
			}
			str = "0" + str;
			str = "id timeDepart departDuration timeArrive price1 price2 price3 price4 \n" + str;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights.txt', str, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});


			fs.writeFile('D:/Roshan/public/oneway.txt', imgArray, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});

		}
	});
});