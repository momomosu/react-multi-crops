"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberIcon = exports.DeleteIcon = void 0;
var _style = _interopRequireDefault(require("styled-jsx/style"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DeleteIcon = exports.DeleteIcon = function DeleteIcon(props) {
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, props, {
    className: "jsx-964816064" + " " + (props && props.className != null && props.className || "rmc-icon-container")
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "jsx-964816064" + " " + "rmc-remove"
  }), /*#__PURE__*/_react["default"].createElement(_style["default"], {
    id: "964816064"
  }, ".rmc-icon-container.jsx-964816064{width:15px;height:15px;cursor:pointer;float:right;background:#262626;}.rmc-remove.jsx-964816064{color:white;position:absolute;margin-top:6px;}.rmc-remove.jsx-964816064:hover{cursor:pointer;}.rmc-remove.jsx-964816064:before{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;-webkit-transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);}.rmc-remove.jsx-964816064:after{content:'';position:absolute;width:15px;height:1px;background-color:currentColor;-webkit-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);}"));
};
var NumberIcon = exports.NumberIcon = function NumberIcon(_ref) {
  var number = _ref.number;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "jsx-2120688401" + " " + "rmc-number"
  }, number, /*#__PURE__*/_react["default"].createElement(_style["default"], {
    id: "2120688401"
  }, ".rmc-number.jsx-2120688401{width:15px;height:15px;float:left;font-size:12px;background:#262626;text-align:center;line-height:15px;color:white;}"));
};
var number = _propTypes["default"].number;
NumberIcon.propTypes = {
  number: number
};
NumberIcon.defaultProps = {
  number: ''
};