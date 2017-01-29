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


	browser.url('https://www.google.com.ph/search?q=webdriverio+how+to+get+text+from+all+h3+class&oq=webdriverio+how+to+get+text+from+all+h3+class+&aqs=chrome..69i57.7203j0j7&sourceid=chrome&ie=UTF-8#hotel_dates=2017-02-05%2C2017-02-06&tbm=lcl&q=davao+hotels+list+with+info+and+price');
	browser.click("//span[contains(., 'Price')]");
	browser.pause(3000);
	var hotels = $('//*[@id="rl_ist0"]/div/div/div[1]').getText();
	for(var i = 0;i < hotels.length;i++)
	{
		hotels = hotels.replace("\n"," ");
	}
	var z = [];
	var counter = 1;
	for (x = 1; x < hotels.length; x++) {
		if (hotels[x] == "₱") {
			z[x] = "\n" + counter + " ";
			counter++;
		} else {
			z[x] = hotels[x];
		}
	}
	var temp;
	var here;
	for(var i = 0;i < hotels.length; i++)
	{
		if(hotels[x]*0 == 0 && hotels[x + 2]*0 != 0)
		{

		}
	}




	hotels = z.join('');
	hotels = "0 " + hotels;
	hotels = "id price \n" + hotels;
	fs = require('fs');
	fs.writeFile('D:/Roshan/public/flights.txt', hotels, function(err) {
		if (err) return console.log(err);
		console.log('Write successful!');
	});


});
});
