var assert = require('assert');
describe('Index page', function() {
	it('Verify page title', function() {
		browser.url('http://www.jetcost.com.ph/en/results_v2.php?sid=FPH4_584e1509a03f0');
		var inputUser = $('ul.result__list.list-group');
		var value = [];
		 value = inputUser.getText();

		for(x=0;x<value.length;x++)
		{
			value=value.replace("(+1)","");
		}



		for(x = 0 ; x < value.length ; x++)
		{
			 value = value.replace("\n", " ");
			 
			
		}






   
     var z =[];
     var counter = 0;
     for(x = 0 ; x < value.length ; x++)
   	 {
  
    	if(value[x] == 'D' && value[x+1] == 'V' && value[x+2] == 'O')
     	{

    		z[x] = "\n" + "D";

    	}
 		else
 		{	
		
 			z[x] = value[x];

 		} 		
 	}

		var str = z.join("");
		str = str.substring(str.indexOf("\n") + 1);

		fs = require('fs');
		fs.writeFile('flights.txt', str, function (err) {
		  if (err) return console.log(err);
		  console.log('Write successful!');
	
		});

	});
}); 