'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _find3 = require('lodash/find');

var _find4 = _interopRequireDefault(_find3);

var _appConstants = require('../appConstants');

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (schemas) {
  return function (cartItem) {
    var _extends2;

    if (!cartItem) {
      return null;
    }
    var typeProductPairs = Object.values(_appConstants.publishTypes).map(function (t) {
      return { type: t, avProduct: cartItem.get(t) };
    });

    var _find2 = (0, _find4.default)(typeProductPairs, function (typeProductPair) {
      return !!typeProductPair.avProduct;
    }),
        type = _find2.type,
        avProduct = _find2.avProduct;

    var product = (0, _publish2.default)(schemas[type], avProduct);

    var avOwner = cartItem.get('owner');
    var owner = avOwner ? avOwner.toJSON() : null;

    var createdAt = cartItem.get('createdAt').getTime();
    var updatedAt = cartItem.get('updatedAt').getTime();

    return (0, _omitBy3.default)(_extends({}, cartItem.toJSON(), (_extends2 = { owner: owner }, _defineProperty(_extends2, type, product), _defineProperty(_extends2, 'createdAt', createdAt), _defineProperty(_extends2, 'updatedAt', updatedAt), _extends2)), _isUndefined3.default);
  };
};