"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiCropsClass = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _shortid = _interopRequireDefault(require("shortid"));
var _Crop = require("./Crop");
var _CropF = require("./CropF");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var isValidPoint = function isValidPoint() {
  var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var strictNumber = function strictNumber(number) {
    return typeof number === 'number' && !Number.isNaN(number);
  };
  return strictNumber(point.x) && strictNumber(point.y);
};
var MultiCropsClass = exports.MultiCropsClass = /*#__PURE__*/function (_Component) {
  _inherits(MultiCropsClass, _Component);
  function MultiCropsClass() {
    var _this;
    _classCallCheck(this, MultiCropsClass);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MultiCropsClass, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawingIndex", -1);
    _defineProperty(_assertThisInitialized(_this), "colorIndex", 0);
    _defineProperty(_assertThisInitialized(_this), "color", "");
    _defineProperty(_assertThisInitialized(_this), "pointStart", {});
    _defineProperty(_assertThisInitialized(_this), "id", _shortid["default"].generate());
    _defineProperty(_assertThisInitialized(_this), "_crops", _this.props.crops || []);
    _defineProperty(_assertThisInitialized(_this), "getCursorPosition", function (e) {
      var _this$containerRef$ge = _this.containerRef.getBoundingClientRect(),
        left = _this$containerRef$ge.left,
        top = _this$containerRef$ge.top;
      return {
        x: e.clientX - left,
        y: e.clientY - top
      };
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      var _this$props = _this.props,
        crops = _this$props.crops,
        colors = _this$props.colors;
      if (e.target === _this.img || e.target === _this.containerRef) {
        var _this$getCursorPositi = _this.getCursorPosition(e),
          x = _this$getCursorPositi.x,
          y = _this$getCursorPositi.y;
        _this.drawingIndex = crops.length;
        _this.pointStart = {
          x: x,
          y: y
        };
        _this.id = _shortid["default"].generate();
        _this.color = colors[_this.colorIndex++];
        if (_this.colorIndex >= colors.length) _this.colorIndex = 0;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
        pointStart = _assertThisInitialize.pointStart;
      if (isValidPoint(pointStart)) {
        var pointEnd = _this.getCursorPosition(e);
        var crop = {
          x: Math.min(pointStart.x, pointEnd.x),
          y: Math.min(pointStart.y, pointEnd.y),
          width: Math.abs(pointStart.x - pointEnd.x),
          height: Math.abs(pointStart.y - pointEnd.y),
          id: _this.id,
          color: _this.color
        };
        _this.onChangeCrop(crop, true);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      _this.pointStart = {};
    });
    _defineProperty(_assertThisInitialized(_this), "deleteCrop", function (crop) {
      var _this$props$onChange, _this$props2;
      var targetIndex = _this._crops.findIndex(function (c) {
        return c.id === crop.id;
      });
      _this._crops.splice(targetIndex, 1);
      _this._crops.forEach(function (c) {
        return c.className = "";
      });
      (_this$props$onChange = (_this$props2 = _this.props).onChange) === null || _this$props$onChange === void 0 || _this$props$onChange.call(_this$props2, crop, targetIndex, _this._crops);
    });
    _defineProperty(_assertThisInitialized(_this), "onChangeCrop", function (crop, isNew) {
      var _this$props$onChange2, _this$props3;
      _this._crops.forEach(function (c) {
        return c.className = "";
      });
      crop.className = "active";
      var targetIndex = isNew ? _this.drawingIndex : _this._crops.findIndex(function (c) {
        return c.id === crop.id;
      });
      _this._crops[targetIndex] = crop;
      (_this$props$onChange2 = (_this$props3 = _this.props).onChange) === null || _this$props$onChange2 === void 0 || _this$props$onChange2.call(_this$props3, crop, targetIndex, _this._crops);
    });
    return _this;
  }
  _createClass(MultiCropsClass, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
        src = _this$props4.src,
        width = _this$props4.width,
        height = _this$props4.height;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'inline-block',
          position: 'relative'
        },
        onMouseDown: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        ref: function ref(_ref) {
          return _this2.containerRef = _ref;
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        ref: function ref(img) {
          return _this2.img = img;
        },
        src: src,
        width: width,
        height: height,
        alt: "",
        draggable: false
      }), this.props.crops.map(function (crop, index) {
        return /*#__PURE__*/_react["default"].createElement(_CropF.CropF, {
          key: crop.id || index,
          index: index,
          crop: crop,
          color: crop.color,
          className: crop.className,
          deleteCrop: _this2.deleteCrop,
          onChange: _this2.onChangeCrop,
          onClick: _this2.onChangeCrop
        });
      }));
    }
  }]);
  return MultiCropsClass;
}(_react.Component);
var string = _propTypes["default"].string,
  arrayOf = _propTypes["default"].arrayOf,
  number = _propTypes["default"].number,
  func = _propTypes["default"].func;
MultiCropsClass.propTypes = {
  crops: arrayOf(_Crop.cropType),
  src: string,
  width: number,
  // eslint-disable-line
  height: number,
  // eslint-disable-line
  onChange: func,
  // eslint-disable-line
  onClick: func,
  // eslint-disable-line
  onDelete: func,
  // eslint-disable-line
  colors: arrayOf(string)
};
MultiCropsClass.defaultProps = {
  crops: [],
  src: '',
  colors: ["#ff0000", "#00ff00", "#0000ff"]
};