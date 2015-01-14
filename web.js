
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var app = express();
 
//app.use(express.logger('dev'));
morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
app.use(compression({
  threshold: 512
}))
app.use(express.static("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
