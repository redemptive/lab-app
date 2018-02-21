const request = require("request");
const http = require("http");
const ejs = require("ejs");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

function startServer() {
	app.get("/", (req, res) => {
		console.log("Request recieved for " + req.url);
		res.render("index", {
			tubeData: tubeData,
			dlrData: dlrData,
			routes: routes
		});
		console.log("Sent " + req.url);
	});
	app.get("/routes", (req, res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.render("routes", {
			tubeData: tubeData,
			dlrData: dlrData,
			routes: routes
		});
		console.log("Sent " + req.url);
	});
	app.get("/index.css", (req, res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(fs.readFileSync("./index.css","utf-8"));
		res.end();
		console.log("Sent " + req.url);
	});
	app.get("/script.js", (req,res) => {
		console.log("Request recieved for " + req.url + " from " + req.connection.remoteAddress);
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(fs.readFileSync("./script.js","utf-8"));
 		res.end();
 		console.log("Sent " + req.url);
	});
	app.listen(port, () => {
		console.log("Server started on port " + port); 
	});
}

startServer()