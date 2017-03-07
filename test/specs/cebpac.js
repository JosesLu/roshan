var assert = require('assert');
var URL, htmlFrom, htmlTo, htmlDepDate, htmlArDate, htmlPassengers;
describe('Crawl', function() {

	it('Cebu Pacific', function() {
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
	
		var userDate = htmlDepDate[0] + htmlDepDate[1];
		userDate = parseInt(userDate);
		var userMonth = htmlDepDate[4] + htmlDepDate[5];
		userMonth = parseInt(userMonth);
		var ymd = htmlDepDate[6] + htmlDepDate[7] + htmlDepDate[8] + htmlDepDate[9] + "-" + htmlDepDate[3] + htmlDepDate[4] + "-" + htmlDepDate[0] + htmlDepDate[1]; //formats user date to YEAR-MONTH-DATE

		var today = new Date();
		var mm = today.getMonth()+1; 
		mm = parseInt(mm);
		var numberOfClicks = userMonth - mm;
		var link = 'https://beta.cebupacificair.com/Flight/InternalSelect?s=true&o1=FROM&d1=TO&dd1=DATEDEP&mon=true';
		link = link.replace('FROM',htmlFrom);
		link = link.replace('TO',htmlTo);
		link = link.replace('DATEDEP',ymd);


		browser.url(link);
		
		var flights = $('#depart-table > tbody');
			flights = flights.getText();
			
			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("\n", " ");
			}

			var indexCut;
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == 'J' && flights[x+7] == 'J') 
				{
					indexCut=x;
					break;
				} 
			}


			var z = [];
			var counter = 1;
			flights = flights.substr(0,indexCut);
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == '5' && flights[x + 1] == 'J' && x == 1) {
					z[x] = "\n" + counter + " ";
					counter++;
				} 
				if (flights[x] == '5' && flights[x + 1] == 'J') {
					z[x] = "\n" + "00 " + counter + " ";
					counter++;
				} 
				else {
					z[x] = flights[x];
				}
			}

			var str = z.join("");
			//str = str.substr(0,indexCut);
			for (x = 0; x < str.length; x++) {
				str = str.replace("+1", "");
			}
			for (x = 0; x < str.length; x++) {
				str = str.replace(/\(.*?\)/, "")
			}
			for (x = 0; x < str.length; x++) {
				str = str.replace(",", "")
			}



			var y = str.split('');
			for (x = 0; x < y.length; x++) {
				if (y[x] == "A" || y[x] == "B" || y[x] == "C" || y[x] == "D" || y[x] == "E" || y[x] == "F" || y[x] == "G" ||
					y[x] == "H" || y[x] == "I" || y[x] == "J" || y[x] == "K" || y[x] == "L" || y[x] == "M" || y[x] == "N" ||
					y[x] == "O" || y[x] == "P" || y[x] == "Q" || y[x] == "R" || y[x] == "S" || y[x] == "T" || y[x] == "U" ||
					y[x] == "V" || y[x] == "W" || y[x] == "X" || y[x] == "Y" || y[x] == "Z" || y[x] == "a" || y[x] == "b" ||
					y[x] == "c" || y[x] == "d" || y[x] == "e" || y[x] == "f" || y[x] == "g" || y[x] == "h" || y[x] == "i" ||
					y[x] == "j" || y[x] == "k" || y[x] == "l" || y[x] == "m" || y[x] == "n" || y[x] == "o" || y[x] == "p" ||
					y[x] == "q" || y[x] == "r" || y[x] == "s" || y[x] == "t" || y[x] == "u" || y[x] == "v" || y[x] == "w" ||
					y[x] == "x" || y[x] == "y" || y[x] == "z" || y[x] == "!" || y[x] == "*")
					y[x] = "";
			}

			var finalList = y.join('');

			finalList = link + " 0 " + finalList;
			finalList = "link id flightID timeDepart timeArrive price1 price2 price3 \n" + finalList;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights/ceb.txt', finalList, function(err) {
					if (err) return console.log(err);
					console.log('Write successful!');
				});



		if(htmlTripType == 1)
		{
			var userDate = htmlArDate[0] + htmlArDate[1];
			userDate = parseInt(userDate);
			var userMonth = htmlArDate[4] + htmlArDate[5];
			userMonth = parseInt(userMonth);
			var ymd = htmlArDate[6] + htmlArDate[7] + htmlArDate[8] + htmlArDate[9] + "-" + htmlArDate[3] + htmlArDate[4] + "-" + htmlArDate[0] + htmlArDate[1]; //formats user date to YEAR-MONTH-DATE

			var today = new Date();
			var mm = today.getMonth()+1; 
			mm = parseInt(mm);
			var numberOfClicks = userMonth - mm;
			var link = 'https://beta.cebupacificair.com/Flight/InternalSelect?s=true&o1=FROM&d1=TO&dd1=DATEDEP&mon=true';
			link = link.replace('FROM',htmlTo);
			link = link.replace('TO',htmlFrom);
			link = link.replace('DATEDEP',ymd);


			browser.url(link);
			
			var flights = $('#depart-table > tbody');
			flights = flights.getText();
			
			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("\n", " ");
			}

			var indexCut;
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == 'J' && flights[x+7] == 'J')
				{
					indexCut=x;
					break;
				} 
			}

			// fs = require('fs');
			// fs.writeFile('D:/Roshan/public/flights/yea.txt', indexCut, function(err) {
			// 		if (err) return console.log(err);
			// 		console.log('Write successful!');
			// 	});




			var z = [];
			var counter = 1;
			flights = flights.substr(0,indexCut);
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == '5' && flights[x + 1] == 'J' && x == 1) {
					z[x] = "\n" + counter + " ";
					counter++;
				} 
				if (flights[x] == '5' && flights[x + 1] == 'J') {
					z[x] = "\n" + "00 " + counter + " ";
					counter++;
				} 
				else {
					z[x] = flights[x];
				}
			}

			var str = z.join("");
			//str = str.substr(0,indexCut);
			for (x = 0; x < str.length; x++) {
				str = str.replace("+1", "");
			}
			for (x = 0; x < str.length; x++) {
				str = str.replace(/\(.*?\)/, "")
			}
			for (x = 0; x < str.length; x++) {
				str = str.replace(",", "")
			}



			var y = str.split('');
			for (x = 0; x < y.length; x++) {
				if (y[x] == "A" || y[x] == "B" || y[x] == "C" || y[x] == "D" || y[x] == "E" || y[x] == "F" || y[x] == "G" ||
					y[x] == "H" || y[x] == "I" || y[x] == "J" || y[x] == "K" || y[x] == "L" || y[x] == "M" || y[x] == "N" ||
					y[x] == "O" || y[x] == "P" || y[x] == "Q" || y[x] == "R" || y[x] == "S" || y[x] == "T" || y[x] == "U" ||
					y[x] == "V" || y[x] == "W" || y[x] == "X" || y[x] == "Y" || y[x] == "Z" || y[x] == "a" || y[x] == "b" ||
					y[x] == "c" || y[x] == "d" || y[x] == "e" || y[x] == "f" || y[x] == "g" || y[x] == "h" || y[x] == "i" ||
					y[x] == "j" || y[x] == "k" || y[x] == "l" || y[x] == "m" || y[x] == "n" || y[x] == "o" || y[x] == "p" ||
					y[x] == "q" || y[x] == "r" || y[x] == "s" || y[x] == "t" || y[x] == "u" || y[x] == "v" || y[x] == "w" ||
					y[x] == "x" || y[x] == "y" || y[x] == "z" || y[x] == "!" || y[x] == "*")
					y[x] = "";
			}

			var finalList = y.join('');

			finalList = link + " 0 " + finalList;
			finalList = "link id flightID timeDepart timeArrive price1 price2 price3 \n" + finalList;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights/cebR.txt', finalList, function(err) {
					if (err) return console.log(err);
					console.log('Write successful!');
				});
		}
	});





 });
