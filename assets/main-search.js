"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MainSearch = /*#__PURE__*/function (_SearchForm) {
  _inherits(MainSearch, _SearchForm);
  var _super = _createSuper(MainSearch);
  function MainSearch() {
    var _this;
    _classCallCheck(this, MainSearch);
    _this = _super.call(this);
    _this.allSearchInputs = document.querySelectorAll('input[type="search"]');
    _this.setupEventListeners();
    return _this;
  }
  _createClass(MainSearch, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this2 = this;
      var allSearchForms = [];
      this.allSearchInputs.forEach(function (input) {
        return allSearchForms.push(input.form);
      });
      this.input.addEventListener('focus', this.onInputFocus.bind(this));
      if (allSearchForms.length < 2) return;
      allSearchForms.forEach(function (form) {
        return form.addEventListener('reset', _this2.onFormReset.bind(_this2));
      });
      this.allSearchInputs.forEach(function (input) {
        return input.addEventListener('input', _this2.onInput.bind(_this2));
      });
    }
  }, {
    key: "onFormReset",
    value: function onFormReset(event) {
      _get(_getPrototypeOf(MainSearch.prototype), "onFormReset", this).call(this, event);
      if (_get(_getPrototypeOf(MainSearch.prototype), "shouldResetForm", this).call(this)) {
        this.keepInSync('', this.input);
      }
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      var target = event.target;
      this.keepInSync(target.value, target);
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      var isSmallScreen = window.innerWidth < 750;
      if (isSmallScreen) {
        this.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, {
    key: "keepInSync",
    value: function keepInSync(value, target) {
      this.allSearchInputs.forEach(function (input) {
        if (input !== target) {
          input.value = value;
        }
      });
    }
  }]);
  return MainSearch;
}(SearchForm);
customElements.define('main-search', MainSearch);