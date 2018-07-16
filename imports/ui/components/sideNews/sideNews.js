import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';


Template.sideNews.helpers({
 articles: function(){
   console.log( Session.get('articles'));
  return Session.get('articles');
 }
});
