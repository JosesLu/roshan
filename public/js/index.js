var ifNoResult = 0;var final;

function populate() { 
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	var dtime = "dTime";
	var atime = "aTime";
	var price = "price";
	var btn = "btn";


	/* Retrieve data from json using AJAX */
	var ceb = (function() {
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
	var airasia = (function() {
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
	var pal = (function() {
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
	renderHTML();

	function renderHTML(data, length) 
	{

		for(var i = 0;i < ceb.length;i++)
			ceb[i].airlineName = "ceb";
		for(var i = 0;i < airasia.length;i++)
			airasia[i].airlineName = "airasia";
		for(var i = 0;i < pal.length;i++)
			pal[i].airlineName = "pal";

		var cebLink = ceb[0].link;
		var aaLink = airasia[0].link;
		var palLink = pal[0].link;

		for(var i = 0;i < ceb.length;i++)
			ceb[i].link = ceb[0].link; 
		for(var i = 0;i < airasia.length;i++)
			airasia[i].link = airasia[0].link;
		for(var i = 0;i < pal.length;i++)
			pal[i].link = pal[0].link; 

		var combined = airasia.concat(ceb);
		combined = combined.concat(pal);


		/* Repeated splice twice, dont know why 1st undefined result not spliced */
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		var div = document.getElementById('resultss');
		for(var i = 1;i < combined.length;i++)
		{
			var ii = i-1;
			div.innerHTML += '<div class="result-container" id="rc' + i + '"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos" src="img/gray.png" id="logo' + ii +'"> </div> <div class="col-md-4"> <div class="row"> <div class="col-md-6"> <p class="header-login">FROM</p> <p class="header-login" id="dTime' + i + '"></p> </div> <div class="col-md-6"> <p class="header-login">TO</p> <p class="header-login" id="aTime' + i +'"></p> </div> </div> </div> <div class="col-md-4"> <p class="header-login" id="' + i +'price"></p> <a id="btn' + i +'" class="btn" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=450, height=450\'); return false;" type="button">Book This Flight</a> </div> </div> </div> </div>';
		}
		var logo = "logo";
		for (var i = 0; i < combined.length; i++) 
		{
			logo = logo + i;
			if (combined[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
					logo = "logo";
				}
			}

			if (combined[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
					logo = "logo";
				}
			}
	
			if (combined[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
					logo = "logo";
				}
			}
		}
			// for (var i = 0; i < combined.length; i++) 
			// {
			// 	console.log(combined[i]);
			// }
		for (var i = 1; i < combined.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = combined[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < combined.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = combined[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < combined.length; i++) {
			if(combined[i - 1].airlineName == 'pal')
			{
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + (combined[i - 1].price1 * 50).toFixed(2);
				price = "price";
			}
			else {
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + combined[i - 1].price1;
				price = "price";
			}
		}
		for (var i = 1; i < combined.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  combined[i - 1].link;
			btn = "btn";

		}

	}
}
function populateOne() { 
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	var dtime = "dTime";
	var atime = "aTime";
	var price = "price";
	var btn = "btn";


	/* Retrieve data from json using AJAX */
	var ceb = (function() {
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
	var airasia = (function() {
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
	var pal = (function() {
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
	renderHTML();

	function renderHTML(data, length) 
	{

		for(var i = 0;i < ceb.length;i++)
			ceb[i].airlineName = "ceb";
		for(var i = 0;i < airasia.length;i++)
			airasia[i].airlineName = "airasia";
		for(var i = 0;i < pal.length;i++)
			pal[i].airlineName = "pal";

		var cebLink = ceb[0].link;
		var aaLink = airasia[0].link;
		var palLink = pal[0].link;

		for(var i = 0;i < ceb.length;i++)
			ceb[i].link = ceb[0].link; 
		for(var i = 0;i < airasia.length;i++)
			airasia[i].link = airasia[0].link;
		for(var i = 0;i < pal.length;i++)
			pal[i].link = pal[0].link; 

		var combined = airasia.concat(ceb);
		combined = combined.concat(pal);


		/* Repeated splice twice, dont know why 1st undefined result not spliced */
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		var div = document.getElementById('resultss');
		for(var i = 1;i < combined.length;i++)
		{
			var ii = i-1;
			div.innerHTML += '<div class="result-container" id="rc' + i + '"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos" src="img/gray.png" id="logo' + ii +'"> </div> <div class="col-md-4"> <div class="row"> <div class="col-md-6"> <p class="header-login">FROM</p> <p class="header-login" id="dTime' + i + '"></p> </div> <div class="col-md-6"> <p class="header-login">TO</p> <p class="header-login" id="aTime' + i +'"></p> </div> </div> </div> <div class="col-md-4"> <p class="header-login" id="' + i +'price"></p> <a id="btn' + i +'" class="btn" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=450, height=450\'); return false;" type="button">Book This Flight</a> </div> </div> </div> </div>';
		}
		var logo = "logo";
		for (var i = 0; i < combined.length; i++) 
		{
			logo = logo + i;
			if (combined[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
					logo = "logo";
				}
			}

			if (combined[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
					logo = "logo";
				}
			}
	
			if (combined[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
					logo = "logo";
				}
			}
		}
			// for (var i = 0; i < combined.length; i++) 
			// {
			// 	console.log(combined[i]);
			// }
		for (var i = 1; i < combined.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = combined[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < combined.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = combined[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < combined.length; i++) {
			if(combined[i - 1].airlineName == 'pal')
			{
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + (combined[i - 1].price1 * 50).toFixed(2);
				price = "price";
			}
			else {
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + combined[i - 1].price1;
				price = "price";
			}
		}
		for (var i = 1; i < combined.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  combined[i - 1].link;
			btn = "btn";

		}

	}
}
function populateAlternateRoutes() { 
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	var dtime = "dTime";
	var atime = "aTime";
	var price = "price";
	var btn = "btn";
	var fr = "fr";
	var to = "to";


	/* Retrieve data from json using AJAX */
	var alteraacebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraaceb.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alteraadvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraadvo.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alteraamnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraamnl.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebcebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebceb.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebdvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebdvo.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebmnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebmnl.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpalcebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpalceb.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpaldvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpaldvo.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpalmnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpalmnl.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	renderHTML();

	function renderHTML(data, length) 
	{
		var origin = altercebcebJson[0].link[64] + altercebcebJson[0].link[65] + altercebcebJson[0].link[66];
		for(var i = 0;i < altercebcebJson.length;i++){
			altercebcebJson[i].origin = origin;
			altercebcebJson[i].destination = 'CEB';	
		}
		for(var i = 0;i < altercebmnlJson.length;i++){
			altercebmnlJson[i].origin = origin;
			altercebmnlJson[i].destination = 'MNL';	
		}
		for(var i = 0;i < altercebdvoJson.length;i++){
			altercebdvoJson[i].origin = origin;
			altercebdvoJson[i].destination = 'DVO';	
		}

		for(var i = 0;i < alteraacebJson.length;i++){
			alteraacebJson[i].origin = origin;
			alteraacebJson[i].destination = 'CEB';	
		}
		for(var i = 0;i < alteraamnlJson.length;i++){
			alteraamnlJson[i].origin = origin;
			alteraamnlJson[i].destination = 'MNL';	
		}
		for(var i = 0;i < alteraadvoJson.length;i++){
			alteraadvoJson[i].origin = origin;
			alteraadvoJson[i].destination = 'DVO';	
		}

		for(var i = 0;i < alterpalcebJson.length;i++){
			alterpalcebJson[i].origin = origin;
			alterpalcebJson[i].destination = 'CEB';	
		}
		for(var i = 0;i < alterpalmnlJson.length;i++){
			alterpalmnlJson[i].origin = origin;
			alterpalmnlJson[i].destination = 'MNL';	
		}
		for(var i = 0;i < alterpaldvoJson.length;i++){
			alterpaldvoJson[i].origin = origin;
			alterpaldvoJson[i].destination = 'DVO';	
		}


		var airasia = alteraacebJson.concat(alteraadvoJson);
		airasia = airasia.concat(alteraamnlJson);

		var ceb = altercebcebJson.concat(altercebdvoJson);
		ceb = ceb.concat(altercebmnlJson);

		var pal = alterpalcebJson.concat(alterpaldvoJson);
		pal = pal.concat(alterpalmnlJson);

		for(var i = 0;i < ceb.length;i++)
			ceb[i].airlineName = "ceb";
		for(var i = 0;i < airasia.length;i++)
			airasia[i].airlineName = "airasia";
		for(var i = 0;i < pal.length;i++)
			pal[i].airlineName = "pal";

		var cebLink = ceb[0].link;
		var aaLink = airasia[0].link;
		var palLink = pal[0].link;
	
		for(var i = 0;i < ceb.length;i++)
			ceb[i].link = ceb[0].link; 
		for(var i = 0;i < airasia.length;i++)
			airasia[i].link = airasia[0].link;
		for(var i = 0;i < pal.length;i++)
			pal[i].link = pal[0].link; 

		var combined = airasia.concat(ceb);
		combined = combined.concat(pal);


		/* Repeated splice twice, dont know why 1st undefined result not spliced */
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		var div = document.getElementById('resultss');
		for(var i = 1;i < combined.length;i++)
		{
			var ii = i-1;
			div.innerHTML += '<div class="result-container-alternate" id="rc' + i + '"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos-alternate" src="img/gray.png" id="logo' + ii +'"> </div> <div class="col-md-4"> <div class="row"> <div class="col-md-6"> <p class="header-login" id="fr' + i + '">FROM</p> <p class="header-login" id="dTime' + i + '"></p> </div> <div class="col-md-6"> <p class="header-login" id="to' + i +'">TO</p> <p class="header-login" id="aTime' + i +'"></p> </div> </div> </div> <div class="col-md-4"> <p class="header-login" id="' + i +'price"></p> <a id="btn' + i +'" class="btn" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=450, height=450\'); return false;" type="button">Book This Flight</a> </div> </div> </div> </div>';
		}
		var logo = "logo";
		for (var i = 0; i < combined.length; i++) 
		{
			logo = logo + i;
			if (combined[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/palmini.png";
					logo = "logo";
				}
			}

			if (combined[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebmini.png";
					logo = "logo";
				}
			}
	
			if (combined[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/airasiamini.png";
					logo = "logo";
				}
			}
		}

		for(var i = 1;i < combined.length;i++) {
			fr = fr + i;
			document.getElementById(fr).innerHTML = "FROM (" + combined[i - 1].origin + ")";
			fr = "fr";

			to = to + i;
			document.getElementById(to).innerHTML = "TO (" + combined[i - 1].destination + ")";
			to = "to";
		}	
		for (var i = 1; i < combined.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = combined[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < combined.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = combined[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < combined.length; i++) {
			if(combined[i - 1].airlineName == 'pal')
			{
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + (combined[i - 1].price1 * 50).toFixed(2);
				price = "price";
			}
			else {
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + combined[i - 1].price1;
				price = "price";
			}
		}
		for (var i = 1; i < combined.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  combined[i - 1].link;
			btn = "btn";

		}

	}
}
function populateAlternateRoutesRight() { 
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});

	var dtime = "dTime";
	var atime = "aTime";
	var price = "price";
	var btn = "btn";
	var fr = "fr";
	var to = "to";


	/* Retrieve data from json using AJAX */
	var alteraacebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraaceb1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alteraadvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraadvo1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alteraamnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alteraamnl1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebcebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebceb1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebdvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebdvo1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var altercebmnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/altercebmnl1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpalcebJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpalceb1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpaldvoJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpaldvo1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	var alterpalmnlJson = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': "flights/alterpalmnl1.json",
			'dataType': "json",
			'success': function(data) {
				json = data;
			}
		});
		return json;
	})();
	renderHTML();

	function renderHTML(data, length) 
	{
		var destination = altercebcebJson[0].link[71] + altercebcebJson[0].link[72] + altercebcebJson[0].link[73];
		console.log(altercebcebJson[0].link);
		for(var i = 0;i < altercebcebJson.length;i++){
			altercebcebJson[i].destination = destination;
			altercebcebJson[i].origin = 'CEB';	
		}
		for(var i = 0;i < altercebmnlJson.length;i++){
			altercebmnlJson[i].destination = destination;
			altercebmnlJson[i].origin = 'MNL';	
		}
		for(var i = 0;i < altercebdvoJson.length;i++){
			altercebdvoJson[i].destination = destination;
			altercebdvoJson[i].origin = 'DVO';	
		}

		for(var i = 0;i < alteraacebJson.length;i++){
			alteraacebJson[i].destination = destination;
			alteraacebJson[i].origin = 'CEB';	
		}
		for(var i = 0;i < alteraamnlJson.length;i++){
			alteraamnlJson[i].destination = destination;
			alteraamnlJson[i].origin = 'MNL';	
		}
		for(var i = 0;i < alteraadvoJson.length;i++){
			alteraadvoJson[i].destination = destination;
			alteraadvoJson[i].origin = 'DVO';	
		}

		for(var i = 0;i < alterpalcebJson.length;i++){
			alterpalcebJson[i].destination = destination;
			alterpalcebJson[i].origin = 'CEB';	
		}
		for(var i = 0;i < alterpalmnlJson.length;i++){
			alterpalmnlJson[i].destination = destination;
			alterpalmnlJson[i].origin = 'MNL';	
		}
		for(var i = 0;i < alterpaldvoJson.length;i++){
			alterpaldvoJson[i].destination = destination;
			alterpaldvoJson[i].origin = 'DVO';	
		}

		var airasia = alteraacebJson.concat(alteraadvoJson);
		airasia = airasia.concat(alteraamnlJson);

		var ceb = altercebcebJson.concat(altercebdvoJson);
		ceb = ceb.concat(altercebmnlJson);

		var pal = alterpalcebJson.concat(alterpaldvoJson);
		pal = pal.concat(alterpalmnlJson);

		for(var i = 0;i < ceb.length;i++)
			ceb[i].airlineName = "ceb";
		for(var i = 0;i < airasia.length;i++)
			airasia[i].airlineName = "airasia";
		for(var i = 0;i < pal.length;i++)
			pal[i].airlineName = "pal";

		var cebLink = ceb[0].link;
		var aaLink = airasia[0].link;
		var palLink = pal[0].link;

		for(var i = 0;i < ceb.length;i++)
			ceb[i].link = ceb[0].link; 
		for(var i = 0;i < airasia.length;i++)
			airasia[i].link = airasia[0].link;
		for(var i = 0;i < pal.length;i++)
			pal[i].link = pal[0].link; 

		var combined = airasia.concat(ceb);
		combined = combined.concat(pal);


		/* Repeated splice twice, dont know why 1st undefined result not spliced */
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}
		for(var i = 0;i < combined.length;i++)
		{
			if(combined[i].price1 == undefined)
			{
				combined.splice(i,1);
			}
		}

		var div = document.getElementById('resultss-right');
		for(var i = 1;i < combined.length;i++)
		{
			var ii = i-1;
			div.innerHTML += '<div class="result-container-alternate" id="rc' + i + '"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos-alternate" src="img/gray.png" id="logo' + ii +'"> </div> <div class="col-md-4"> <div class="row"> <div class="col-md-6"> <p class="header-login" id="fr' + i + '">FROM</p> <p class="header-login" id="dTime' + i + '"></p> </div> <div class="col-md-6"> <p class="header-login" id="to' + i +'">TO</p> <p class="header-login" id="aTime' + i +'"></p> </div> </div> </div> <div class="col-md-4"> <p class="header-login" id="' + i +'price"></p> <a id="btn' + i +'" class="btn" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=450, height=450\'); return false;" type="button">Book This Flight</a> </div> </div> </div> </div>';
		}
		var logo = "logo";
		for (var i = 0; i < combined.length; i++) 
		{
			logo = logo + i;
			if (combined[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/palmini.png";
					logo = "logo";
				}
			}

			if (combined[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebmini.png";
					logo = "logo";
				}
			}
	
			if (combined[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/airasiamini.png";
					logo = "logo";
				}
			}
		}
		for(var i = 1;i < combined.length;i++) {
			fr = fr + i;
			document.getElementById(fr).innerHTML = "FROM (" + combined[i - 1].origin + ")";
			fr = "fr";

			to = to + i;
			document.getElementById(to).innerHTML = "TO (" + combined[i - 1].destination + ")";
			to = "to";
		}	
		for (var i = 1; i < combined.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = combined[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < combined.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = combined[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < combined.length; i++) {
			if(combined[i - 1].airlineName == 'pal')
			{
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + (combined[i - 1].price1 * 50).toFixed(2);
				price = "price";
			}
			else {
				price = i + price;
				document.getElementById(price).innerHTML = "₱ " + combined[i - 1].price1;
				price = "price";
			}
		}
		for (var i = 1; i < combined.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  combined[i - 1].link;
			btn = "btn";

		}

	}
}

function populateHotels() { 

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

	for(var i = 0;i < hLinks.length;i++)
	{
	div.innerHTML += '<div class="result-container"> <div class="flight-cards"> <div class="row"> <div class="col-md-4"> <img class="airline-logos" src="img/hotels/manila-pavillion.jpg"> </div> <div class="col-md-4"> <p class="hotel-name" id="hotelName'+ i +'"></p> <p class="hotel-info" id="info'+ i +'"></p> </div> <div class="col-md-4"> <p class="header-login"></p> <a class="btn" id="btn'+ i +'" onclick="window.open(this.href,\'targetWindow\', \'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=400\'); return false;" type="button">Book This Hotel</a> </div> </div> </div> </div>';

	}

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

	}
		

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
	var fromFull = $("#xx").val();
	var toFull = $("#yy").val();
	var dateDepart = $("#dateDepart").val();
	var budgetRange = $("#budget-range").val();
	var dateArrive = "0";
	if($("#dateArrive").val() == '[object HTMLInputElement]')
	{
		dateArrive = "0";
	}
	else
	{
		dateArrive = $("#dateArrive").val();
	}
	
	var counter = 0;

	if(fromTXB == '' || toTXB == '')
	{
		emptyFieldsError();

	}
	if(fromTXB == toTXB && fromTXB != '' && toTXB != '')
	{
		similarFieldsError();
	}


	else {

		fromTXB = fromTXB.substr(fromTXB.length - 3);
		toTXB = toTXB.substr(toTXB.length - 3);
		sessionStorage.setItem('Current Location', fromTXB);
		sessionStorage.setItem('Destination', toTXB);
		sessionStorage.setItem('Full origin', fromFull);
		sessionStorage.setItem('Full destination', toFull);
		sessionStorage.setItem('Trip-Type', tripType);
		sessionStorage.setItem('Date-Depart', dateDepart);
		sessionStorage.setItem('Date-Arrive', dateArrive);
		sessionStorage.setItem('Budget Range', budgetRange);
	}
}

function emptyFieldsError(){
	// $('#myModal').modal('show');
	// $('#modal-title').text('Error');
	// $('#modal-body').text('Origin and Destination cannot be empty.');
	// $('#myModal').on('hidden.bs.modal', function () {
	//  		window.location = '/';
	// });
	window.alert('Origin and Destination cannot be empty');
}


function similarFieldsError(){
	// $('#myModal').modal('show');
	// $('#modal-title').text('Error');
	// $('#modal-body').text('Origin and Destination cannot have the same values.');
	// $('#myModal').on('hidden.bs.modal', function () {
	//  		window.location = '/';
	// });
	window.alert('Origin and Destination cannot have the same values.');
}


function sortByPrice(){
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});



	/* Retrieve data from json using AJAX */
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
		

		/* Assigns corresponding airline names to each result */
		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].airlineName = "ceb";
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].airlineName = "airasia";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].airlineName = "pal";


		var cebLink = cebJson[0].link;
		var aaLink = airasiaJson[0].link;
		var palLink = "https://www.philippineairlines.com/";


		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].link = cebJson[0].link; 
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].link = "http://www.airasia.com/";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].link = "https://www.philippineairlines.com/"; 

		var data = [];
		for(var i = 0;i < airasiaJson.length;i++)
		{
			var xxx = airasiaJson[i].timeDepart;
			if(xxx != undefined)
			{
				if(xxx.includes('p')) /* Removes PM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(airasiaJson[i].timeDepart.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
				}
				if(xxx.includes('a')) /* Removes AM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(palJson[i].timeDepart.length == 4)
					{
						var pm = '0' + data[0] + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 2)
					{
						var pm = '0' + data[0] + '0' + '0';
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 5)
					{
						var pm = data[0] + data[1] + data[2] + data[3];
						airasiaJson[i].timeDepart = pm;
					}
				}
			}
			else {break};
		}

		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeArrive;
			if(xxx != undefined)
			{
				if(xxx.includes('p'))
				{	
					data = palJson[i].timeArrive.split('');
					if(palJson[i].timeArrive.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						palJson[i].timeArrive = pm;
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
			else {break};
		}
		for(var i = 0;i < palJson.length;i++) /* Convert Dollar to PHP (? sry) */
			palJson[i].price1 = (palJson[i].price1*50).toFixed(2);

		/* Delete unnecessary data from results */
		var counterx, cebJson1;
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

		/* Set string equivalents from html ID's */
		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		var btn = "btn";

		/* Programming God / Budget Range function*/
		var budgetRange = sessionStorage.getItem('Budget Range');
		for(var i = 0; i < final.length;i++)
		{
			if(parseInt(final[i].price1) > budgetRange)
			{
				delete final[i].link;
				delete final[i].id;
				delete final[i].timeDepart;
				delete final[i].timeArrive;
				delete final[i].price1;
				delete final[i].airlineName;
			}
		}
		var newfinal = JSON.stringify(final);
		newfinal = newfinal.replace(/{/g,'');
		newfinal = newfinal.replace(/}/g,'');
		newfinal = newfinal.replace(/,/g,'');
		newfinal = newfinal.replace(/""/g,'","');
		newfinal = newfinal.replace(/\["/g,'[{"');
		newfinal = newfinal.replace(/\"]/g,'"}]');
		for(var i = 0;i < newfinal.length;i++)
		{
			if(newfinal[i] == "," && newfinal[i + 2] == "l")
			{
				newfinal = newfinal.substr(0, i) + '},{' + newfinal.substr(i + 1);
			}
		}
		newfinal = JSON.parse(newfinal);

		console.log(newfinal);
		final = newfinal;


		final.sort(function(a, b) {
		    return parseFloat(a.price1) - parseFloat(b.price1);
		});


		// var loopCount = 30;
		// var rc = "rc";
		// var indexToRemove = 30 - final.length;
		// for(var i = 1;i<final.length;i++)
		// {
		// 	if(final[i].timeDepart == null)
		// 	{
		// 		indexToRemove++;
		// 	}
		// }

		var emptycounter = 0;
		for(var i = 0;i < final.length;i++)
		{
			if(final[i].price1 > 1)
			{
				emptycounter++;
			}
		}
		
		if(emptycounter == 0) /* If no results are found */
		 /* If no results are found */
		{
			sessionStorage.setItem('No Flights', '1');
		var currentLocation = sessionStorage.getItem('Full origin');
			var desti = sessionStorage.getItem('Full destination');
			var departdate = sessionStorage.getItem('Date-Depart');
			document.getElementById('descript1').innerHTML = 'No Flights Found'
			document.getElementById('descript2').innerHTML = "We have searched for your requested trip and couldn't find any flights from " + currentLocation + " to " + desti + " on " + departdate +'.';
			document.getElementById('sortingLinks1').innerHTML = 'Would you like to try to search for Alternative Routes?';
			document.getElementById('main-container').style.display = 'block';
			document.getElementById('desc1').style.visibility = 'hidden';
			document.getElementById('desc2').style.visibility = 'hidden';
			document.getElementById('sortingLinks').style.visibility = 'hidden';
			document.getElementById('proceedBtn').style.visibility = 'hidden';
			document.getElementById('desccard').style.visibility = 'hidden';
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";
			ifNoResult = 1;
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";		
			
		}

		// if (final.length < 30)
		// {
		// 	loopCount = final.length;
		// 	for(var i = 30 - indexToRemove;i <= 30;i++){
		// 		rc = rc + i;
		
		// 		rc = "rc";
		// 	}
			
		// }


		var logo = "logo";
		for (var i = 0; i < final.length; i++) {
			logo = logo + i;
			if (final[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
					logo = "logo";
				}
			}

			if (final[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
					logo = "logo";
				}
			}
	
			if (final[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
					logo = "logo";
				}
			}
	

		}
		
		
		for (var i = 1; i < final.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = final[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < final.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = final[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < final.length; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "₱ " + final[i - 1].price1;
			price = "price";

		}
		for (var i = 1; i < final.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  final[i - 1].link;
			btn = "btn";

		}

	}

}

function sortByTimeDepart(){
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});



	/* Retrieve data from json using AJAX */
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
		

		/* Assigns corresponding airline names to each result */
		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].airlineName = "ceb";
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].airlineName = "airasia";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].airlineName = "pal";


		var cebLink = cebJson[0].link;
		var aaLink = airasiaJson[0].link;
		var palLink = "https://www.philippineairlines.com/";


		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].link = cebJson[0].link; 
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].link = "http://www.airasia.com/";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].link = "https://www.philippineairlines.com/"; 

		var data = [];
		for(var i = 0;i < airasiaJson.length;i++)
		{
			var xxx = airasiaJson[i].timeDepart;
			if(xxx != undefined)
			{
				if(xxx.includes('p')) /* Removes PM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(airasiaJson[i].timeDepart.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
				}
				if(xxx.includes('a')) /* Removes AM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(palJson[i].timeDepart.length == 4)
					{
						var pm = '0' + data[0] + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 2)
					{
						var pm = '0' + data[0] + '0' + '0';
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 5)
					{
						var pm = data[0] + data[1] + data[2] + data[3];
						airasiaJson[i].timeDepart = pm;
					}
				}
			}
			else {break};
		}

		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeArrive;
			if(xxx != undefined)
			{
				if(xxx.includes('p'))
				{	
					data = palJson[i].timeArrive.split('');
					if(palJson[i].timeArrive.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						palJson[i].timeArrive = pm;
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
			else {break};
		}
		for(var i = 0;i < palJson.length;i++) /* Convert Dollar to PHP (? sry) */
			palJson[i].price1 = (palJson[i].price1*50).toFixed(2);

		/* Delete unnecessary data from results */
		var counterx, cebJson1;
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

		/* Set string equivalents from html ID's */
		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		var btn = "btn";

		/* Programming God / Budget Range function*/
		var budgetRange = sessionStorage.getItem('Budget Range');
		for(var i = 0; i < final.length;i++)
		{
			if(parseInt(final[i].price1) > budgetRange)
			{
				delete final[i].link;
				delete final[i].id;
				delete final[i].timeDepart;
				delete final[i].timeArrive;
				delete final[i].price1;
				delete final[i].airlineName;
			}
		}
		var newfinal = JSON.stringify(final);
		newfinal = newfinal.replace(/{/g,'');
		newfinal = newfinal.replace(/}/g,'');
		newfinal = newfinal.replace(/,/g,'');
		newfinal = newfinal.replace(/""/g,'","');
		newfinal = newfinal.replace(/\["/g,'[{"');
		newfinal = newfinal.replace(/\"]/g,'"}]');
		for(var i = 0;i < newfinal.length;i++)
		{
			if(newfinal[i] == "," && newfinal[i + 2] == "l")
			{
				newfinal = newfinal.substr(0, i) + '},{' + newfinal.substr(i + 1);
			}
		}
		newfinal = JSON.parse(newfinal);

		console.log(newfinal);
		final = newfinal;


		final.sort(function(a, b) {
		    return parseFloat(a.timeDepart).substring(0,1) - parseFloat(b.timeDepart).substring(0,1)
		});


		// var loopCount = 30;
		// var rc = "rc";
		// var indexToRemove = 30 - final.length;
		// for(var i = 1;i<final.length;i++)
		// {
		// 	if(final[i].timeDepart == null)
		// 	{
		// 		indexToRemove++;
		// 	}
		// }

		var emptycounter = 0;
		for(var i = 0;i < final.length;i++)
		{
			if(final[i].price1 > 1)
			{
				emptycounter++;
			}
		}
		
		if(emptycounter == 0) /* If no results are found */
		 /* If no results are found */
		{
			sessionStorage.setItem('No Flights', '1');
		var currentLocation = sessionStorage.getItem('Full origin');
			var desti = sessionStorage.getItem('Full destination');
			var departdate = sessionStorage.getItem('Date-Depart');
			document.getElementById('descript1').innerHTML = 'No Flights Found'
			document.getElementById('descript2').innerHTML = "We have searched for your requested trip and couldn't find any flights from " + currentLocation + " to " + desti + " on " + departdate +'.';
			document.getElementById('sortingLinks1').innerHTML = 'Would you like to try to search for Alternative Routes?';
			document.getElementById('main-container').style.display = 'block';
			document.getElementById('desc1').style.visibility = 'hidden';
			document.getElementById('desc2').style.visibility = 'hidden';
			document.getElementById('sortingLinks').style.visibility = 'hidden';
			document.getElementById('proceedBtn').style.visibility = 'hidden';
			document.getElementById('desccard').style.visibility = 'hidden';
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";
			ifNoResult = 1;
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";		
			
		}

		// if (final.length < 30)
		// {
		// 	loopCount = final.length;
		// 	for(var i = 30 - indexToRemove;i <= 30;i++){
		// 		rc = rc + i;
		
		// 		rc = "rc";
		// 	}
			
		// }


		var logo = "logo";
		for (var i = 0; i < final.length; i++) {
			logo = logo + i;
			if (final[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
					logo = "logo";
				}
			}

			if (final[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
					logo = "logo";
				}
			}
	
			if (final[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
					logo = "logo";
				}
			}
	

		}
		
		
		for (var i = 1; i < final.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = final[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < final.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = final[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < final.length; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "₱ " + final[i - 1].price1;
			price = "price";

		}
		for (var i = 1; i < final.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  final[i - 1].link;
			btn = "btn";

		}

	}

}

function sortByTimeArrive(){
	var tripType = sessionStorage.getItem('Trip-Type');
	var currentLocation = sessionStorage.getItem('Current Location');
	var desti = sessionStorage.getItem('Destination');
	if(tripType == 1){
		document.getElementById('proceedBtn').innerHTML = 'Proceed to Return Flight';
		document.getElementById('proceedBtn').setAttribute( "onClick", "location.href='/round-trip-results'" );
	}


	var $span = $("#parent2 span");
	$span.attr('id', function (index) {
    return 'span' + index;
	});



	/* Retrieve data from json using AJAX */
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
		

		/* Assigns corresponding airline names to each result */
		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].airlineName = "ceb";
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].airlineName = "airasia";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].airlineName = "pal";


		var cebLink = cebJson[0].link;
		var aaLink = airasiaJson[0].link;
		var palLink = "https://www.philippineairlines.com/";


		for(var i = 0;i < cebJson.length;i++)
			cebJson[i].link = cebJson[0].link; 
		for(var i = 0;i < airasiaJson.length;i++)
			airasiaJson[i].link = "http://www.airasia.com/";
		for(var i = 0;i < palJson.length;i++)
			palJson[i].link = "https://www.philippineairlines.com/"; 

		var data = [];
		for(var i = 0;i < airasiaJson.length;i++)
		{
			var xxx = airasiaJson[i].timeDepart;
			if(xxx != undefined)
			{
				if(xxx.includes('p')) /* Removes PM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(airasiaJson[i].timeDepart.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
				}
				if(xxx.includes('a')) /* Removes AM character in timeDepart */
				{	
					data = airasiaJson[i].timeDepart.split('');
					if(palJson[i].timeDepart.length == 4)
					{
						var pm = '0' + data[0] + data[1] + data[2];
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 2)
					{
						var pm = '0' + data[0] + '0' + '0';
						airasiaJson[i].timeDepart = pm;
					}
					if(airasiaJson[i].timeDepart.length == 5)
					{
						var pm = data[0] + data[1] + data[2] + data[3];
						airasiaJson[i].timeDepart = pm;
					}
				}
			}
			else {break};
		}

		for(var i = 0;i < palJson.length;i++)
		{
			var xxx = palJson[i].timeArrive;
			if(xxx != undefined)
			{
				if(xxx.includes('p'))
				{	
					data = palJson[i].timeArrive.split('');
					if(palJson[i].timeArrive.length == 4)
					{
						var pm = data[0];
						pm = parseInt(pm);
						pm = pm + 12;
						pm = pm.toString();
						pm = pm + data[1] + data[2];
						palJson[i].timeArrive = pm;
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
			else {break};
		}
		for(var i = 0;i < palJson.length;i++) /* Convert Dollar to PHP (? sry) */
			palJson[i].price1 = (palJson[i].price1*50).toFixed(2);

		/* Delete unnecessary data from results */
		var counterx, cebJson1;
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

		/* Set string equivalents from html ID's */
		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		var btn = "btn";

		/* Programming God / Budget Range function*/
		var budgetRange = sessionStorage.getItem('Budget Range');
		for(var i = 0; i < final.length;i++)
		{
			if(parseInt(final[i].price1) > budgetRange)
			{
				delete final[i].link;
				delete final[i].id;
				delete final[i].timeDepart;
				delete final[i].timeArrive;
				delete final[i].price1;
				delete final[i].airlineName;
			}
		}
		var newfinal = JSON.stringify(final);
		newfinal = newfinal.replace(/{/g,'');
		newfinal = newfinal.replace(/}/g,'');
		newfinal = newfinal.replace(/,/g,'');
		newfinal = newfinal.replace(/""/g,'","');
		newfinal = newfinal.replace(/\["/g,'[{"');
		newfinal = newfinal.replace(/\"]/g,'"}]');
		for(var i = 0;i < newfinal.length;i++)
		{
			if(newfinal[i] == "," && newfinal[i + 2] == "l")
			{
				newfinal = newfinal.substr(0, i) + '},{' + newfinal.substr(i + 1);
			}
		}
		newfinal = JSON.parse(newfinal);

		console.log(newfinal);
		final = newfinal;


		final.sort(function(a, b) {
		    return parseFloat(a.timeArrive) - parseFloat(b.timeArrive);
		});


		// var loopCount = 30;
		// var rc = "rc";
		// var indexToRemove = 30 - final.length;
		// for(var i = 1;i<final.length;i++)
		// {
		// 	if(final[i].timeDepart == null)
		// 	{
		// 		indexToRemove++;
		// 	}
		// }

		var emptycounter = 0;
		for(var i = 0;i < final.length;i++)
		{
			if(final[i].price1 > 1)
			{
				emptycounter++;
			}
		}
		
		if(emptycounter == 0) /* If no results are found */
		 /* If no results are found */
		{
			sessionStorage.setItem('No Flights', '1');
		var currentLocation = sessionStorage.getItem('Full origin');
			var desti = sessionStorage.getItem('Full destination');
			var departdate = sessionStorage.getItem('Date-Depart');
			document.getElementById('descript1').innerHTML = 'No Flights Found'
			document.getElementById('descript2').innerHTML = "We have searched for your requested trip and couldn't find any flights from " + currentLocation + " to " + desti + " on " + departdate +'.';
			document.getElementById('sortingLinks1').innerHTML = 'Would you like to try to search for Alternative Routes?';
			document.getElementById('main-container').style.display = 'block';
			document.getElementById('desc1').style.visibility = 'hidden';
			document.getElementById('desc2').style.visibility = 'hidden';
			document.getElementById('sortingLinks').style.visibility = 'hidden';
			document.getElementById('proceedBtn').style.visibility = 'hidden';
			document.getElementById('desccard').style.visibility = 'hidden';
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";
			ifNoResult = 1;
			document.getElementById('footr').className = 'text-center index';
			document.body.style.background = "#f3f3f3 url('../img/background.jpg') no-repeat ";		
			
		}

		// if (final.length < 30)
		// {
		// 	loopCount = final.length;
		// 	for(var i = 30 - indexToRemove;i <= 30;i++){
		// 		rc = rc + i;
		
		// 		rc = "rc";
		// 	}
			
		// }

		var logo = "logo";
		for (var i = 0; i < final.length; i++) {
			logo = logo + i;
			if (final[i].airlineName == 'pal') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
					logo = "logo";
				}
			}

			if (final[i].airlineName == 'ceb') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
					logo = "logo";
				}
			}
	
			if (final[i].airlineName == 'airasia') {
				if(document.getElementById(logo) == null)
				{
					//console.log('');
				}
				else
				{
					document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
					logo = "logo";
				}
			}
	

		}
		
		
		for (var i = 1; i < final.length; i++) {

			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = final[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < final.length; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = final[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < final.length; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "₱ " + final[i - 1].price1;
			price = "price";

		}
		for (var i = 1; i < final.length; i++) {
			btn = btn + i;
			document.getElementById(btn).href =  final[i - 1].link;
			btn = "btn";

		}

	}

}

