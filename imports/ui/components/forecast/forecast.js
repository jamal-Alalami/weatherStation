import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import {weather} from '/imports/api/data/weather.js';
var moment = require('moment');
import './forecast.html';
var data = {};
var date = new Date();
data.day = moment(date).format("dddd");
data.month = moment(date).format("MMM Do");

Template.forecast.onRendered(function(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.thingspeak.com/channels/376558/feeds.json?results=6",
  "method": "GET",

}

$.ajax(settings).done(function (response) {
console.log(response);
   var date = new Date();
   day = moment(date).format("dddd");
   month = moment(date).format("MMM Do");
     Meteor.call('insertMachine', day, month, response.feeds);

});

})

Template.forecast.helpers({
  today: function(){

    return data;
  },
  weatherData: function(){
    return weather.find({ date: { $ne: data.month } }, {sort: {date:-1}, limit:6});
  },
  weatherToDay: function(){
    return weather.findOne({date:data.month});
  },
})
