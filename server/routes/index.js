/**
 * Created by chottinger on 12/7/15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/basic_walking_skeleton');

var Cat = mongoose.model('Cat', {name: String});

router.get( '/', function(req, res) {
  console.log('Here is a console log');
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
  //next();
});

router.post('/add', function(request, response, next){
  var kitty = new Cat({name: request.body.name});
  kitty.save(function(err){
    if(err) console.log('meow %s', err);
    response.send(kitty.toJSON());
    next();
  });
});

router.get('/cats', function(request, response, next){
  return Cat.find({}).exec(function(err, cats){
    if(err) throw new Error(err);
    response.send(JSON.stringify(cats));
    next();
  });
});

module.exports = router;