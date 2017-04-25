"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var roleToJSON = exports.roleToJSON = function roleToJSON(role) {
  return { objectId: role.id, name: role.getName() };
};