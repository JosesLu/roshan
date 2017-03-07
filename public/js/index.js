function login() {
	$.ajax({
		url: 'flights.json',
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		dataType: 'JSON',

		success: function(data) {
			//console.log(data);
			var length = data.length;
			renderHTML(data, length);
		}
	});

	function renderHTML(data, length) {
		var counter = 0;
		var counter1 = 0;
		var htFrom = $("#fromTXB").val();
		var htTo = $("#toTXB").val();

		window.location = "/flight-results.html";

	}

}

function populate() { //Round-Trip
	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	function renderIMG(data, length) {
		var img = [];
		var counter = 0;
		for (var i = 0; i < 30; i++) {
			img[i] = data[counter] + data[counter + 1];
			counter = counter + 2;
		}
		// for(var i=0;i<img.length;i++)
		// console.log(img[i] + " ");
		var logo = "logo";
		for (var i = 0; i < 30; i++) {
			logo = logo + i;
			if (img[i] == 'Z2') {
				document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
				logo = "logo";
			}
			if (img[i] == 'PR') {
				document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
				logo = "logo";
			}
			if (img[i] == '5J') {
				document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
				logo = "logo";
			}

		}
	}

	var ceb, airasia, pal;
	var palJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/palR.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	var cebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/cebR.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	var airasiaJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/airasiaR.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	renderHTML();

	function renderHTML(data, length) {
		var aaCounter = 0, palCounter = 0, cebCounter = 0;
			if(airasiaJson == null)
			{
					aaCounter = 1;
			}
			if(palJson == null)
			{
					palCounter = 1;
			}
			if(cebJson == null)
			{
					cebCounter = 1;
			}

		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].airlineName = "ceb";
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].airlineName = "airasia";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].airlineName = "pal";


		var cebLink = cebJson[0].link;
		var aaLink = airasiaJson[0].link;
		var palLink = palJson[0].link;


		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].link = cebJson[0].link; 

		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].link = airasiaJson[0].link; 

		for(var i = 0;i < palJson.length;i++)
			palJson[i].link = palJson[0].link; 

		var data = [];
		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeDepart;
			if(xxx.includes('p'))
			{	
				data = palJson[i].timeDepart.split('');
				//data = parseInt(data);
				if(palJson[i].timeDepart.length == 4)
				{
					var pm = data[0];
					pm = parseInt(pm);
					pm = pm + 12;
					pm = pm.toString();
					pm = pm + data[1] + data[2];
					palJson[i].timeDepart = pm;
					//console.log(palJson[i].timeDepart);
				}
			}
			if(xxx.includes('a'))
			{	
				data = palJson[i].timeDepart.split('');
				//data = parseInt(data);
				if(palJson[i].timeDepart.length == 4)
				{
					var pm = '0' + data[0] + data[1] + data[2];
					palJson[i].timeDepart = pm;
				}
				if(palJson[i].timeDepart.length == 2)
				{
					var pm = '0' + data[0] + '0' + '0';
					palJson[i].timeDepart = pm;
				}
				if(palJson[i].timeDepart.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeDepart = pm;
				}
			}
		}

		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeArrive;
			if(xxx.includes('p'))
			{	
				data = palJson[i].timeArrive.split('');
				//data = parseInt(data);
				if(palJson[i].timeArrive.length == 4)
				{
					var pm = data[0];
					pm = parseInt(pm);
					pm = pm + 12;
					pm = pm.toString();
					pm = pm + data[1] + data[2];
					palJson[i].timeArrive = pm;
					//console.log(palJson[i].timeDepart);
				}
				if(palJson[i].timeArrive.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeArrive = pm;
				}
			}
			if(xxx.includes('a'))
			{	
				data = palJson[i].timeArrive.split('');
				//data = parseInt(data);
				if(palJson[i].timeArrive.length == 4)
				{
					var pm = '0' + data[0] + data[1] + data[2];
					palJson[i].timeArrive = pm;
				}
				if(palJson[i].timeArrive.length == 2)
				{
					var pm = '0' + data[0] + '0' + '0';
					palJson[i].timeArrive = pm;
				}
				if(palJson[i].timeArrive.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeArrive = pm;
				}
			}
		}

		for(var i = 0;i < palJson.length;i++)
		{
			palJson[i].price1 = (palJson[i].price1*50);
		}
		var counterx;
		var cebJson1;
		for(var i = 0;i < cebJson.length;i++)
		{
			if(cebJson[i].price1 == null)
			{
				delete cebJson[i].airlineName;
				delete cebJson[i].id;
				delete cebJson[i].timeArrive;
				delete cebJson[i].timeDepart;
				counterx = i;
			}
		}
		for(var i = 0;i < cebJson-counterx;i++)
		{
			if(cebJson[i].price1 == null)
			{
				i++;
			}
			else
				cebJson1[i] = cebJson[i];
		}
		for(var i = 0;i < cebJson.length;i++)
		{
			if(cebJson[i].price1 == null)
			{
				delete cebJson[i].airlineName;
				delete cebJson[i].id;
				delete cebJson[i].timeArrive;
				delete cebJson[i].timeDepart;
				counterx = i;
			}
		}
		var xy = cebJson.concat(palJson);
		var final = xy.concat(airasiaJson);
		for (var i = 0; i < final.length; i++) {
			delete final[i].origin;
			delete final[i].flightID;
			delete final[i].price2;
			delete final[i].price3;
			delete final[i].duration1;
			delete final[i].duration2;
			delete final[i].fDuration1;
			delete final[i].fDuration2;
			delete final[i].origin;
			delete final[i].destination;
		}
		var counter = 0;
		var counter1 = 0;
		var htFrom = $("#fromTXB").val();
		var htTo = $("#toTXB").val();

		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		var btn = "btn";

		final.sort(function(a, b) {
		    return parseFloat(a.price1) - parseFloat(b.price1);
		});


		var loopCount = 30;
		var rc = "rc";
		var indexToRemove = 30 - final.length;
		if (final.length < 30)
		{
			loopCount = final.length;
			for(var i = 30 - indexToRemove;i <= 30;i++){
				rc = rc + i;
				document.getElementById(rc).style.display = 'none';
				rc = "rc";
			}
			
		}


		var logo = "logo";
		for (var i = 0; i < loopCount; i++) {
			logo = logo + i;
			
	
			if (final[i].airlineName == 'pal') {
				document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
				logo = "logo";
			}
			if (final[i].airlineName == 'ceb') {
				document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
				logo = "logo";
			}
			if (final[i].airlineName == 'airasia') {
				document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
				logo = "logo";
			}

		}
		
		for (var i = 1; i < loopCount + 1; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = final[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < loopCount + 1; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = final[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < loopCount + 1; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "₱ " + final[i - 1].price1;
			price = "price";

		}
		for (var i = 1; i < loopCount; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  final[i - 1].link;
			btn = "btn";

		}

	}
}

function populateOne() { //One-way flights
	var tripType = sessionStorage.getItem('Trip-Type');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	function renderIMG(data, length) {
		var img = [];
		var counter = 0;
		for (var i = 0; i < 30; i++) {
			img[i] = data[counter] + data[counter + 1];
			counter = counter + 2;
		}
		// for(var i=0;i<img.length;i++)
		// console.log(img[i] + " ");
		var logo = "logo";
		for (var i = 0; i < 30; i++) {
			logo = logo + i;
			if (img[i] == 'Z2') {
				document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
				logo = "logo";
			}
			if (img[i] == 'PR') {
				document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
				logo = "logo";
			}
			if (img[i] == '5J') {
				document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
				logo = "logo";
			}

		}
	}

	var ceb, airasia, pal;
	var palJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/pal.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	var cebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/ceb.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	var airasiaJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/airasia.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	renderHTML();

	function renderHTML(data, length) {
		var aaCounter = 0, palCounter = 0, cebCounter = 0;
			if(airasiaJson == null)
			{
					aaCounter = 1;
			}
			if(palJson == null)
			{
					palCounter = 1;
			}
			if(cebJson == null)
			{
					cebCounter = 1;
			}

		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].airlineName = "ceb";
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].airlineName = "airasia";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].airlineName = "pal";


		var cebLink = cebJson[0].link;
		var aaLink = airasiaJson[0].link;
		var palLink = palJson[0].link;


		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].link = cebJson[0].link; 

		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].link = airasiaJson[0].link; 

		for(var i = 0;i < palJson.length;i++)
			palJson[i].link = palJson[0].link; 

		var data = [];
		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeDepart;
			if(xxx.includes('p'))
			{	
				data = palJson[i].timeDepart.split('');
				//data = parseInt(data);
				if(palJson[i].timeDepart.length == 4)
				{
					var pm = data[0];
					pm = parseInt(pm);
					pm = pm + 12;
					pm = pm.toString();
					pm = pm + data[1] + data[2];
					palJson[i].timeDepart = pm;
					//console.log(palJson[i].timeDepart);
				}
			}
			if(xxx.includes('a'))
			{	
				data = palJson[i].timeDepart.split('');
				//data = parseInt(data);
				if(palJson[i].timeDepart.length == 4)
				{
					var pm = '0' + data[0] + data[1] + data[2];
					palJson[i].timeDepart = pm;
				}
				if(palJson[i].timeDepart.length == 2)
				{
					var pm = '0' + data[0] + '0' + '0';
					palJson[i].timeDepart = pm;
				}
				if(palJson[i].timeDepart.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeDepart = pm;
				}
			}
		}

		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeArrive;
		
			if(xxx.includes('p'))
			{	
				data = palJson[i].timeArrive.split('');
				//data = parseInt(data);
				if(palJson[i].timeArrive.length == 4)
				{
					var pm = data[0];
					pm = parseInt(pm);
					pm = pm + 12;
					pm = pm.toString();
					pm = pm + data[1] + data[2];
					palJson[i].timeArrive = pm;
					//console.log(palJson[i].timeDepart);
				}
				if(palJson[i].timeArrive.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeArrive = pm;
				}
			}
			if(xxx.includes('a'))
			{	
				data = palJson[i].timeArrive.split('');
				//data = parseInt(data);
				if(palJson[i].timeArrive.length == 4)
				{
					var pm = '0' + data[0] + data[1] + data[2];
					palJson[i].timeArrive = pm;
				}
				if(palJson[i].timeArrive.length == 2)
				{
					var pm = '0' + data[0] + '0' + '0';
					palJson[i].timeArrive = pm;
				}
				if(palJson[i].timeArrive.length == 5)
				{
					var pm = data[0] + data[1] + data[2] + data[3];
					palJson[i].timeArrive = pm;
				}
			}
		}

		for(var i = 0;i < palJson.length;i++)
		{
			palJson[i].price1 = (palJson[i].price1*50);
		}
		var counterx;
		var cebJson1;
		for(var i = 0;i < cebJson.length;i++)
		{
			if(cebJson[i].price1 == null)
			{
				delete cebJson[i].airlineName;
				delete cebJson[i].id;
				delete cebJson[i].timeArrive;
				delete cebJson[i].timeDepart;
				counterx = i;
			}
		}
		for(var i = 0;i < cebJson-counterx;i++)
		{
			if(cebJson[i].price1 == null)
			{
				i++;
			}
			else
				cebJson1[i] = cebJson[i];
		}
		for(var i = 0;i < cebJson.length;i++)
		{
			if(cebJson[i].price1 == null)
			{
				delete cebJson[i].airlineName;
				delete cebJson[i].id;
				delete cebJson[i].timeArrive;
				delete cebJson[i].timeDepart;
				counterx = i;
			}
		}
		var xy = cebJson.concat(palJson);
		var final = xy.concat(airasiaJson);
		for (var i = 0; i < final.length; i++) {
			delete final[i].origin;
			delete final[i].flightID;
			delete final[i].price2;
			delete final[i].price3;
			delete final[i].duration1;
			delete final[i].duration2;
			delete final[i].fDuration1;
			delete final[i].fDuration2;
			delete final[i].origin;
			delete final[i].destination;
		}
		var counter = 0;
		var counter1 = 0;
		var htFrom = $("#fromTXB").val();
		var htTo = $("#toTXB").val();

		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		var btn = "btn";

		final.sort(function(a, b) {
		    return parseFloat(a.price1) - parseFloat(b.price1);
		});


		var loopCount = 30;
		var rc = "rc";
		var indexToRemove = 30 - final.length;
		if (final.length < 30)
		{
			loopCount = final.length;
			for(var i = 30 - indexToRemove;i <= 30;i++){
				rc = rc + i;
				document.getElementById(rc).style.display = 'none';
				rc = "rc";
			}
			
		}


		var logo = "logo";
		for (var i = 0; i < loopCount; i++) {
			logo = logo + i;
			
	
			if (final[i].airlineName == 'pal') {
				document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
				logo = "logo";
			}
			if (final[i].airlineName == 'ceb') {
				document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
				logo = "logo";
			}
			if (final[i].airlineName == 'airasia') {
				document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
				logo = "logo";
			}

		}
		
		for (var i = 1; i < loopCount + 1; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = final[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < loopCount + 1; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = final[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < loopCount + 1; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "₱ " + final[i - 1].price1;
			price = "price";

		}
		for (var i = 1; i < loopCount; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  final[i - 1].link;
			btn = "btn";

		}

	}

}

function populateHotels() { //One-way flights

	var hotels = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "hotels.txt",
			'dataType': "text",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();
	var hotelLinks = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "hotelLinks.txt",
			'dataType': "text",
			'success': function(data) {
				json = data;
			}
		});

		return json;
	})();

	var lines = hotels.split("\n");  
	var hLinks = hotelLinks.split("\n");  

	var div = document.getElementById('results');
console.log(hLinks.length);
	for(var i = 0;i < hLinks.length;i++)
	{
	div.innerHTML += '<div class="result-container"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos" src="img/hotels/manila-pavillion.jpg"> </div> <div class="col-md-4"> <p class="hotel-name" id="hotelName'+ i +'"></p> <p class="hotel-info" id="info'+ i +'"></p> </div> <div class="col-md-4"> <p class="header-login"></p> <a class="btn" id="btn'+ i +'" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=400\'); return false;" type="button">Book This Hotel</a> </div> </div> </div> </div>';

	}
	// var loopCount = 30;
	// var rc = "rc";
	// var indexToRemove = 30 - final.length;
	// if (final.length < 30)
	// {
	// 	loopCount = final.length;
	// 	for(var i = 30 - indexToRemove;i <= 30;i++){
	// 		rc = rc + i;
	// 		document.getElementById(rc).style.display = 'none';
	// 		rc = "rc";
	// 	}
		
	// }


	var hotelNames = [];
	var hotelInfo = [];

	for(var i = 0;i < lines.length/2;i++){
		hotelNames[i] = lines[i * 2];
	}
	for(var i = 0,counter = 1;i < lines.length/2;i++){
		hotelInfo[i] = lines[counter];
		counter = counter+2;
	}

	

	for(var i = 0;i<lines.length/2;i++){
		var hText = hotelInfo[i];
		
		hText = hText.replace("Business Type: ","");
		hText = hText.replace("Tel: "," ");
		hText = hText.replace("Fax: "," ");
		hText = hText.replace("Web:"," ");
		hText = hText.substr(hText.indexOf(":") + 1);
		hotelInfo[i] = hText;
		//console.log(hText);
	}
	//console.log(hotelInfo);	

	var hotelName = "hotelName";
	var info = "info";
	var btn = "btn";
	for (var i = 0; i < hLinks.length; i++) {

		hotelName = hotelName + i; //Append current iteration to match dtime ID
		document.getElementById(hotelName).innerHTML = hotelNames[i];
		hotelName = "hotelName";

		}
	for (var i = 0; i < hLinks.length; i++) {

		info = info + i; //Append current iteration to match dtime ID
		document.getElementById(info).innerHTML = hotelInfo[i];
		info = "info";

	}	
	for (var i = 1; i < hLinks.length; i++) {

		btn = btn + i;
		document.getElementById(btn).href =  hLinks[i - 1];
		btn = "btn";

	}

	sessionStorage.removeItem('Trip-Type');
}


function dothemagic() {

	var fromTXB = $("#fromTXB").val();
	var toTXB = $("#toTXB").val();
	var tripType = $("#triptype").val();
	var counter = 0;
	if(fromTXB == toTXB)
	{
		window.alert('Destination and origin cannot be similar.');
		
	}


	else {
		fromTXB = fromTXB.substr(fromTXB.length - 3);
		toTXB = toTXB.substr(toTXB.length - 3);
		sessionStorage.setItem('Current Location', fromTXB);
		sessionStorage.setItem('Destination', toTXB);
		sessionStorage.setItem('Trip-Type', tripType);
	}
}

function sortByPrice(){
	
		final.sort(function(a, b) {
		    return parseFloat(a.timeDepart) - parseFloat(b.timeDepart);
		});
}

function flightClicked(){

	$("icry").click(function() {
	    alert(this.id); // or alert($(this).attr('id'));
	});

}