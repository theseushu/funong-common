'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (species) {
  if (!species) {
    return undefined;
  }

  var _species$toJSON = species.toJSON(),
      objectId = _species$toJSON.objectId,
      name = _species$toJSON.name;

  var category = (0, _category2.default)(species.get('category'));
  return (0, _omitBy3.default)({ objectId: objectId, name: name, category: category }, _isUndefined3.default);
};