export const weather = new Mongo.Collection('weather');

const weatherSchema = new SimpleSchema({
    dayName: {
      type: String
    },
    date: {
      type: String
    },
    maxTemp: {
      type: Number,
      optional: true
    },
    minTemp: {
      type: Number,
      optional: true
    },
    temp: {
      type: Object,
      blackbox:true,
      optional:true
    },
    humidaty: {
      type: Object,
      blackbox:true,
      optional:true
    },
    createdAt: {
      type: Date,
      optional: true,
      defaultValue: new Date(),
      label: "createdAt"
    }
});


//weather.attachSchema(weatherSchema);

if (Meteor.isServer) {

  weather.deny({
    insert() {
      return true;
    },
    update() {
      return true;
    },
    remove() {
      return true;
    },
  });

  const publications = {
    'admin.getweather': function () {
      return weather.find();
    }
  };

  for (key in publications) {
      Meteor.publishTransformed(key, publications[key]);
  }

  const methods = {
    'insertMachine' : function (dayName, date, obj) {
      var now = new Date();

      if (weather.findOne({date:date})) {
      } else {
        var w = {dayName:dayName, date:date, createdAt:now};
        weather.insert(w);
      }
      Meteor.call('insertDayValues',weather.findOne({date:date})._id, obj);
    },
    'admin.updateMachine': function (id, temp, humidaty) {

      var w = {temp:temp, humidaty:humidaty};

      weather.update({_id: id}, {$set:w});
    },
  }

  Meteor.methods(methods);
}
