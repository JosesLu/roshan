function indexRadio() {
	if(document.getElementById('direct').checked) {
	  document.getElementById('search-btn').setAttribute( "onClick", "location.href = 'flight-results.html';" );
	}else if(document.getElementById('round-trip').checked) {
	  document.getElementById('search-btn').setAttribute( "onClick", "location.href = 'round-trip-results.html';" );
	}
}
window.onload=indexRadio;



function login() {
	$.ajax({
		url: 'http://localhost:8080/db',
		type: 'GET',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',

		success : function(data) {
			var length = data.length;
			renderHTML(data,length);
		}
	});
	function renderHTML(data,length){
		var counter=0;
		var counter1=0;
		var htUsername = $("#logEmail").val();
		var htPassword = $("#logPass").val();
		for(i = 0; i < length ; i++){
			var username = data[i].username;
			var password = data[i].password;

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
			
		}

	}
};
