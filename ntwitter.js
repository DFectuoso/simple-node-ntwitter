var twitter = require('ntwitter');
var twit = new twitter({});

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test');
var ObjectId = require('mongoose').Types.ObjectId;

var schema = mongoose.Schema({
  _id: { type:String, unique: true},
  hits_30: Number,
  hits_15: Number,
  hits_10: Number,
  hits_5: Number,
  hits_3: Number,
  hits_1: Number,
  hits_i_30: Number,
  hits_i_15: Number,
  hits_i_10: Number,
  hits_i_5: Number,
  hits_i_3: Number,
  hits_i_1: Number,
  given: Boolean,
  parsed: Boolean,
});
var User= db.model('User', schema);

function getFriends(user){
  twit.getFriendsIds(user,function(err,data){
    if(err){console.log(err);}
    for(var i = 0; i < data.length;i++){
      user_data= {
        given : false,
        parsed : false,
        _id : String(data[i])
      };
      var user =  User(user_data);
      user.save(function(err){
        if(err){
          console.log("ERROR" + err);
        }
      });
    }
    return
  })
}

function getFollowers(user){
  twit.getFollowersIds(user,function(err,data){
    if(err){console.log(err);}
    for(var i = 0; i < data.length;i++){
      user_data= {
        given : false,
        parsed : false,
        _id : String(data[i])
      };
      var user =  User(user_data);
      user.save(function(err){
        if(err){
          console.log("ERROR" + err);
        }
      });
    }
    return
  })
}

function getBoth(user){
  getFollowers(user)
  getFriends(user)
}

//getBoth("dfect")
//getBoth("cesarsalazar")
//getBoth("lulomx")
//getBoth("mangohosting")
getBoth("BlueBoxMx")





