'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types$supply$types$f;

var _publishTypes = require('./publishTypes');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_types$supply$types$f = {}, _defineProperty(_types$supply$types$f, _publishTypes.types.supply, {
  delivery: {
    title: '送货',
    value: 'delivery'
  },
  refrigeration: {
    title: '货品打冷',
    value: 'refrigeration'
  },
  cleaning: {
    title: '清洗净品',
    value: 'cleaning'
  },
  reports: {
    title: '农残留检测',
    value: 'reports'
  }
}), _defineProperty(_types$supply$types$f, _publishTypes.types.flashSale, {}), _defineProperty(_types$supply$types$f, _publishTypes.types.product, {}), _defineProperty(_types$supply$types$f, _publishTypes.types.logistics, {}), _defineProperty(_types$supply$types$f, _publishTypes.types.trip, {}), _types$supply$types$f);