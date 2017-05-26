'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.criteriaToApiParams = exports.queryToCriteria = exports.criteriaToQuery = undefined;

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var criteriaToQuery = exports.criteriaToQuery = function criteriaToQuery(_ref) {
  var keywords = _ref.keywords,
      category = _ref.category,
      species = _ref.species,
      provinces = _ref.provinces,
      status = _ref.status,
      _ref$sort = _ref.sort,
      sort = _ref$sort === undefined ? {} : _ref$sort,
      page = _ref.page,
      pageSize = _ref.pageSize;

  var query = {
    keywords: keywords || undefined,
    category: category ? category.objectId : undefined,
    species: (0, _isEmpty3.default)(species) ? undefined : species,
    provinces: (0, _isEmpty3.default)(provinces) ? undefined : provinces,
    sort: sort.sort ? sort.sort : undefined,
    order: sort.sort && sort.order ? sort.order : undefined,
    page: page || undefined,
    status: status,
    pageSize: pageSize || undefined
  };
  return _querystring2.default.stringify((0, _omitBy3.default)(query, _isUndefined3.default));
};

var queryToCriteria = exports.queryToCriteria = function queryToCriteria(query) {
  if (!query) {
    return {};
  }
  var keywords = query.keywords,
      category = query.category,
      species = query.species,
      provinces = query.provinces,
      status = query.status,
      sort = query.sort,
      order = query.order,
      page = query.page,
      pageSize = query.pageSize;

  var criteria = {};
  if (keywords) {
    criteria.keywords = keywords;
  }
  if (category) {
    criteria.category = category; // _find(categoriesSelector(store.getState()), (c) => c.objectId === category);
  }
  if (species) {
    criteria.species = typeof species === 'string' ? [species] : species; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (provinces) {
    criteria.provinces = typeof provinces === 'string' ? [provinces] : provinces; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (provinces) {
    criteria.provinces = typeof provinces === 'string' ? [provinces] : provinces; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (sort) {
    criteria.sort = { sort: sort, order: order };
  }
  if (status) {
    criteria.status = status;
  }
  criteria.page = page != null ? Number(page) : 1;
  criteria.pageSize = pageSize != null ? Number(pageSize) : 24;
  return criteria;
};

var criteriaToApiParams = exports.criteriaToApiParams = function criteriaToApiParams(_ref2) {
  var keywords = _ref2.keywords,
      category = _ref2.category,
      species = _ref2.species,
      provinces = _ref2.provinces,
      status = _ref2.status,
      _ref2$sort = _ref2.sort,
      sort = _ref2$sort === undefined ? {} : _ref2$sort,
      page = _ref2.page,
      pageSize = _ref2.pageSize;

  var query = {
    keywords: keywords || undefined,
    category: category ? { objectId: category } : undefined,
    species: species ? species.map(function (s) {
      return { objectId: s };
    }) : undefined,
    provinces: provinces && provinces.length > 0 ? provinces : undefined,
    sort: sort,
    page: page || undefined,
    pageSize: pageSize || undefined,
    status: status
  };
  return (0, _omitBy3.default)(query, _isUndefined3.default);
};