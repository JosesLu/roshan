function login() {
	$.ajax({
		url: 'http://localhost:8008/flights.json/',
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
	$.ajax({
		url: 'http://localhost:8008/flights.json/',
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




		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		for (var i = 1; i < 6; i++) {
			dtime = dtime + i;
			document.getElementById(dtime).innerHTML = data[i - 1].timeDepart + "/" + data[i - 1].returnDepartTime;
			dtime = "dTime";

		}
		for (var i = 1; i < 6; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = data[i - 1].timeArrive + "/" + data[i - 1].returnArriveTime;
			atime = "aTime";

		}
		for (var i = 1; i < 6; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "P " + data[i - 1].price1;
			price = "price";

		}

	}


}
function populateOne() { //One-way flights
	$.ajax({
		url: 'http://localhost:8008/oneway.txt/',
		type: 'GET',
		contentType: 'application/text; charset=utf-8',
		dataType: 'text',

		success: function(data) {
			//console.log(data);
			var length = data.length;
			renderIMG(data, length);
		}
	});
	function renderIMG(data, length) {
		
		data = data.replace(/,/g, "");
		var img = [];
		var counter = 0;
		for(var i=0;i<5;i++)
		{
			img[i] = data[counter] + data[counter+1];
			counter=counter+2;
		}
		// for(var i=0;i<img.length;i++)
		// console.log(img[i] + " ");
		var logo = "logo";
		for(var i=0;i<6;i++)
		{
			logo = logo + i;
			if(img[i]=='Z2'){
				document.getElementById(logo).src = "img/airline%20logo/air-asia.png";
				logo = "logo";
			}
			if(img[i]=='PR'){
				document.getElementById(logo).src = "img/airline%20logo/philippine-airlines.png";
				logo = "logo";
			}
			if(img[i]=='5J'){
				document.getElementById(logo).src = "img/airline%20logo/cebu-pacific.png";
				logo = "logo";
			}
			
		}
	}

	$.ajax({
		url: 'http://localhost:8008/flights.json/',
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

		var dtime = "dTime";
		var atime = "aTime";
		var price = "price";
		for (var i = 1; i < 6; i++) {
			dtime = dtime + i; //Append current iteration to match dtime ID
			document.getElementById(dtime).innerHTML = data[i - 1].timeDepart;
			dtime = "dTime";

		}
		for (var i = 1; i < 6; i++) {
			atime = atime + i;
			document.getElementById(atime).innerHTML = data[i - 1].timeArrive;
			atime = "aTime";

		}
		for (var i = 1; i < 6; i++) {
			price = i + price;
			document.getElementById(price).innerHTML = "P " + data[i - 1].price1;
			price = "price";

		}

	}




}

function dothemagic() {

	var fromTXB = $("#fromTXB").val();
	var toTXB = $("#toTXB").val();
	fromTXB = fromTXB.substr(fromTXB.length - 3); 
	toTXB = toTXB.substr(toTXB.length - 3); 
	sessionStorage.setItem('Current Location', fromTXB);
	sessionStorage.setItem('Destination', toTXB);
}

