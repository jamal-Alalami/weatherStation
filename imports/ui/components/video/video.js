import { Template } from 'meteor/templating';

Template.video.onRendered(function () {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://webcamstravel.p.mashape.com/webcams/list/limit=4/category=meteo?lang=en&show=webcams%3Aimage%2Clocation",
  "method": "GET",
  "headers": {
    "x-mashape-key": "flxUUP0pmSmshyyIaB10OWnU4v2Fp1Cs4mBjsngxQICCjg7u3X",
  }
}

$.ajax(settings).done(function (response) {
Session.set('waether',response.result.webcams);
});
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://webcamstravel.p.mashape.com/webcams/list/limit=12/category=meteo?lang=en&show=webcams%3Aimage%2Clocation",
  "method": "GET",
  "headers": {
    "x-mashape-key": "flxUUP0pmSmshyyIaB10OWnU4v2Fp1Cs4mBjsngxQICCjg7u3X",
  }
}

$.ajax(settings).done(function (response) {

Session.set('waethers',response.result.webcams);
});
});

Template.video.helpers({

  waethers: function(){
    var weather = {};

   return Session.get('waether');
 },
 date: function(){
   var date = new Date();
   return date.toDateString();
 }
})
