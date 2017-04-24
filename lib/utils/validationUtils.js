'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var distanceRegex = /^[1-9][0-9]{0,1}$/; // 1 - 99
var quantityRegex = /^[1-9][0-9]{0,7}$/; // 1 - 99999999
var valueRegex = /^[0-9]{1,7}(\.[0-9]{1,2})?$/; // 0.01 - 9999999.99

var isDistanceInvalid = exports.isDistanceInvalid = function isDistanceInvalid(number) {
  if (distanceRegex.test(number)) {
    return false;
  }
  return '请使用1-99的整数';
};

var isQuantityInvalid = exports.isQuantityInvalid = function isQuantityInvalid(number) {
  if (quantityRegex.test(number)) {
    return false;
  }
  return '请使用正整数';
};

var isPriceInvalid = exports.isPriceInvalid = function isPriceInvalid(number) {
  if (valueRegex.test(number)) {
    return false;
  }
  return '请使用正数，小数位两位。示例：100, 7.13, 0.99';
};