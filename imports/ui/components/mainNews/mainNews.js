import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.mainNews.onRendered(function () {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=1f5f98c2b1f64c58ad0468f6a73727f7",
    "method": "GET",
  }

  $.ajax(settings).done(function (response) {
    Session.set('articles',response.articles);

  });
})

Template.mainNews.helpers({
 articles: function(){
   console.log( Session.get('articles'));
  return Session.get('articles');
 }
});
