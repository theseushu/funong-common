'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (images) {
  return images ? images.map(_file2.default).filter(function (f) {
    return !(0, _isUndefined3.default)(f);
  }) : undefined;
};