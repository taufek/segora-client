var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan')
var app = express();
 
// app.configure(function () {
//   app.use(function (req, res, next) {
//     res.setHeader('Cache-Control', 'max-age=86400');
//     return next();
//   });
// });

//app.use(express.logger('dev'));
morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
