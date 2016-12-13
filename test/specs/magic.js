var assert = require('assert');
describe('Index page', function() {
	it('Verify page title', function() {
		browser.url('http://www.jetcost.com.ph/en/results_v2.php?sid=FPH4_584e1509a03f0');
		//CBT TO MNL - http://www.jetcost.com.ph/en/results_v2.php?sid=FPH4_584e54ae32c2a
		//DVO TO MNL - http://www.jetcost.com.ph/en/results_v2.php?sid=FPH4_584e1509a03f0
		browser.newWindow('http://localhost:8008/options.html', '', 'width=40,height=20,resizable,scrollbars=yes,status=1');
		var from1 = $('div#from2');
		var to1 = $('div#to2');
		var from = from1.getText();
		var to = to1.getText();

		browser.close();
		var loc = [];
		loc = from.split('');
		var des = [];
		des = to.split('');
		console.log("startshere" + loc);

		var inputUser = $('ul.result__list.list-group');
		var value = [];
		value = inputUser.getText();
		for (x = 0; x < value.length; x++) {
			value = value.replace("(+1)", "");
		}
		for (x = 0; x < value.length; x++) {
			value = value.replace("\n", " ");
		}

		var z = [];

		var counter = 1;

		for (x = 1; x < value.length; x++) {


			if (value[x] == loc[0] && value[x + 1] == loc[1] && value[x + 2] == loc[2] && (value[x - 2] * 1 == value[x - 2] || value[x - 5] == 'l')) {
				z[x] = "\n" + counter + " ";
				counter++;
			} else {
				z[x] = value[x];
			}


		}


		for (x = 1; x < z.length; x++) {
			if (z[x] == "A" || z[x] == "B" || z[x] == "C" || z[x] == "D" || z[x] == "E" || z[x] == "F" || z[x] == "G" ||
				z[x] == "H" || z[x] == "I" || z[x] == "J" || z[x] == "K" || z[x] == "L" || z[x] == "M" || z[x] == "N" ||
				z[x] == "O" || z[x] == "P" || z[x] == "Q" || z[x] == "R" || z[x] == "S" || z[x] == "T" || z[x] == "U" ||
				z[x] == "V" || z[x] == "W" || z[x] == "X" || z[x] == "Y" || z[x] == "Z" || z[x] == "a" || z[x] == "b" ||
				z[x] == "c" || z[x] == "d" || z[x] == "e" || z[x] == "f" || z[x] == "g" || z[x] == "h" || z[x] == "i" ||
				z[x] == "j" || z[x] == "k" || z[x] == "l" || z[x] == "m" || z[x] == "n" || z[x] == "o" || z[x] == "p" ||
				z[x] == "q" || z[x] == "r" || z[x] == "s" || z[x] == "t" || z[x] == "u" || z[x] == "v" || z[x] == "w" ||
				z[x] == "x" || z[x] == "y" || z[x] == "z")
				z[x] = "";

		}
		var str = z.join("");
		for (var i = 0; i < str.length; i++) {
			str = str.replace(" 1 ", "");
		}
		str = "0" + str;
		str = "id timeDepart departDuration timeArrive returnDepartTime arriveDuration returnArriveTime price1 price2 price3 price4 \n" + str;
		fs = require('fs');
		fs.writeFile('D:/THESIS/Roshan/public/flights.txt', str, function(err) {
			if (err) return console.log(err);
			console.log('Write successful!');

		});

	});
});