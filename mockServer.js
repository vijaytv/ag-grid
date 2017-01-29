var fs = require('fs');
var express = require('express');
var dummyjson = require('dummy-json');

var template = fs.readFileSync('./mocks/people.hbs', {encoding: 'utf8'});
var app = express();

app.get('/api/people', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(dummyjson.parse(template));
});

app.listen(3200);
