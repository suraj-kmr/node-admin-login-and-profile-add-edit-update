var sql = require('../database.js');
var md5 = require('md5');

module.exports = {
	getAdmin: function(req,res) {
		return new Promise(function(resolve, reject) {
			sql.query("Select * from admin where username = '"+ req.username +"' and password = '"+ md5(req.password)+"'", function (err, rows) {
				if (err) 
					reject(err);
				else 
					resolve(rows);
			});
		});
	},
	getAdminById: function(req,res) {
		return new Promise(function(resolve, reject) {
			sql.query("Select * from admin where id = '"+ req.id +"'", function (err, row) {
				if (err) 
					reject(err);
				else 
					resolve(row);
			});
		});
	},
	updateAdminById: function(req,res) {
		console.log(req.image);
		return new Promise(function(resolve, reject) {
			sql.query("UPDATE admin SET username = '"+req.username+"',image = '"+req.image+"' where id = '"+ req.id +"'", function (err, row) {
				if (err) 
					reject(err);
				else 
					resolve(row);
			});
		});
	},
	updatePassword: function(req,res) {
		return new Promise(function(resolve, reject) {
			sql.query("UPDATE admin SET password = '"+md5(req.password)+"' where id = '"+ req.id +"'", function (err, row) {
				if (err) 
					reject(err);
				else 
					console.log(row);
					resolve(row);
			});
		});
	},
}
