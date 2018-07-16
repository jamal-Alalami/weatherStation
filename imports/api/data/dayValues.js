export const dayValues = new Mongo.Collection('dayValues');

const dayValuesSchema = new SimpleSchema({
    dayID: {
      type: String
    },
    valueID: {
      type: String
    },
    temp: {
      type: Number,
      optional:true,
      decimal:true
    },
    humidaty: {
      type: Number,
      optional:true,
      decimal:true
    },
    pressure: {
      type: Number,
      optional:true,
      decimal:true
    },
    time: {
      type: Date,
      optional: true,
    },
    createdAt: {
      type: Date,
      optional: true,
      defaultValue: new Date(),
      label: "createdAt"
    }
});


//dayValues.attachSchema(dayValuesSchema);

if (Meteor.isServer) {

  dayValues.deny({
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
    'admin.getDayValues': function () {
      return dayValues.find();
    }
  };

  for (key in publications) {
      Meteor.publishTransformed(key, publications[key]);
  }

  const methods = {
    'insertDayValues' : function (dayID, obj) {
      var now = new Date();
      obj.map(function(item){
        if (dayValues.findOne({valueID:item.entry_id})) {
        } else {
          var w = {dayID:dayID, temperature:item.field1, humidaty:item.field2, pressure:item.field3, valueID:item.entry_id, time:item.created_at, createdAt:now};
          dayValues.insert(w);
                  }
      });
    },
    'admin.updateDayValues': function (id, temp, humidaty) {

      var w = {temp:temp, humidaty:humidaty};

      dayValues.update({_id: id}, {$set:w});
    },
  }

  Meteor.methods(methods);
}
