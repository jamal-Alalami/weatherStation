import { Meteor } from 'meteor/meteor';
import {weather} from '../imports/api/data/weather.js';
import {dayValues} from '../imports/api/data/dayValues.js';

Router.route('/', {
    layoutTemplate: 'homePageLayOut',
    waitOn: [
        function() {

            Meteor.subscribe("admin.getweather");
            Meteor.subscribe("admin.getDayValues");

        }
    ],
    action: function() {
        this.render('homePage', { to: 'mainBody' });
    },
    data: function () {
    return {
      weather: weather.find()
    }
  }

});
Router.route('/news', {
    layoutTemplate: 'homePageLayOut',
    action: function() {
        this.render('newsPage', { to: 'mainBody' });
    },
    data : function() {

    }

});

Router.route('/news/:id', {
    layoutTemplate: 'homePageLayOut',
    action: function() {
        this.render('posts', { to: 'mainBody' });
    },

});

Router.route('/photos', {
    layoutTemplate: 'homePageLayOut',
    action: function() {
        this.render('photos', { to: 'mainBody' });
    },

});

Router.route('/live-cams', {
    layoutTemplate: 'homePageLayOut',
    action: function() {
        this.render('cams', { to: 'mainBody' });
    },

});

Router.route('/:_id', {
    layoutTemplate: 'homePageLayOut',
    waitOn: [
        function() {
          Meteor.subscribe("admin.getDayValues");
          Meteor.subscribe("admin.getweather");

        },
    ],
    action: function() {
      this.render('forecastDetails', { to: 'mainBody' });
    },
    data: function () {
      return {
      dayValue: dayValues.find({dayID:this.params._id},{sort: {valueID:-1}, limit: 6})
    }
  }

});
