var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', process.env.PORT);

app.use(express.static(__dirname + "/public"));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/views', express.static(__dirname + '/public/views'));
app.use('/nm/angular', express.static(__dirname + '/public/nm/angular'));
app.use('/nm/angular-animate', express.static(__dirname + '/public/nm/angular-animate'));
app.use('/nm/angular-aria', express.static(__dirname + '/public/nm/angular-aria'));
app.use('/nm/angular-material', express.static(__dirname + '/public/nm/angular-material'));
app.use('/nm/angular-messages', express.static(__dirname + '/public/nm/angular-messages'));
app.use('/nm/angular-route', express.static(__dirname + '/public/nm/angular-route'));
app.use('/nm/jquery/dist', express.static(__dirname + '/public/nm/jquery/dist'));




app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('/public/index.html', {
    root: __dirname
  });
});

/**
app.use(express.static(path.join(__dirname, 'public')));
**/

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
