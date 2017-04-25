'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (category) {
  if (!category) {
    return undefined;
  }

  var _category$toJSON = category.toJSON(),
      objectId = _category$toJSON.objectId,
      name = _category$toJSON.name,
      group = _category$toJSON.group,
      catalog = _category$toJSON.catalog,
      pinyin = _category$toJSON.pinyin;

  return (0, _omitBy3.default)({ objectId: objectId, name: name, group: group, catalog: catalog, pinyin: pinyin }, _isUndefined3.default);
};