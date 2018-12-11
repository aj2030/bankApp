/**
 * http://usejsdoc.org/
 */

const db = require("./DBConnectionMgmt.js");

module.exports = {
		
		function getNewCustomerID(){//Utility function
			let sqlQuery = `select max(CUSTOMER_ID) as max_cust_id from CUSTOMER_DETAILS`;
			let newCustomerID;
			
			//Fire query
			db.query(sqlQuery, function (error, results, fields) {
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
			});
			
			return newCustomerID;
		}
};