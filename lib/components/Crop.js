"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cropType = exports.Crop = void 0;
var _style = _interopRequireDefault(require("styled-jsx/style"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ramda = require("ramda");
var _interactjs = _interopRequireDefault(require("interactjs"));
var _Icons = require("./Icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Crop = exports.Crop = /*#__PURE__*/function (_Component) {
  _inherits(Crop, _Component);
  function Crop() {
    var _this;
    _classCallCheck(this, Crop);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Crop, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "dxSum", 0);
    _defineProperty(_assertThisInitialized(_this), "dySum", 0);
    _defineProperty(_assertThisInitialized(_this), "cropStyle", function (zoom) {
      var _this$props$crop = _this.props.crop,
        x = _this$props$crop.x,
        y = _this$props$crop.y,
        width = _this$props$crop.width,
        height = _this$props$crop.height;
      return {
        display: 'inline-block',
        position: 'absolute',
        width: width * zoom,
        height: height * zoom,
        top: y * zoom,
        left: x * zoom,
        background: _this.props.color || '#8c8c8c'
      };
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var _this$props = _this.props,
        crop = _this$props.crop,
        onClick = _this$props.onClick;
      onClick === null || onClick === void 0 || onClick(crop);
    });
    _defineProperty(_assertThisInitialized(_this), "handleResizeMove", function (e) {
      var _this$props2 = _this.props,
        crop = _this$props2.crop,
        _this$props2$crop = _this$props2.crop,
        x = _this$props2$crop.x,
        y = _this$props2$crop.y,
        width = _this$props2$crop.width,
        height = _this$props2$crop.height,
        onChange = _this$props2.onChange,
        zoom = _this$props2.zoom;
      var r = x + width;
      var b = y + height;
      var newW = e.rect.width / zoom;
      var newH = e.rect.height / zoom;
      var newX = e.edges.left ? r - newW : x;
      var newY = e.edges.top ? b - newH : y;
      onChange === null || onChange === void 0 || onChange(_objectSpread(_objectSpread({}, crop), {}, {
        x: newX,
        y: newY,
        width: newW,
        height: newH
      }));
    });
    _defineProperty(_assertThisInitialized(_this), "handleDragMove", function (e) {
      var _this$props3 = _this.props,
        crop = _this$props3.crop,
        _this$props3$crop = _this$props3.crop,
        x = _this$props3$crop.x,
        y = _this$props3$crop.y,
        onChange = _this$props3.onChange,
        zoom = _this$props3.zoom;
      var dx = e.dx,
        dy = e.dy;
      // may called multi times between render.
      _this.dxSum += dx / zoom;
      _this.dySum += dy / zoom;
      onChange === null || onChange === void 0 || onChange(_objectSpread(_objectSpread({}, crop), {}, {
        x: x + _this.dxSum,
        y: y + _this.dySum
      }));
    });
    _defineProperty(_assertThisInitialized(_this), "handleDelete", function () {
      var _this$props4 = _this.props,
        crop = _this$props4.crop,
        deleteCrop = _this$props4.deleteCrop;
      deleteCrop === null || deleteCrop === void 0 || deleteCrop(crop);
    });
    return _this;
  }
  _createClass(Crop, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _interactjs["default"])(this.cropRef).draggable({}).resizable({
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true
        }
      }).on('click', this.handleClick).on('dragmove', this.handleDragMove).on('resizemove', this.handleResizeMove);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _ramda.equals)(nextProps, this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _interactjs["default"])(this.cropRef).unset();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      this.dxSum = 0;
      this.dySum = 0;
      var _this$props5 = this.props,
        index = _this$props5.index,
        className = _this$props5.className;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.cropStyle(this.props.zoom),
        ref: function ref(_ref) {
          return _this2.cropRef = _ref;
        },
        className: "jsx-1853426152" + " " + "crop ".concat(className)
      }, /*#__PURE__*/_react["default"].createElement(_style["default"], {
        id: "1853426152"
      }, ".crop.jsx-1853426152{z-index:1;opacity:0.4;}.crop.active.jsx-1853426152{z-index:10;opacity:0.7;}"), /*#__PURE__*/_react["default"].createElement(_Icons.NumberIcon, {
        number: index + 1
      }), /*#__PURE__*/_react["default"].createElement(_Icons.DeleteIcon, {
        onClick: this.handleDelete
      }));
    }
  }]);
  return Crop;
}(_react.Component);
var cropType = exports.cropType = _propTypes["default"].shape({
  x: _propTypes["default"].number.isRequired,
  y: _propTypes["default"].number.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
});
Crop.propTypes = {
  crop: cropType.isRequired,
  index: _propTypes["default"].number.isRequired,
  className: _propTypes["default"].string,
  color: _propTypes["default"].string,
  zoom: _propTypes["default"].number,
  deleteCrop: _propTypes["default"].func,
  // eslint-disable-line
  onChange: _propTypes["default"].func,
  // eslint-disable-line
  onClick: _propTypes["default"].func // eslint-disable-line
};
Crop.defaultProps = {
  className: "",
  color: "#fff",
  zoom: 1
};