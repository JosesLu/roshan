function login() {
	$.ajax({
		url: 'http://localhost:8008/flights.json',
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
		/*
				for(i = 0; i < length ; i++){
					var from = data[i].username;
					var to = data[i].password;

					if(htUsername == '' || htPassword == '')
					{
						loginemptyFieldsError();
						counter = 1;
					}

					if(username == htUsername && password == htPassword)
					{
						document.getElementById("modal-text").textContent = "Login Successful";
						$('#modal').modal('show');
						currentUser = htUsername;
						$('#logEmail').val('');
						$('#logPass').val('');
						sessionStorage.setItem('achoc', 'nein');
						sessionStorage.setItem('user', currentUser);
						sessionStorage.removeItem('registrationError');
						window.location = '/dashboard';
						counter1=1;

					}
					if (htUsername != '' && htPassword != '' && counter == 0 && counter1 == 0) {
						window.alert('Username or Password incorrect.');
						$("#logEmail").val('');
						$("#logPass").val('');
					}
					
				} */

	}
	/*
	jQuery.get('flights.txt', function(data) {
	console.log(data);
	
	});*/
}

function populate() {
	$.ajax({
		url: 'http://localhost:8008/flights.json',
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
			document.getElementById(price).innerHTML = "P " + data[i - 1].price1 / 2;
			price = "price";

		}

	}


}

function dothemagic() {

	var fromTXB = $("#fromTXB").val();
	var toTXB = $("#toTXB").val();


	sessionStorage.setItem('Current Location', fromTXB);
	sessionStorage.setItem('Destination', toTXB);
}