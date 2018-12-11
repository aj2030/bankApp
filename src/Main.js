/**
 * http://usejsdoc.org/
 * [Ajitabh]: A sample commit to GIT repository
 */

// Required libraries
const express = require('express');
const settings = require("./settings");
const mysql    = require("mysql");
const bodyParser = require('body-parser');

const db  = mysql.createConnection(settings.db2);

const app = express();

const server = app.listen('8080', () => { //Initialize DB connection, test it and wait for connection
	db.connect((err) => {
		if(err){
			console.log("Error occured during connection: " + err);
			process.exit(0);
		}
		else
			console.log(`Server listening on port number 8080`);
	});

}); // Server Listening done

var router1 = express.Router();
router1.get('/demographic', (req,res,next) => {//Get Customer Details
	//Get parameter first
	let customerID = req.query.customerID;
	let pattern = /^C\d{4}$/g;
	
	console.log(`Input customer ID is : ${customerID}`);
	
	if(pattern.test(customerID)){
		let sqlQuery = `SELECT * FROM CUSTOMER_DETAILS WHERE CUSTOMER_ID = '${customerID}'`;
		
		//Fire query
		db.query(sqlQuery, function (error, results, fields) {
		    if (error){
		    	return res.status(404).end();
		    }else{
			    results.forEach(result => {
			    	res.status(200);
			    	res.send(result);
			    });
		    }
		});
	}
	else{
		console.log('Invalid input provided.')
		res.send('Invalid input provided.');
	}
});

var router2 = express.Router();
router2.post('/demographic', (req,res,next) => {//Insert Customer Details
	let body = req.body;
	let customerID = getNewCustomerID();
	console.log('New customer ID is: ' + customerID);
	
	let sqlQuery = `INSERT INTO CUSTOMER_DETAILS VALUES (
						'${customerID}', 
						'${body.FIRST_NAME}', 
						'${body.LAST_NAME}', 
						'${body.DOB}', 
						'${body.MOBILE}', 
						'${body.SEX}', 
						'${body.CITY}', 
						'${body.STATE}', 
						'${body.PINCODE}', 
						NOW(), 
						'${body.IMAGE}')`;
	//Fire query
	db.query(sqlQuery, function (error, results, fields) {
	    if (error){
	    	console.log(error);
	    	res.status(404)
	    	res.send({"errorCode": error.code, "errorMsg": error.sqlMessage});
	    }else{
	    	console.log(results);
	    	res.status(200);
	    	let response = {"status" : "success", "customer_id" : customerID};
	    	res.send(response);
	    }
	});
});

function getNewCustomerID(){//Utility function
	let sqlQuery = `select max(CUSTOMER_ID) as max_cust_id from CUSTOMER_DETAILS`;
	let newCustomerID;
	
	//Fire query
	/*db.query(sqlQuery, function (error, results, fields) {
	    if (error){
	    	return null;
	    }else{
	    	console.log('Current customer ID is: ' + JSON.stringify(results[0]));
	    	let currentMax = results[0].max_cust_id;
	    	let numberPart = parseInt(currentMax.substring(1));
	    	numberPart++; // Increase the number part
	    	
	    	//Formulating new customer ID
	    	var newLength = numberPart.toString().length;
	    	console.log('Length is: ' + newLength);
	    	//let newCustomerID;
	    	switch(newLength){
		    	case 1 : newCustomerID =  'C000' + numberPart;break;
		    	case 2 : newCustomerID =  'C00' + numberPart;break;
		    	case 3 : newCustomerID =  'C0' + numberPart;break;
		    	case 4 : newCustomerID =  'C' + numberPart;break;
		    	default: newCustomerID =  'undefined';
	    	}
	    	//return newCustomerID;
	    }
	});*/
	
	return newCustomerID;
}

app.use(bodyParser.json());
app.use('/', [router1, router2]);

process.on('SIGINT', () => {
	db.end();
	console.log('Database connection closed.');
	server.close();
	console.log('Server closed.');
	process.exit(0);
});
