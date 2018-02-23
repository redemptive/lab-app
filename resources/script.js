$(document).ready(function() {
	console.log("hi");
  	var socket = io();
  	socket.on('db add', function(){
      location.reload(true);
    });
});
