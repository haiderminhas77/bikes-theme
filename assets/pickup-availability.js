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
if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', /*#__PURE__*/function (_HTMLElement) {
    _inherits(PickupAvailability, _HTMLElement);
    var _super = _createSuper(PickupAvailability);
    function PickupAvailability() {
      var _this;
      _classCallCheck(this, PickupAvailability);
      _this = _super.call(this);
      if (!_this.hasAttribute('available')) return _possibleConstructorReturn(_this);
      _this.errorHtml = _this.querySelector('template').content.firstElementChild.cloneNode(true);
      _this.onClickRefreshList = _this.onClickRefreshList.bind(_assertThisInitialized(_this));
      _this.fetchAvailability(_this.dataset.variantId);
      return _this;
    }
    _createClass(PickupAvailability, [{
      key: "fetchAvailability",
      value: function fetchAvailability(variantId) {
        var _this2 = this;
        var rootUrl = this.dataset.baseUrl;
        if (!rootUrl.endsWith("/")) {
          rootUrl = rootUrl + "/";
        }
        var variantSectionUrl = "".concat(rootUrl, "variants/").concat(variantId, "/?section_id=pickup-availability");
        fetch(variantSectionUrl).then(function (response) {
          return response.text();
        }).then(function (text) {
          var sectionInnerHTML = new DOMParser().parseFromString(text, 'text/html').querySelector('.shopify-section');
          _this2.renderPreview(sectionInnerHTML);
        })["catch"](function (e) {
          var button = _this2.querySelector('button');
          if (button) button.removeEventListener('click', _this2.onClickRefreshList);
          _this2.renderError();
        });
      }
    }, {
      key: "onClickRefreshList",
      value: function onClickRefreshList(evt) {
        this.fetchAvailability(this.dataset.variantId);
      }
    }, {
      key: "renderError",
      value: function renderError() {
        this.innerHTML = '';
        this.appendChild(this.errorHtml);
        this.querySelector('button').addEventListener('click', this.onClickRefreshList);
      }
    }, {
      key: "renderPreview",
      value: function renderPreview(sectionInnerHTML) {
        var drawer = document.querySelector('pickup-availability-drawer');
        if (drawer) drawer.remove();
        if (!sectionInnerHTML.querySelector('pickup-availability-preview')) {
          this.innerHTML = "";
          this.removeAttribute('available');
          return;
        }
        this.innerHTML = sectionInnerHTML.querySelector('pickup-availability-preview').outerHTML;
        this.setAttribute('available', '');
        document.body.appendChild(sectionInnerHTML.querySelector('pickup-availability-drawer'));
        var button = this.querySelector('button');
        if (button) button.addEventListener('click', function (evt) {
          document.querySelector('pickup-availability-drawer').show(evt.target);
        });
      }
    }]);
    return PickupAvailability;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}
if (!customElements.get('pickup-availability-drawer')) {
  customElements.define('pickup-availability-drawer', /*#__PURE__*/function (_HTMLElement2) {
    _inherits(PickupAvailabilityDrawer, _HTMLElement2);
    var _super2 = _createSuper(PickupAvailabilityDrawer);
    function PickupAvailabilityDrawer() {
      var _this3;
      _classCallCheck(this, PickupAvailabilityDrawer);
      _this3 = _super2.call(this);
      _this3.onBodyClick = _this3.handleBodyClick.bind(_assertThisInitialized(_this3));
      _this3.querySelector('button').addEventListener('click', function () {
        _this3.hide();
      });
      _this3.addEventListener('keyup', function () {
        if (event.code.toUpperCase() === 'ESCAPE') _this3.hide();
      });
      return _this3;
    }
    _createClass(PickupAvailabilityDrawer, [{
      key: "handleBodyClick",
      value: function handleBodyClick(evt) {
        var target = evt.target;
        if (target != this && !target.closest('pickup-availability-drawer') && target.id != 'ShowPickupAvailabilityDrawer') {
          this.hide();
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        this.removeAttribute('open');
        document.body.removeEventListener('click', this.onBodyClick);
        document.body.classList.remove('overflow-hidden');
        removeTrapFocus(this.focusElement);
      }
    }, {
      key: "show",
      value: function show(focusElement) {
        this.focusElement = focusElement;
        this.setAttribute('open', '');
        document.body.addEventListener('click', this.onBodyClick);
        document.body.classList.add('overflow-hidden');
        trapFocus(this);
      }
    }]);
    return PickupAvailabilityDrawer;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}