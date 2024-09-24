"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// DetailsDisclosure used in snippets/nav-desktop.liquid, flag-selector.liquid and sharebutton in share.js
var DetailsDisclosure = /*#__PURE__*/function (_HTMLElement) {
  _inherits(DetailsDisclosure, _HTMLElement);
  var _super = _createSuper(DetailsDisclosure);
  function DetailsDisclosure() {
    var _this;
    _classCallCheck(this, DetailsDisclosure);
    _this = _super.call(this);
    _this.mainDetailsToggle = _this.querySelector('details');
    _this.mainDetailsToggle.addEventListener('focusout', _this.onFocusOut.bind(_assertThisInitialized(_this)));
    _this.checkWindowWidth();
    window.addEventListener('resize', function () {
      _this.checkWindowWidth();
    });
    return _this;
  }
  _createClass(DetailsDisclosure, [{
    key: "onFocusOut",
    value: function onFocusOut() {
      var _this2 = this;
      setTimeout(function () {
        if (!_this2.contains(document.activeElement)) _this2.close();
      });
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', true);
      event.target.closest('details').setAttribute('open', true);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      this.mainDetailsToggle.removeAttribute('open');
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    }
  }, {
    key: "close",
    value: function close() {
      this.mainDetailsToggle.removeAttribute('open');
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    }
  }, {
    key: "checkWindowWidth",
    value: function checkWindowWidth() {
      if (window.innerWidth > Shopify.breakpoints.tablet) {
        this.mainDetailsToggle.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.mainDetailsToggle.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      } else {
        this.mainDetailsToggle.removeEventListener('mouseover', this.onMouseOver.bind(this));
        this.mainDetailsToggle.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
      }
    }
  }]);
  return DetailsDisclosure;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('details-disclosure', DetailsDisclosure);
var HeaderMenu = /*#__PURE__*/function (_DetailsDisclosure) {
  _inherits(HeaderMenu, _DetailsDisclosure);
  var _super2 = _createSuper(HeaderMenu);
  function HeaderMenu() {
    var _this3;
    _classCallCheck(this, HeaderMenu);
    _this3 = _super2.call(this);
    _this3.header = document.querySelector('header');
    var allMegaMenus = _this3.querySelectorAll(':scope .mega-menu');
    allMegaMenus.forEach(function (megaMenuParent) {
      megaMenuParent.addEventListener('mouseenter', function () {
        megaMenuParent.querySelector(':scope .mega-menu__content').animate(animateMenuOpen(), {
          duration: 500,
          fill: 'forwards'
        });
      });
    });
    return _this3;
  }
  _createClass(HeaderMenu, [{
    key: "onToggle",
    value: function onToggle() {
      if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
      if (this.header) document.documentElement.style.setProperty('--header-bottom-position-desktop', "".concat(Math.floor(this.header.getBoundingClientRect().bottom), "px"));
    }
  }]);
  return HeaderMenu;
}(DetailsDisclosure);
customElements.define('header-menu', HeaderMenu);