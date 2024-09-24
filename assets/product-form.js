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
if (!customElements.get('product-form')) {
  customElements.define('product-form', /*#__PURE__*/function (_HTMLElement) {
    _inherits(ProductForm, _HTMLElement);
    var _super = _createSuper(ProductForm);
    function ProductForm() {
      var _this;
      _classCallCheck(this, ProductForm);
      _this = _super.call(this);
      _this.form = _this.querySelector('form');
      _this.form.querySelector('[name=id]').disabled = false;
      _this.form.addEventListener('submit', _this.onSubmitHandler.bind(_assertThisInitialized(_this)));
      _this.cartModal = document.querySelector('cart-modal');
      _this.freeShippingNotices = document.getElementsByClassName('fsn');
      return _this;
    }
    _createClass(ProductForm, [{
      key: "onSubmitHandler",
      value: function onSubmitHandler(evt) {
        var _this2 = this;
        evt.preventDefault();
        var submitButton = this.querySelector('[type="submit"]');
        if (submitButton.classList.contains('loading')) return;
        this.handleErrorMessage();
        this.cartModal.setActiveElement(document.activeElement);
        submitButton.setAttribute('aria-disabled', true);
        submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
        var config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];
        var formData = new FormData(this.form);
        formData.append('sections', this.cartModal.getSectionsToRender().map(function (section) {
          return section.id;
        }));
        formData.append('sections_url', window.location.pathname);
        config.body = formData;
        fetch("".concat(routes.cart_add_url), config).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status) {
            _this2.handleErrorMessage(response.description);
            return;
          }
          _this2.cartModal.renderContents(response);
          _this2.updateFreeShippingNotices();
          var addedToCartEvent = new Event('added_to_cart');
          _this2.dispatchEvent(addedToCartEvent);
        })["catch"](function (e) {
          console.error(e);
        })["finally"](function () {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('aria-disabled');
          _this2.querySelector('.loading-overlay__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "updateFreeShippingNotices",
      value: function updateFreeShippingNotices() {
        var _this3 = this;
        fetch("/cart", {
          method: "GET",
          headers: {
            Accept: 'application/json'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          Array.from(_this3.freeShippingNotices).forEach(function (notice) {
            return notice.setAttribute("data-cart-total", response.total_price);
          });
        });
      }
    }, {
      key: "handleErrorMessage",
      value: function handleErrorMessage() {
        var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');
        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);
        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }]);
    return ProductForm;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}