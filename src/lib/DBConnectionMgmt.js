/**
 * http://usejsdoc.org/
 * This is for managing database connection.
 */

const mysql    = require("mysql");
const settings = require("./settings");

const db  = mysql.createConnection(settings.db2);

module.exports = db;