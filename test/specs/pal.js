var URL, htmlFrom, htmlTo, htmlDepDate, htmlArDate, htmlPassengers;
describe('Crawl', function() {
	it('Philippine Airlines', function() {
		browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
		/* Gets user values from html file (options.html) */
		fullFrom = $('div#from2').getText(); 
		fullTo = $('div#to2').getText(); 
		htmlFrom = $('div#from3').getText(); 
		htmlTo = $('div#to3').getText(); 
		htmlTripType = $('div#typeofTrip').getText();
		htmlDepDate = $('div#dateD').getText();
		var userDate = htmlDepDate[3] + htmlDepDate[4] + htmlDepDate[2] + htmlDepDate[0] + htmlDepDate[1] + htmlDepDate[2] + htmlDepDate[6] + htmlDepDate[7] + htmlDepDate[8] + htmlDepDate[9]; 
		htmlArDate = $('div#dateA').getText();
		var userArDate = htmlArDate[3] + htmlArDate[4] + htmlArDate[2] + htmlArDate[0] + htmlArDate[1] + htmlArDate[2] + htmlArDate[6] + htmlArDate[7] + htmlArDate[8] + htmlArDate[9]; 
		htmlPassengers = $('div#numPass').getText();
		browser.close();

		/* Link template variable for PAL flights to be edited with user data*/
		var template = 'https://www.expedia.com/Flights-Search?langid=1033&trip=oneway&leg1=from:Manila,%20Philippines%20(MNL-Ninoy%20Aquino%20Intl.),to:Davao%20(DVO-Francisco%20Bangoy%20Intl.),departure:DEPDATETANYT&passengers=children:0,adults:1,seniors:0,infantinlap:N&options=cabinclass:economy,sortby:price,carrier:PR&mode=search&paandi=true';
		template = template.replace('MNL',htmlFrom);
		template = template.replace('DVO',htmlTo);
		template = template.replace('DEPDATE',userDate);
		browser.url(template);

		/* Get xPath of element containing results */
		var flights = $('//*[@id="flightModuleList"]/div');
		flights = flights.getText();

		/* Results parsing */
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
		flights = flights.replace(/p/g, "");
		flights = flights.replace(/a/g, "");


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
		indexCut-=100; /* Delete remains */
		vJoin = vJoin.substr(0,indexCut);

		for (x = 1; x < vJoin.length; x++) {
			if (vJoin[x] == 'R' && vJoin[x + 1] == 'e') {
				z[x] = "\n" + "00 ";
				counter++;
			} else {
				z[x] = vJoin[x];
			}
		}

		var str = z.join('');
		
		//indexCut = indexCut + 5;
		
		str = str.replace(/esult/g, " ");
		str = str.replace(/sult/g, " ");
		str = str.replace(/.00/g, "");str = str.replace(/.01/g, "");str = str.replace(/:/g, "");
		str = "link id price1 timeDepart timeArrive fDuration1 fDuration2 origin destination \n" + template + " " + str;
		fs = require('fs');
		fs.writeFile('D:/Roshan/public/flights/pal.txt', str, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});	
	
	
		if(htmlTripType == 1)
		{
			browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
			/* Gets user values from html file (options.html) */
			fullFrom = $('div#from2').getText(); 
			fullTo = $('div#to2').getText(); 
			htmlFrom = $('div#from3').getText(); 
			htmlTo = $('div#to3').getText(); 
			htmlTripType = $('div#typeofTrip').getText();
			htmlDepDate = $('div#dateD').getText();
			var userDate = htmlDepDate[3] + htmlDepDate[4] + htmlDepDate[2] + htmlDepDate[0] + htmlDepDate[1] + htmlDepDate[2] + htmlDepDate[6] + htmlDepDate[7] + htmlDepDate[8] + htmlDepDate[9]; 
			htmlArDate = $('div#dateA').getText();
			var userArDate = htmlArDate[3] + htmlArDate[4] + htmlArDate[2] + htmlArDate[0] + htmlArDate[1] + htmlArDate[2] + htmlArDate[6] + htmlArDate[7] + htmlArDate[8] + htmlArDate[9]; 
			htmlPassengers = $('div#numPass').getText();
			browser.close();

			/* Link template variable for PAL flights to be edited with user data*/
			var template = 'https://www.expedia.com/Flights-Search?langid=1033&trip=oneway&leg1=from:Manila,%20Philippines%20(MNL-Ninoy%20Aquino%20Intl.),to:Davao%20(DVO-Francisco%20Bangoy%20Intl.),departure:DEPDATETANYT&passengers=children:0,adults:1,seniors:0,infantinlap:N&options=cabinclass:economy,sortby:price,carrier:PR&mode=search&paandi=true';
			template = template.replace('MNL',htmlTo);
			template = template.replace('DVO',htmlFrom);
			template = template.replace('DEPDATE',userDate);
			browser.url(template);

			/* Get xPath of element containing results */
			var flights = $('//*[@id="flightModuleList"]/div');
			flights = flights.getText();

			/* Results parsing */
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
			flights = flights.replace(/p/g, "");
			flights = flights.replace(/a/g, "");


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
			indexCut-=100; /* Delete remains */
			vJoin = vJoin.substr(0,indexCut);

			for (x = 1; x < vJoin.length; x++) {
				if (vJoin[x] == 'R' && vJoin[x + 1] == 'e') {
					z[x] = "\n" + "00 ";
					counter++;
				} else {
					z[x] = vJoin[x];
				}
			}

			var str = z.join('');
			
			//indexCut = indexCut + 5;
			
			str = str.replace(/esult/g, " ");
			str = str.replace(/sult/g, " ");
			str = str.replace(/.00/g, "");str = str.replace(/.01/g, "");str = str.replace(/:/g, "");
			str = "link id price1 timeDepart timeArrive fDuration1 fDuration2 origin destination \n" + template + " " + str;
			fs = require('fs');
			fs.writeFile('D:/Roshan/public/flights/palR.txt', str, function(err) {
					if (err) return console.log(err);
					console.log('Write successful!');
				});			
		}
		
	});
	});