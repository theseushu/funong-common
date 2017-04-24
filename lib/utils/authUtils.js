'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShopAuthorized = exports.isUserExpertVerified = exports.isUserCompanyVerified = exports.isUserIDVerified = undefined;

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _appConstants = require('../appConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isUserIDVerified = exports.isUserIDVerified = function isUserIDVerified(user) {
  if (!user) {
    return false;
  }
  return !!(0, _find3.default)(user.badges, function (badge) {
    return badge === _appConstants.badges.idVerified.value;
  });
};

var isUserCompanyVerified = exports.isUserCompanyVerified = function isUserCompanyVerified(user) {
  if (!user) {
    return false;
  }
  return !!(0, _find3.default)(user.badges, function (badge) {
    return badge === _appConstants.badges.companyVerified.value;
  });
};

var isUserExpertVerified = exports.isUserExpertVerified = function isUserExpertVerified(user) {
  if (!user) {
    return false;
  }
  return !!(0, _find3.default)(user.badges, function (badge) {
    return badge === _appConstants.badges.expertVerified.value;
  });
};

var createShopAuthorized = exports.createShopAuthorized = function createShopAuthorized(user, shop) {
  if (!user || shop) {
    return false;
  }
  return !!(0, _find3.default)(user.badges, function (badge) {
    return badge === _appConstants.badges.companyVerified.value || badge === _appConstants.badges.idVerified.value;
  });
};