var email;
var password;

function show()
{
	document.getElementById('register').style.display = "block"
	document.getElementById('login').style.display = "none"
};

function register()
{
	document.getElementById('register').style.display = "none"
	document.getElementById('login').style.display = "block"
	email = $('#regEmail').val();
	password = $('#regPass').val();
	if (regPass.value != regConfPass.value)
	{
		document.getElementById("modal-title").textContent = "Error";
		document.getElementById("modal-text").textContent = "Passwords do not match";
		$('#modal').modal('show');
		document.getElementById('register').style.display = "block"
		document.getElementById('login').style.display = "none"
		$('#regEmail').val('');
		$('#regPass').val('');
		$('#regConfPass').val('');
		if (regPass.value.length < 3)
		{
			document.getElementById("modal-title").textContent = "Error";
			document.getElementById("modal-text").textContent = "Password must contain atleast 3 characters";
			$('#modal').modal('show');
			document.getElementById('register').style.display = "block"
			document.getElementById('login').style.display = "none"
			if (regEmail.value.length < 2)
			{
				document.getElementById("modal-title").textContent = "Error";
				document.getElementById("modal-text").textContent = "Email must contain atleast 3 characters";
				$('#modal').modal('show');
				document.getElementById('register').style.display = "block"
				document.getElementById('login').style.display = "none"
			}
		}
	}
	else
	{
		document.getElementById("modal-title").textContent = "Success";
		document.getElementById("modal-text").textContent = "Registration Complete";
		$('#modal').modal('show');
		$('#regEmail').val('');
		$('#regPass').val('');
		$('#regConfPass').val('');
	}
};

function login()
{
	var logEmail = $('#logEmail').val();
	var logPass = $('#logPass').val();
	if (logEmail == email && logPass == password)
	{
		document.getElementById("modal-title").textContent = "Success";
		document.getElementById("modal-text").textContent = "Login Successful";
		$('#modal').modal('show');
		$('#logEmail').val('');
		$('#logPass').val('');
	}
	else
	{
		document.getElementById("modal-title").textContent = "Error";
		document.getElementById("modal-text").textContent = "Incorrect Email/Password";
		$('#modal').modal('show');
		$('#logEmail').val('');
		$('#logPass').val('');
	}
};

function rememberMe()
{
	if (localStorage.chkbx && localStorage.chkbx != '')
	{
		$('#remember_me').attr('checked', 'checked');
		$('#logEmail').val(localStorage.usrname);
		$('#logPass').val(localStorage.pass);
	}
	else
	{
		$('#remember_me').removeAttr('checked');
		$('#logEmail').val('');
		$('#logPass').val('');
	}
}