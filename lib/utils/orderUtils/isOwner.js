'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var debug = require('debug')('funongcommon:orderUtils:isOwner');

exports.default = function (order, user) {
  if (order.status == null) {
    return true;
  }
  if (order.owner == null || user == null) {
    debug('Inconsistent data: order.status=' + order.status + ', order.owner=' + order.owner + ', user=' + user);
    return false;
  }
  return order.owner.objectId === user.objectId;
};