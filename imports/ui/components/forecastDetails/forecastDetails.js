import {Template} from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import {weather} from '/imports/api/data/weather.js';
import {dayValues} from '/imports/api/data/dayValues.js';
import Chart from 'chart.js';

import './forecastDetails.html';
Template.forecastDetails.onRendered(function(){
var labels = [] , values = [];

// data.map(function(item){
//   console.log(item);
//   values.push(item.temperature);
//   labels.push(item.time);
// });
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
 type: 'line',
 data: {
   datasets:  [{
     label: 'Temperature',
       data: values,
       backgroundColor: [
         '#11b6de',

       ],
       pointRadius:     2,
     }],

   labels: labels
 },
 options: {

   responsive: true,
   // Can't just just `stacked: true` like the docs say
   scales: {
     xAxes: [{
     display: true,
     gridLines: {
       color: '#95989A',
       lineWidth:1
     },
     scaleLabel: {
       display: true,

     }
   }],
     yAxes: [{
       display: true,
       ticks: {
         max: 50,
         min: 0,
         stepSize: 10,
         callback: function(value, index, values) {
                     return 'c' + value+'  ';
                 }
       },
       gridLines: {
         color: '#95989A',
         lineWidth: 1
       }
     }]
   },
   animation: {
     duration: 750,
   },

   legend: {
         labels: {
             // This more specific font property overrides the global property
             fontColor: '#95989A',
             defaultFontSize:'16px',

             fontSize: 16,
             boxWidth: 16,
             usePointStyle: true,

         }
     },
     layout: {
         padding: {
             left: 50,
             right: 0,
             top: 0,
             bottom: 0
         }
     }


 }
});
})
Template.forecastDetails.helpers({
  'data' : function () {

}
})
