/**
 * http://usejsdoc.org/
 * Author: Ajitabh Sharma
 * Purpose: Serve as initialization point for micro services used to manage bank app
 * Comment #1
 * Comment #2
 */

// Required libraries
const express 		= require('express');
const bodyParser 	= require('body-parser');
const router1 		= require('./QueryServices.js');
const router2 		= require('./CreateServices.js');
const db 			= require('./lib/DBConnectionMgmt.js');

const app = express();

/* Initializing the server to listen on port 8080 */
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

app.use(bodyParser.json());
app.use('/', [router1, router2]);

process.on('SIGINT', () => {
	db.end();
	console.log('Database connection closed.');
	server.close();
	console.log('Server closed.');
	process.exit(0);
});
