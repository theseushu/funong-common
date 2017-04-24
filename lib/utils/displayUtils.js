'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = exports.formatDateTime = exports.humanizeTime = exports.formatStartAndEndTime = exports.formatDeliveryFee = exports.formatArea = exports.formatParams = exports.formatPrice = exports.formatPrices = exports.briefAddress = exports.formatAddress = exports.formatProvinces = undefined;
exports.humanizeDistance = humanizeDistance;

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _union2 = require('lodash/union');

var _union3 = _interopRequireDefault(_union2);

var _endsWith2 = require('lodash/endsWith');

var _endsWith3 = _interopRequireDefault(_endsWith2);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _is_before = require('date-fns/is_before');

var _is_before2 = _interopRequireDefault(_is_before);

var _timeago = require('timeago.js');

var _timeago2 = _interopRequireDefault(_timeago);

var _appConstants = require('../appConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatProvinces = exports.formatProvinces = function formatProvinces(provinces) {
  return provinces && provinces.length > 0 ? provinces.map(function (province) {
    return (0, _find3.default)(_appConstants.provinces, function (p) {
      return p.value === province;
    }).title;
  }).join(' ') : '全国';
};

var formatAddress = exports.formatAddress = function formatAddress(_ref) {
  var _ref$country = _ref.country,
      country = _ref$country === undefined ? '' : _ref$country,
      _ref$province = _ref.province,
      province = _ref$province === undefined ? '' : _ref$province,
      _ref$city = _ref.city,
      city = _ref$city === undefined ? '' : _ref$city,
      _ref$district = _ref.district,
      district = _ref$district === undefined ? '' : _ref$district;
  return '' + (country === '中国' ? '' : country) + province + city + district;
};

var briefAddress = exports.briefAddress = function briefAddress(_ref2) {
  var province = _ref2.province,
      city = _ref2.city;

  var p = province;
  var c = city;
  if ((0, _endsWith3.default)(province, '省') || (0, _endsWith3.default)(province, '市')) {
    p = province.substring(0, province.length - 1);
  }
  if ((0, _endsWith3.default)(city, '市')) {
    c = city.substring(0, city.length - 1);
  }
  return '' + p + c;
};

var formatPrices = exports.formatPrices = function formatPrices(specs) {
  var formattedPrice = (0, _reduce3.default)(specs, function (result, spec) {
    return {
      min: Math.min(result.min, spec.price),
      max: Math.max(result.max, spec.price)
    };
  }, { min: 999999999, max: 0 });
  var min = formattedPrice.min,
      max = formattedPrice.max;

  return min === max ? min + '\u5143' : min + ' ~ ' + max + '\u5143';
};

var formatPrice = exports.formatPrice = function formatPrice(spec) {
  var displayMinimum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var result = '\uFFE5' + spec.price + '/' + spec.unit;
  if (spec.minimum > 1 && displayMinimum) {
    return result + '\uFF0C' + spec.minimum + spec.unit + '\u8D77\u552E';
  }
  return result;
};

var formatParams = exports.formatParams = function formatParams(specs) {
  return (0, _reduce3.default)(specs, function (result, spec) {
    return (0, _union3.default)(result, spec.params);
  }, []);
};

var formatArea = exports.formatArea = function formatArea(address, _ref3) {
  var level = _ref3.level,
      districts = _ref3.districts,
      distance = _ref3.distance;

  if (level === _appConstants.districtLevels.custom.value) {
    return '\u5E97\u94FA\u5468\u8FB9' + distance + '\u516C\u91CC';
  }
  return districts.join(' ');
};

var formatDeliveryFee = exports.formatDeliveryFee = function formatDeliveryFee(minimum, deliveryFee) {
  if (minimum === 0 && deliveryFee === 0) {
    return '免运费';
  } else if (deliveryFee === 0) {
    return minimum + '\u5143\u8D77\u9001\uFF0C\u514D\u8FD0\u8D39';
  } else if (minimum === 0) {
    return '\u8FD0\u8D39' + deliveryFee + '\u5143';
  }
  return minimum + '\u5143\u8D77\u9001\uFF0C\u8FD0\u8D39' + deliveryFee;
};

var formatStartAndEndTime = exports.formatStartAndEndTime = function formatStartAndEndTime(startTime, endTime) {
  var now = new Date();
  var timeagoIns = (0, _timeago2.default)(now);
  timeagoIns.setLocale('zh_CN');
  if ((0, _is_before2.default)(endTime, now)) {
    return '已结束';
  } else if ((0, _is_before2.default)(startTime, now)) {
    return timeagoIns.format(endTime) + '\u7ED3\u675F';
  }
  return timeagoIns.format(startTime) + '\u5F00\u59CB';
};

var humanizeTime = exports.humanizeTime = function humanizeTime(time) {
  var timeagoIns = (0, _timeago2.default)();
  timeagoIns.setLocale('zh_CN');
  return timeagoIns.format(time);
};

var formatDateTime = exports.formatDateTime = function formatDateTime(time) {
  return (0, _format2.default)(time, 'YYYY-MM-DD HH:mm');
};

var formatTime = exports.formatTime = function formatTime(time) {
  return (0, _format2.default)(time, 'YYYY-MM-DD');
};

// 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function humanizeDistance(distance) {
  if (distance == null) {
    return null;
  }
  return Math.round(distance / 1000) + '\u516C\u91CC';
}