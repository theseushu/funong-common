'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.requireForm = exports.requireShop = exports.requireAuth = exports.loadAsyncModules = undefined;

var _asyncInjectors = require('utils/asyncInjectors');

var _selectors = require('modules/data/ducks/selectors');

var _profile = require('api/profile');

var _shop = require('api/shop');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = require('debug')('funongweb:routerUtils');

var loadAsyncModules = exports.loadAsyncModules = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var store = _ref2.store,
        loadModule = _ref2.loadModule,
        errorLoading = _ref2.errorLoading,
        cb = _ref2.cb,
        routeName = _ref2.routeName,
        componentPromise = _ref2.componentPromise,
        ducksPromise = _ref2.ducksPromise,
        _ref2$otherPromises = _ref2.otherPromises,
        otherPromises = _ref2$otherPromises === undefined ? [] : _ref2$otherPromises,
        beforeRender = _ref2.beforeRender;

    var importModules, renderRoute, _ref3, _ref4, component, other, ducks;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (process.env.NODE_ENV !== 'production') {
              if (typeof loadModule !== 'function' || typeof errorLoading !== 'function' || !cb || typeof routeName !== 'string' || !componentPromise || typeof componentPromise.then !== 'function' || ducksPromise && typeof ducksPromise.then !== 'function' || beforeRender && typeof beforeRender !== 'function') {
                debug('wrong arguments!');
              }
            }
            _context.prev = 1;
            importModules = Promise.all(ducksPromise ? [componentPromise, ducksPromise].concat(_toConsumableArray(otherPromises)) : [componentPromise].concat(_toConsumableArray(otherPromises)));
            renderRoute = loadModule(cb);
            _context.next = 6;
            return importModules;

          case 6:
            _ref3 = _context.sent;
            _ref4 = _toArray(_ref3);
            component = _ref4[0];
            other = _ref4.slice(1);
            ducks = ducksPromise ? other[0] : null;

            if (ducks) {
              (0, _asyncInjectors.injectAsyncModule)(store, routeName, ducks.default, ducks.sagas);
            }

            if (!(typeof beforeRender === 'function')) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return beforeRender.apply(undefined, _toConsumableArray(other));

          case 15:
            renderRoute(component);
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](1);

            errorLoading(_context.t0);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 18]]);
  }));

  return function loadAsyncModules(_x) {
    return _ref.apply(this, arguments);
  };
}();

var fetchProfile = _profile.actions.fetch;
var fetchMyShop = _shop.actions.fetchMine;

var requireAuth = exports.requireAuth = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(store) {
    var result, currentUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = { login: false };
            _context2.prev = 1;
            currentUser = (0, _selectors.currentUserSelector)(store.getState());
            // if currentUser's not been fetched, fetch it before continue
            // if it's fetched already, don't wait for the result

            if (currentUser) {
              _context2.next = 6;
              break;
            }

            _context2.next = 6;
            return new Promise(function (resolve, reject) {
              store.dispatch(fetchProfile({ meta: { resolve: resolve, reject: reject } }));
            });

          case 6:
            currentUser = (0, _selectors.currentUserSelector)(store.getState());
            if (currentUser) {
              result.login = true;
            }
            return _context2.abrupt('return', result);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](1);
            return _context2.abrupt('return', result);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 11]]);
  }));

  return function requireAuth(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

var requireShop = exports.requireShop = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(store) {
    var result, shop;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return requireAuth(store);

          case 2:
            result = _context3.sent;

            if (result.login) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', { login: false, shop: false });

          case 5:
            _context3.prev = 5;
            shop = (0, _selectors.myShopSelector)(store.getState());
            // if currentUser's not been fetched, fetch it before continue
            // if it's fetched already, don't wait for the result

            if (shop) {
              _context3.next = 10;
              break;
            }

            _context3.next = 10;
            return new Promise(function (resolve, reject) {
              store.dispatch(fetchMyShop({ meta: { resolve: resolve, reject: reject } }));
            });

          case 10:
            shop = (0, _selectors.myShopSelector)(store.getState());

            if (!shop) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt('return', { login: true, shop: true });

          case 13:
            return _context3.abrupt('return', { login: true, shop: false });

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3['catch'](5);
            return _context3.abrupt('return', result);

          case 19:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[5, 16]]);
  }));

  return function requireShop(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var FormModuleName = 'form';
var requireForm = exports.requireForm = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(store) {
    var reduxForm, reducer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return System.import('redux-form');

          case 2:
            reduxForm = _context4.sent;
            reducer = reduxForm.reducer;

            (0, _asyncInjectors.injectAsyncModule)(store, FormModuleName, _defineProperty({}, FormModuleName, reducer));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function requireForm(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var error = exports.error = function error(err, replace) {
  debug(err);
  // todo deal with error
  replace('/error');
};