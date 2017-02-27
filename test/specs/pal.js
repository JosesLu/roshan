var URL, htmlFrom, htmlTo, htmlDepDate, htmlArDate, htmlPassengers;
describe('Crawl', function() {
	it('Philippine Airlines', function() {
		browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
		fullFrom = $('div#from2').getText(); //Gets values from "From" ID in html file I wrote
		fullTo = $('div#to2').getText(); //Gets values from "To" ID in html file I wrote
		htmlFrom = $('div#from3').getText(); //Gets values from "From" ID in html file I wrote
		htmlTo = $('div#to3').getText(); //Gets values from "To" ID in html file I wrote
		htmlTripType = $('div#typeofTrip').getText();
		htmlDepDate = $('div#dateD').getText();
		var userDate = htmlDepDate[3] + htmlDepDate[4] + htmlDepDate[2] + htmlDepDate[0] + htmlDepDate[1] + htmlDepDate[2] + htmlDepDate[6] + htmlDepDate[7] + htmlDepDate[8] + htmlDepDate[9]; 
		htmlArDate = $('div#dateA').getText();
		htmlPassengers = $('div#numPass').getText();
		browser.close();

		var template = 'https://www.expedia.com/Flights-Search?langid=1033&trip=oneway&leg1=from:Manila,%20Philippines%20(MNL-Ninoy%20Aquino%20Intl.),to:Davao%20(DVO-Francisco%20Bangoy%20Intl.),departure:DEPDATETANYT&passengers=children:0,adults:2,seniors:0,infantinlap:N&options=cabinclass:economy,sortby:price,carrier:PR&mode=search&paandi=true';
		var template1 = template;
		template = template.replace('MNL',htmlFrom);
		template = template.replace('DVO',htmlTo);
		template = template.replace('DEPDATE',userDate);
		browser.url(template);
		var flights = $('//*[@id="flightModuleList"]/div');
		flights = flights.getText();

		for (x = 0; x < flights.length; x++) {
			flights = flights.replace("\n", " ");
		}
		for (x = 0; x < flights.length; x++) {
			flights = flights.replace("Free Cancel w/in 24 hrs", "");
		}
		for (x = 0; x < flights.length; x++) {
			flights = flights.replace("+1", "");
		}
		for (x = 0; x < flights.length; x++) {
			flights = flights.replace("$", "");
		}
		flights = flights.replace(/Flight details and baggage fees/g, "");
		flights = flights.replace(/Flight spans 1 day/g, "");
		flights = flights.replace(/,/g, "");
		flights = flights.replace(/-/g, "");
		flights = flights.replace(/Nonstop/g, "");
		flights = flights.replace(/Philippine Airlines/g, "");
		flights = flights.replace(/operated by PAL Express/g, "");
		flights = flights.replace(/Live/g, "");
		flights = flights.replace(/one way/g, "");

		var indexCut,cut;
		var z = [];
		var counter = 1;
		for (x = 1; x < flights.length; x++) {
			if (flights[x] == '1' && flights[x + 2] == 's') {
				indexCut = x;
				break;
			} 
		}
		var v = [];
		for (x = 1; x < flights.length; x++) {
			if (flights[x] == '2' && flights[x + 1] == '8') {
				x = x+3;
			} 
			else {
				v[x] = flights[x];
			}
		}
		var vJoin = v.join('');



		for (x = 1; x < vJoin.length; x++) {
			if (vJoin[x] == 'R' && vJoin[x + 1] == 'e') {
				z[x] = "\n" + " ";
				counter++;
			} else {
				z[x] = vJoin[x];
			}
		}

		var str = z.join('');
		str = str.substr(0,indexCut);
		str = str.replace(/esult/g, "");
		str = str.replace(/sult/g, "");
		str = str.replace(/.00/g, "");str = str.replace(/.01/g, "");str = str.replace(/:/g, "");
		str = "id price1 timeDepart	timeArrive fDuration1 fDuration2 origin destination \n" + str;
		fs = require('fs');
		fs.writeFile('D:/Roshan/public/flights/pal.txt', str, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});
	
		if(htmlTripType == 1)
		{
			var userDate1 = htmlArDate[3] + htmlArDate[4] + htmlArDate[2] + htmlArDate[0] + htmlArDate[1] + htmlArDate[2] + htmlArDate[6] + htmlArDate[7] + htmlArDate[8] + htmlArDate[9]; 
			template1 = template1.replace('MNL',htmlTo);
			template = template1.replace('DVO',htmlFrom);
			template1 = template1.replace('DEPDATE',userDate1);
			template1 = template1.replace('oneway','roundtrip');
			browser.url(template1);
			var flights = $('//*[@id="flightModuleList"]/div');
			flights = flights.getText();

			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("\n", " ");
			}
			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("Free Cancel w/in 24 hrs", "");
			}
			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("+1", "");
			}
			for (x = 0; x < flights.length; x++) {
				flights = flights.replace("$", "");
			}
			flights = flights.replace(/Flight details and baggage fees/g, "");
			flights = flights.replace(/Flight spans 1 day/g, "");
			flights = flights.replace(/,/g, "");
			flights = flights.replace(/-/g, "");
			flights = flights.replace(/Nonstop/g, "");
			flights = flights.replace(/Philippine Airlines/g, "");
			flights = flights.replace(/operated by PAL Express/g, "");
			flights = flights.replace(/Live/g, "");
			flights = flights.replace(/one way/g, "");

			var indexCut,cut;
			var z = [];
			var counter = 1;
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == '1' && flights[x + 2] == 's') {
					indexCut = x;
					break;
				} 
			}
			var v = [];
			for (x = 1; x < flights.length; x++) {
				if (flights[x] == '2' && flights[x + 1] == '8') {
					x = x+3;
				} 
				else {
					v[x] = flights[x];
				}
			}
			var vJoin = v.join('');



			for (x = 1; x < vJoin.length; x++) {
				if (vJoin[x] == 'R' && vJoin[x + 1] == 'e') {
					z[x] = "\n" + " ";
					counter++;
				} else {
					z[x] = vJoin[x];
				}
			}

			var str = z.join('');
			str = str.substr(0,indexCut);
			str = str.replace(/esult/g, "");
			str = str.replace(/sult/g, "");
			str = str.replace(/.00/g, "");str = str.replace(/.01/g, "");str = str.replace(/:/g, "");
			str = "id price1 timeDepart	timeArrive fDuration1 fDuration2 origin destination \n" + str;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights/palR.txt', str, function(err) {
					if (err) return console.log(err);
					console.log('Write successful!');
				});





		}

		
	});
	});