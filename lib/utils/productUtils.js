'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canDisable = exports.canEnable = exports.generateDisplayName = exports.generateKeywords = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _appConstants = require('../appConstants');

var _displayUtils = require('./displayUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var categoryToKeywords = function categoryToKeywords(category) {
  return !category || !category.objectId ? [] : [category.objectId];
};

var speciesToKeywords = function speciesToKeywords(species) {
  return !species || !species.objectId ? [] : [species.objectId];
};

var nameToKeywords = function nameToKeywords(name) {
  return name ? [name] : [];
};

var specsToKeywords = function specsToKeywords(specs) {
  return (0, _isEmpty3.default)(specs) ? [] : (0, _reduce3.default)(specs, function (result, _ref) {
    var params = _ref.params;
    return (0, _isEmpty3.default)(params) ? result : (0, _uniq3.default)([].concat(_toConsumableArray(result), _toConsumableArray(params)));
  }, []);
};

var locationToKeywords = function locationToKeywords(location) {
  return !location || (0, _isEmpty3.default)(location.address) ? [] : [location.address.province || '', location.address.city || '', location.address.district || ''];
};

var capacityToKeywords = function capacityToKeywords(capacity) {
  return capacity == null ? [] : [capacity.toString()];
};

var rangeToKeywords = function rangeToKeywords(range) {
  return (0, _isEmpty3.default)(range) ? [] : range;
};

var generateKeywords = exports.generateKeywords = function generateKeywords(product, type) {
  var keywords = [];
  switch (type) {
    case _appConstants.productTypes.supply:
      {
        var category = product.category,
            species = product.species,
            name = product.name,
            specs = product.specs,
            location = product.location;

        keywords.push.apply(keywords, _toConsumableArray(categoryToKeywords(category)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToKeywords(species)));
        keywords.push.apply(keywords, _toConsumableArray(nameToKeywords(name)));
        keywords.push.apply(keywords, _toConsumableArray(locationToKeywords(location)));
        keywords.push.apply(keywords, _toConsumableArray(specsToKeywords(specs)));
        break;
      }
    case _appConstants.productTypes.logistics:
      {
        var capacity = product.capacity,
            _name = product.name,
            range = product.range,
            _location = product.location;

        keywords.push.apply(keywords, _toConsumableArray(capacityToKeywords(capacity)));
        keywords.push.apply(keywords, _toConsumableArray(nameToKeywords(_name)));
        keywords.push.apply(keywords, _toConsumableArray(locationToKeywords(_location)));
        keywords.push.apply(keywords, _toConsumableArray(rangeToKeywords(range)));
        break;
      }
    case _appConstants.productTypes.trip:
      {
        var _name2 = product.name,
            _location2 = product.location;

        keywords.push.apply(keywords, _toConsumableArray(nameToKeywords(_name2)));
        keywords.push.apply(keywords, _toConsumableArray(locationToKeywords(_location2)));
        break;
      }
    case _appConstants.productTypes.shop:
      {
        var _category = product.category,
            _species = product.species,
            _name3 = product.name,
            _specs = product.specs;

        keywords.push.apply(keywords, _toConsumableArray(categoryToKeywords(_category)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToKeywords(_species)));
        keywords.push.apply(keywords, _toConsumableArray(nameToKeywords(_name3)));
        keywords.push.apply(keywords, _toConsumableArray(specsToKeywords(_specs)));
        break;
      }
    default:
      {
        var _category2 = product.category,
            _species2 = product.species,
            _name4 = product.name,
            _specs2 = product.specs,
            _range = product.range,
            _capacity = product.capacity,
            _location3 = product.location;

        keywords.push.apply(keywords, _toConsumableArray(categoryToKeywords(_category2)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToKeywords(_species2)));
        keywords.push.apply(keywords, _toConsumableArray(capacityToKeywords(_capacity)));
        keywords.push.apply(keywords, _toConsumableArray(nameToKeywords(_name4)));
        keywords.push.apply(keywords, _toConsumableArray(locationToKeywords(_location3)));
        keywords.push.apply(keywords, _toConsumableArray(rangeToKeywords(_range)));
        keywords.push.apply(keywords, _toConsumableArray(specsToKeywords(_specs2)));
      }
  }
  return keywords.join(' ');
};

var categoryToDisplayName = function categoryToDisplayName(category) {
  return !category || !category.name ? [] : [category.name];
};

var speciesToDisplayName = function speciesToDisplayName(species) {
  return !species || !species.name ? [] : [species.name];
};

var nameToDisplayName = function nameToDisplayName(name) {
  return name ? [name] : [];
};

var specsToDisplayName = function specsToDisplayName(specs) {
  return (0, _isEmpty3.default)(specs) ? [] : (0, _reduce3.default)(specs, function (result, _ref2) {
    var params = _ref2.params;
    return (0, _isEmpty3.default)(params) ? result : (0, _uniq3.default)([].concat(_toConsumableArray(result), _toConsumableArray(params)));
  }, []);
};

var locationToDisplayName = function locationToDisplayName(location) {
  return !location || (0, _isEmpty3.default)(location.address) ? [] : [(0, _displayUtils.briefAddress)(location.address)];
};

var capacityToDisplayName = function capacityToDisplayName(capacity) {
  return capacity == null ? [] : [capacity.toString()];
};

var rangeToDisplayName = function rangeToDisplayName(range) {
  return (0, _isEmpty3.default)(range) ? [] : range;
};

var generateDisplayName = exports.generateDisplayName = function generateDisplayName(product, type) {
  var keywords = [];
  switch (type) {
    case _appConstants.productTypes.supply:
      {
        var category = product.category,
            species = product.species,
            name = product.name,
            specs = product.specs,
            location = product.location;

        keywords.push.apply(keywords, _toConsumableArray(categoryToDisplayName(category)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToDisplayName(species)));
        keywords.push.apply(keywords, _toConsumableArray(nameToDisplayName(name)));
        keywords.push.apply(keywords, _toConsumableArray(locationToDisplayName(location)));
        keywords.push.apply(keywords, _toConsumableArray(specsToDisplayName(specs)));
        break;
      }
    case _appConstants.productTypes.logistics:
      {
        var capacity = product.capacity,
            _name5 = product.name,
            range = product.range,
            _location4 = product.location;

        keywords.push.apply(keywords, _toConsumableArray(capacityToDisplayName(capacity)));
        keywords.push.apply(keywords, _toConsumableArray(nameToDisplayName(_name5)));
        keywords.push.apply(keywords, _toConsumableArray(locationToDisplayName(_location4)));
        keywords.push.apply(keywords, _toConsumableArray(rangeToDisplayName(range)));
        break;
      }
    case _appConstants.productTypes.trip:
      {
        var _name6 = product.name,
            _location5 = product.location;

        keywords.push.apply(keywords, _toConsumableArray(nameToDisplayName(_name6)));
        keywords.push.apply(keywords, _toConsumableArray(locationToDisplayName(_location5)));
        break;
      }
    case _appConstants.productTypes.shop:
      {
        var _category3 = product.category,
            _species3 = product.species,
            _name7 = product.name,
            _specs3 = product.specs;

        keywords.push.apply(keywords, _toConsumableArray(categoryToDisplayName(_category3)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToDisplayName(_species3)));
        keywords.push.apply(keywords, _toConsumableArray(nameToDisplayName(_name7)));
        keywords.push.apply(keywords, _toConsumableArray(specsToDisplayName(_specs3)));
        break;
      }
    default:
      {
        var _category4 = product.category,
            _species4 = product.species,
            _name8 = product.name,
            _specs4 = product.specs,
            _range2 = product.range,
            _capacity2 = product.capacity,
            _location6 = product.location;

        keywords.push.apply(keywords, _toConsumableArray(categoryToDisplayName(_category4)));
        keywords.push.apply(keywords, _toConsumableArray(speciesToDisplayName(_species4)));
        keywords.push.apply(keywords, _toConsumableArray(capacityToDisplayName(_capacity2)));
        keywords.push.apply(keywords, _toConsumableArray(nameToDisplayName(_name8)));
        keywords.push.apply(keywords, _toConsumableArray(locationToDisplayName(_location6)));
        keywords.push.apply(keywords, _toConsumableArray(rangeToDisplayName(_range2)));
        keywords.push.apply(keywords, _toConsumableArray(specsToDisplayName(_specs4)));
      }
  }
  return keywords.join(' ');
};

var canEnable = exports.canEnable = function canEnable(_ref3) {
  var status = _ref3.status;

  switch (status) {
    case _appConstants.statusValues.unavailable.value:
      return true;
    case _appConstants.statusValues.rejected.value:
    case _appConstants.statusValues.removed.value:
    case _appConstants.statusValues.unverified.value:
    case _appConstants.statusValues.verified.value:
    default:
      return false;
  }
};

var canDisable = exports.canDisable = function canDisable(_ref4) {
  var status = _ref4.status;

  switch (status) {
    case _appConstants.statusValues.unverified.value:
    case _appConstants.statusValues.verified.value:
      return true;
    case _appConstants.statusValues.unavailable.value:
    case _appConstants.statusValues.rejected.value:
    case _appConstants.statusValues.removed.value:
    default:
      return false;
  }
};