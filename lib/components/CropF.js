"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CropF = void 0;
var _react = _interopRequireWildcard(require("react"));
var _interactjs = _interopRequireDefault(require("interactjs"));
var _Icons = require("./Icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CropF = exports.CropF = function CropF(_ref) {
  var crop = _ref.crop,
    color = _ref.color,
    index = _ref.index,
    className = _ref.className,
    onClick = _ref.onClick,
    onChange = _ref.onChange,
    deleteCrop = _ref.deleteCrop;
  var dxSum = 0; // eslint-disable-line no-unused-vars
  var dySum = 0; // eslint-disable-line no-unused-vars
  var divRef = (0, _react.useRef)();
  var cropRef = (0, _react.useRef)(crop);
  var _crop = cropRef.current;
  var cropStyle = function cropStyle() {
    var x = _crop.x,
      y = _crop.y,
      width = _crop.width,
      height = _crop.height;
    return {
      // border: '1px dotted rgba(153,153,153,1)',
      // background: 'rgba(153,153,153,0.3)',
      display: 'inline-block',
      position: 'absolute',
      width: width,
      height: height,
      top: y,
      left: x,
      boxShadow: '0 0 3px #000',
      background: color || '#8c8c8c',
      opacity: 0.6
    };
  };
  (0, _react.useEffect)(function () {
    (0, _interactjs["default"])(divRef.current).draggable({}).resizable({
      edges: {
        left: true,
        right: true,
        bottom: true,
        top: true
      }
    }).on('click', handleClick).on('dragmove', handleDragMove).on('resizemove', handleResizeMove);
    return function () {
      (0, _interactjs["default"])(divRef.current).unset();
    };
  }, []);
  var handleClick = function handleClick() {
    onClick === null || onClick === void 0 || onClick(_crop);
  };
  var handleResizeMove = function handleResizeMove(e) {
    var x = _crop.x,
      y = _crop.y,
      width = _crop.width,
      height = _crop.height;
    var r = x + width;
    var b = y + height;
    var _e$rect = e.rect,
      newW = _e$rect.width,
      newH = _e$rect.height;
    var newX = e.edges.left ? r - newW : x;
    var newY = e.edges.top ? b - newH : y;
    onChange === null || onChange === void 0 || onChange(_objectSpread(_objectSpread({}, _crop), {}, {
      x: newX,
      y: newY,
      width: newW,
      height: newH
    }));
  };
  var handleDragMove = function handleDragMove(e) {
    var x = _crop.x,
      y = _crop.y;
    var dx = e.dx,
      dy = e.dy;
    // may called multi times between render.
    dxSum += dx;
    dySum += dy;
    onChange === null || onChange === void 0 || onChange(_objectSpread(_objectSpread({}, _crop), {}, {
      x: x + dx,
      y: y + dy
    }));
  };
  var handleDelete = function handleDelete() {
    deleteCrop === null || deleteCrop === void 0 || deleteCrop(_crop);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: cropStyle(),
    className: "crop ".concat(className),
    ref: divRef
  }, /*#__PURE__*/_react["default"].createElement(_Icons.NumberIcon, {
    number: index + 1
  }), /*#__PURE__*/_react["default"].createElement(_Icons.DeleteIcon, {
    onClick: handleDelete
  }));
};