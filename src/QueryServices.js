/**
 * http://usejsdoc.org/
 * Author: Ajitabh Sharma
 * Purpose: This file holds only and all query related services.
 */

const express = require('express');
const db = require("./lib/DBConnectionMgmt.js");

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

module.exports = router1;