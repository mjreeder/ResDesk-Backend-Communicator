var responseFormatter = require('../../helpers/format-response.js');

const reverseCronSort = {
  sort: {
    updatedAt: 'DESC'
  }
};

var removeEmptyFields = function(item){
  for (var property in item) {
    if (item.hasOwnProperty(property)) {
        if(item[property] == '' || typeof(item[property]) == "undefined" || item[property] == null){
            delete item[property];
          }
      }
  }
  return item;
}

var parseForUser = function(logs, user) {
  var parsed = [];
  for (var j = 0; j < logs.length; j++){
    var item = logs[j];
    
    if (item.from.email == user.email){
      parsed.push(item);
      continue;
    }
    
    var toList = item.to;
    for (var i = 0; i < toList.length; i++){
      var toUser = toList[i];
      if (toUser.bsu_id == user.bsu_id){
        parsed.push(item);
        break;
      }
    }
    
  }

  return parsed;
};

module.exports = {

  getCommLogs: function(callback){

    Communication.find(reverseCronSort).exec(function (err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to find comm logs.", err, 500));
      }else{
        return callback(responseFormatter.success("All comm logs", result));
      }
    });
  },
  
  getCommLogsForUser: function(user, callback){

    Communication.find(reverseCronSort).exec(function (err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to find comm logs.", err, 500));
      }else{
        result = parseForUser(result, user);
        return callback(responseFormatter.success("All comm logs", result));
      }
    });
  },

  getRecentCommLogs: function(callback) {

    var days = 7;
    var date = new Date();
    var lastWeek = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var where = {
      createdAt: { '>=' : lastWeek }
    };

    Communication.find(reverseCronSort).where(where).exec(function (err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to find comm logs.", err, 500));
      }else{
        return callback(responseFormatter.success("Recent comm logs.", result));
      }
    });
  },
  
  getRecentCommLogsForUser: function(user, callback) {

    var days = 7;
    var date = new Date();
    var lastWeek = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var where = {
      createdAt: { '>=' : lastWeek },
    };

    Communication.find(reverseCronSort).where(where).exec(function (err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to find comm logs.", err, 500));
      }else{
        result = parseForUser(result, user);
        return callback(responseFormatter.success("Recent comm logs.", result));
      }
    });
  },

  createCommLog: function(req, callback) {

    var commLog = {
      title: req.param('title'),
      from: req.param('from'),
      to: req.param('to'),
      body: req.param('body')
    };

    Communication.create(commLog).exec(function (err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to create comm log.", err, 500));
      }else{
        return callback(responseFormatter.success("Comm log created.", result));
      }
    });
  },

  updateCommLog: function(id, req, callback) {

    var id = req.swagger.params.id.value || "";

    var updateCommLog = {
      title: req.param('title'),
      to: req.param('to'),
      from: req.param('from'),
      body: req.param('body')
    };
    updateCommLog = removeEmptyFields(updateCommLog);

    Communication.update({id: id}, updateCommLog).exec(function afterwards(err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to create comm log.", err, 500));
      }else{
        return callback(responseFormatter.success("Comm log updated.", result));
      }
    });
  },

  deleteCommLog: function(id, req, callback) {

    var id = req.swagger.params.id.value || "";

    Communication.destroy({id: id}).exec(function afterwards(err, result){
      if (err) {
        return callback(responseFormatter.fail("Failed to delete comm log.", err, 500));
      }else{
        return callback(responseFormatter.success("Comm log deleted.", result));
      }
    });
  }
}
