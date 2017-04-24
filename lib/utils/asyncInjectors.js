'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkStore = checkStore;
exports.injectAsyncReducer = injectAsyncReducer;
exports.injectAsyncSagas = injectAsyncSagas;
exports.getAsyncInjectors = getAsyncInjectors;
exports.isModuleInjected = isModuleInjected;
exports.injectAsyncModule = injectAsyncModule;

var _conformsTo = require('lodash/conformsTo');

var _conformsTo2 = _interopRequireDefault(_conformsTo);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _toPairs = require('lodash/toPairs');

var _toPairs2 = _interopRequireDefault(_toPairs);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate the shape of redux store
 */
function checkStore(store) {
  var shape = {
    dispatch: _isFunction2.default,
    subscribe: _isFunction2.default,
    getState: _isFunction2.default,
    replaceReducer: _isFunction2.default,
    runSaga: _isFunction2.default,
    asyncReducers: _isObject2.default,
    asyncModules: _isObject2.default,
    moduleInjected: _isFunction2.default
  };
  (0, _invariant2.default)((0, _conformsTo2.default)(store, shape), '(app/utils...) asyncInjectors: Expected a valid redux store');
}

/**
 * Inject an asynchronously loaded reducer
 */
function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    (0, _invariant2.default)((0, _isString2.default)(name) && !(0, _isEmpty2.default)(name) && (0, _isFunction2.default)(asyncReducer), '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function');

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer((0, _reducers2.default)(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    (0, _invariant2.default)(Array.isArray(sagas), '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions');

    (0, _warning2.default)(!(0, _isEmpty2.default)(sagas), '(app/utils...) injectAsyncSagas: Received an empty `sagas` array');

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true)
  };
}

function isModuleInjected(store, routeName) {
  return !!store.asyncModules[routeName];
}

function injectAsyncModule(store, routeName, reducer, sagas) {
  var _getAsyncInjectors = getAsyncInjectors(store),
      injectReducer = _getAsyncInjectors.injectReducer,
      injectSagas = _getAsyncInjectors.injectSagas;

  if (!isModuleInjected(store, routeName)) {
    (0, _toPairs2.default)(reducer).forEach(function (pair) {
      (0, _warning2.default)(pair[0] === routeName, '(app/utils...) injectAsyncModule: module name is not same as reducer slice name. [' + routeName + '], [' + pair[0] + ']');
      injectReducer(pair[0], pair[1]);
    });
    if (sagas && sagas.length > 0) {
      injectSagas(sagas);
    }
    store.moduleInjected(routeName);
  }
}