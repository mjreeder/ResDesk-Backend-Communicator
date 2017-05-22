var request = require('request');
var ResponseFormat = require('../../helpers/format-response.js');

module.exports = {
  checkAuthHeader: function (req, res, next) {
    
    if (!req.swagger.params.Authorization.value) {
      var errorRes = ResponseFormat.fail('Missing Authorization', {}, 401);
      return res.status(401).json(errorRes);
    }

    var authHeader = req.swagger.params.Authorization.value.split(" ")[1];

    var getUserFromDirectoryPromise = new Promise(function (resolve, reject) {

      request.get({
        url: "http://localhost:10018/user",
        headers: {
          'Authorization': 'Bearer ' + authHeader
        }
      }, function (error, response, body) {
        if (error) {
          reject(error);
        } else {

          if (JSON.parse(body).status != 200) {
            reject(body);
            return;
          }
          resolve(JSON.parse(body));
        }
      });
    });

    getUserFromDirectoryPromise.then(function (response) {
      if (response.description == 'User Found') {
        var user = response.data[0];
        next(user);
      } else {
        return res(response);
      }
    }, function (error) {
      return res(error);
    });
  }



}