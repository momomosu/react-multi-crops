"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeid = exports.addid = void 0;
var _shortid = _interopRequireDefault(require("shortid"));
var _ramda = require("ramda");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var addid = exports.addid = (0, _ramda.map)((0, _ramda.assoc)('id', _shortid["default"].generate()));
var removeid = exports.removeid = (0, _ramda.map)((0, _ramda.omit)(['id']));