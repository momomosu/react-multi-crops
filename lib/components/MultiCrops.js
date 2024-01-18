"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _ramda = require("ramda");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _shortid = _interopRequireDefault(require("shortid"));
var _Crop = _interopRequireWildcard(require("./Crop"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    return (0, _ramda.both)((0, _ramda.is)(Number), (0, _ramda.complement)((0, _ramda.equals)(NaN)))(number);
  };
  return strictNumber(point.x) && strictNumber(point.y);
};
var MultiCrops = /*#__PURE__*/function (_Component) {
  _inherits(MultiCrops, _Component);
  function MultiCrops() {
    var _this;
    _classCallCheck(this, MultiCrops);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MultiCrops, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "drawingIndex", -1);
    _defineProperty(_assertThisInitialized(_this), "pointA", {});
    _defineProperty(_assertThisInitialized(_this), "id", _shortid["default"].generate());
    _defineProperty(_assertThisInitialized(_this), "renderCrops", function (props) {
      var indexedMap = (0, _ramda.addIndex)(_ramda.map);
      return indexedMap(function (coor, index) {
        return /*#__PURE__*/React.createElement(_Crop["default"]
        // improve performance when delet crop in middle array
        , _extends({
          key: coor.id || index,
          index: index,
          coordinate: coor
        }, props));
      })(props.coordinates);
    });
    _defineProperty(_assertThisInitialized(_this), "getCursorPosition", function (e) {
      var _this$container$getBo = _this.container.getBoundingClientRect(),
        left = _this$container$getBo.left,
        top = _this$container$getBo.top;
      return {
        x: e.clientX - left,
        y: e.clientY - top
      };
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      var coordinates = _this.props.coordinates;
      if (e.target === _this.img || e.target === _this.container) {
        var _this$getCursorPositi = _this.getCursorPosition(e),
          x = _this$getCursorPositi.x,
          y = _this$getCursorPositi.y;
        _this.drawingIndex = coordinates.length;
        _this.pointA = {
          x: x,
          y: y
        };
        _this.id = _shortid["default"].generate();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      var _this$props = _this.props,
        onDraw = _this$props.onDraw,
        onChange = _this$props.onChange,
        coordinates = _this$props.coordinates;
      var _assertThisInitialize = _assertThisInitialized(_this),
        pointA = _assertThisInitialize.pointA;
      if (isValidPoint(pointA)) {
        var pointB = _this.getCursorPosition(e);

        // get the drawing coordinate
        var coordinate = {
          x: Math.min(pointA.x, pointB.x),
          y: Math.min(pointA.y, pointB.y),
          width: Math.abs(pointA.x - pointB.x),
          height: Math.abs(pointA.y - pointB.y),
          id: _this.id
        };
        var nextCoordinates = (0, _ramda.clone)(coordinates);
        nextCoordinates[_this.drawingIndex] = coordinate;
        if ((0, _ramda.is)(Function, onDraw)) {
          onDraw(coordinate, _this.drawingIndex, nextCoordinates);
        }
        if ((0, _ramda.is)(Function, onChange)) {
          onChange(coordinate, _this.drawingIndex, nextCoordinates);
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handlMouseUp", function () {
      _this.pointA = {};
    });
    return _this;
  }
  _createClass(MultiCrops, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        src = _this$props2.src,
        width = _this$props2.width,
        height = _this$props2.height,
        onLoad = _this$props2.onLoad;
      // const { clicked } = this.state
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'inline-block',
          position: 'relative'
        },
        onMouseDown: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handlMouseUp,
        ref: function ref(container) {
          return _this2.container = container;
        }
      }, /*#__PURE__*/React.createElement("img", {
        ref: function ref(img) {
          return _this2.img = img;
        },
        src: src,
        width: width,
        height: height,
        onLoad: onLoad,
        alt: "",
        draggable: false
      }), this.renderCrops(this.props));
    }
  }]);
  return MultiCrops;
}(_react.Component);
var string = _propTypes["default"].string,
  arrayOf = _propTypes["default"].arrayOf,
  number = _propTypes["default"].number,
  func = _propTypes["default"].func;
MultiCrops.propTypes = {
  coordinates: arrayOf(_Crop.coordinateType),
  src: string,
  width: number,
  // eslint-disable-line
  height: number,
  // eslint-disable-line
  onDraw: func,
  // eslint-disable-line
  onChange: func,
  // eslint-disable-line
  onLoad: func // eslint-disable-line
};
MultiCrops.defaultProps = {
  coordinates: [],
  src: ''
};
var _default = exports["default"] = MultiCrops;