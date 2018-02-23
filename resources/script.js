<<<<<<< HEAD
 $(function() {
    var progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + 2 );
 
      if ( val < 99 ) {
        setTimeout( progress, 80 );
      }
    }
 
    setTimeout( progress, 2000 );
  });
=======
$(document).ready(function() {
	console.log("hi");
  	var socket = io();
  	socket.on('db add', function(){
      location.reload(true);
    });
});
>>>>>>> dca8848cca7c59ef55880ec9f3f0040566b18f06
