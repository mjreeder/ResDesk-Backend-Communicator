/**
 * Communicator Controller
 *
 * @description ::
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';
const ProfileService = require('../services/ProfileService.js');

var util = require('util');
var responseFormatter = require('../../helpers/format-response.js');
var communicator = require('../services/Communicator.js');

module.exports = {

  getCommLogs: getCommLogs,
  getRecentCommLogs: getRecentCommLogs,
  createCommLog: createCommLog,
  updateCommLog: updateCommLog,
  deleteCommLog: deleteCommLog
};

function getCommLogs(req, res) {
  ProfileService.checkAuthHeader(req, res, function (user) {
    //Then
    if (user.position == 'admin') {
      communicator.getCommLogs(function (response) {
        res.status(response.status).json(response);
      });
    } else {
      communicator.getCommLogsForUser(user, function (response) {
        res.status(response.status).json(response);
      });
    }
  });
}

function getRecentCommLogs(req, res) {
  ProfileService.checkAuthHeader(req, res, function (user) {
    //Then
    if (user.position == 'admin') {
      communicator.getRecentCommLogs(function (response) {
        res.status(response.status).json(response);
      });
    } else {
      communicator.getRecentCommLogsForUser(user, function (response) {
        res.status(response.status).json(response);
      });
    }
  });
}

function createCommLog(req, res) {
  ProfileService.checkAuthHeader(req, res, function (user) {
    //Then
    communicator.createCommLog(req, function (response) {
      res.status(response.status).json(response);
    });
  });
}

function updateCommLog(req, res) {
  ProfileService.checkAuthHeader(req, res, function (user) {
    //Then
    var id = req.swagger.params.id.value || "";
    communicator.updateCommLog(id, req, function (response) {
      res.status(response.status).json(response);
    });
  });
}

function deleteCommLog(req, res) {
  ProfileService.checkAuthHeader(req, res, function (user) {
    //Then
    var id = req.swagger.params.id.value || "";
    communicator.deleteCommLog(id, req, function (response) {
      res.status(response.status).json(response);
    });
  });
}
