'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publishes = require('./publishes');

Object.defineProperty(exports, 'createPublishes', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_publishes).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }