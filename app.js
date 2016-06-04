var express = require('express');
var path = require('path');
var app = express();


/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
*/

// Express Middleware for serving static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.listen(3000, function () {
  console.log('Adventure app listening on port 3000!');
});
