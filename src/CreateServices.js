/**
 * http://usejsdoc.org/
 * Author: Ajitabh Sharma
 * Purpose: This file holds only services that attempts to create new things in DB. For example insert a row in existing database.
 */
const express = require('express');
const db = require("./lib/DBConnectionMgmt.js");

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

module.exports = router2;
