"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (lnglat) {
  return lnglat ? lnglat.toJSON() : undefined;
};