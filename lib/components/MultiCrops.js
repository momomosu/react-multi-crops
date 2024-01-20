"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiCrops = void 0;
var _react = _interopRequireWildcard(require("react"));
var _shortid = _interopRequireDefault(require("shortid"));
var _Crop = require("./Crop");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var isValidPoint = function isValidPoint() {
  var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var strictNumber = function strictNumber(number) {
    return typeof number === 'number' && !Number.isNaN(number);
  };
  return strictNumber(point.x) && strictNumber(point.y);
};
var defaultColors = ["#ff9999", "#99ff99", "#9999ff", "#ffff55", "#ff55ff"];
var MultiCrops = exports.MultiCrops = function MultiCrops(_ref) {
  var src = _ref.src,
    width = _ref.width,
    height = _ref.height,
    crops = _ref.crops,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? defaultColors : _ref$colors,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    pointStart = _useState2[0],
    setPointStart = _useState2[1];
  var _useState3 = (0, _react.useState)(-1),
    _useState4 = _slicedToArray(_useState3, 2),
    drawingIndex = _useState4[0],
    setDrawingIndex = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    colorIndex = _useState6[0],
    setColorIndex = _useState6[1];
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    color = _useState8[0],
    setColor = _useState8[1];
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    id = _useState10[0],
    setId = _useState10[1];
  var containerRef = (0, _react.useRef)();
  var imgRef = (0, _react.useRef)();
  var getCursorPosition = function getCursorPosition(e) {
    var _containerRef$current = containerRef.current.getBoundingClientRect(),
      left = _containerRef$current.left,
      top = _containerRef$current.top;
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  };
  var handleMouseDown = function handleMouseDown(e) {
    if (e.target === imgRef.current || e.target === containerRef.current) {
      var _getCursorPosition = getCursorPosition(e),
        x = _getCursorPosition.x,
        y = _getCursorPosition.y;
      setDrawingIndex(crops.length);
      setPointStart({
        x: x,
        y: y
      });
      setId(_shortid["default"].generate());
      setColor(colors[colorIndex]);
      setColorIndex(function (i) {
        return i >= colors.length ? 0 : i + 1;
      });
    }
  };
  var handleMouseMove = function handleMouseMove(e) {
    if (isValidPoint(pointStart)) {
      var pointEnd = getCursorPosition(e);
      var crop = {
        x: Math.min(pointStart.x, pointEnd.x),
        y: Math.min(pointStart.y, pointEnd.y),
        width: Math.abs(pointStart.x - pointEnd.x),
        height: Math.abs(pointStart.y - pointEnd.y),
        id: id,
        color: color
      };
      onChangeCrop(crop, true);
    }
  };
  var handleMouseUp = function handleMouseUp() {
    setPointStart({});
  };
  var deleteCrop = function deleteCrop(crop) {
    var targetIndex = crops.findIndex(function (c) {
      return c.id === crop.id;
    });
    crops.splice(targetIndex, 1);
    crops.forEach(function (c) {
      return c.className = "";
    });
    onChange === null || onChange === void 0 || onChange(crop, targetIndex, crops);
  };
  var onChangeCrop = function onChangeCrop(crop, isNew) {
    crops.forEach(function (c) {
      return c.className = "";
    });
    crop.className = "active";
    var targetIndex = isNew ? drawingIndex : crops.findIndex(function (c) {
      return c.id === crop.id;
    });
    crops[targetIndex] = crop;
    onChange === null || onChange === void 0 || onChange(crop, targetIndex, crops);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'inline-block',
      position: 'relative'
    },
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    className: "multiCropsContainer",
    ref: containerRef
  }, /*#__PURE__*/_react["default"].createElement("img", {
    ref: imgRef,
    src: src,
    width: width,
    height: height,
    alt: "",
    draggable: false
  }), crops.map(function (crop, index) {
    return /*#__PURE__*/_react["default"].createElement(_Crop.Crop, {
      key: crop.id || index,
      index: index,
      crop: crop,
      color: crop.color,
      className: crop.className,
      deleteCrop: deleteCrop,
      onChange: onChangeCrop,
      onClick: onChangeCrop
    });
  }));
};