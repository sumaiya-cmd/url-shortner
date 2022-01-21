var express = require('express');
var router = express.Router();
var urlModel=require('./users')


router.get('/', function(req, res, next) {
   urlModel.find()
    .then(function(alldata){
    res.render('index', {shortUrls:alldata});
  })
  
});

router.post('/short',function(req,res){
  urlModel.create({
    full:req.body.fullUrl,
  })
  .then(function(){
    res.redirect('/')
  })
})

router.get('/:shorturl',function(req,res){
  urlModel.findOne({short: req.params.shorturl})
  .then(function(short){
    if(short == null){
      res.sendStatus(404 )
    }
    short.clicks++
    short.save()
    .then(function(){
      res.redirect(short.full)
    })
  })
})

module.exports = router;
