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
var InfiniteScroll = /*#__PURE__*/function (_HTMLElement) {
  _inherits(InfiniteScroll, _HTMLElement);
  var _super = _createSuper(InfiniteScroll);
  function InfiniteScroll() {
    var _this;
    _classCallCheck(this, InfiniteScroll);
    _this = _super.call(this);
    _this.grid = _this.querySelector("#product-grid");
    _this.productCount = _this.grid.children.length;
    _this.pagination = _this.querySelector("#pagination");
    _this.page = window.location.search.includes("page=") ? parseInt(window.location.search.split("page=")[1]) : 1;
    _this.setUpGridListener();
    if (_this.page == 1) {
      _this.setUpObserver();
    } else {
      history.scrollRestoration = "manual";
      _this.loadPrevPages();
    }
    return _this;
  }
  _createClass(InfiniteScroll, [{
    key: "loadPrevPages",
    value: function loadPrevPages() {
      var _this2 = this;
      var urls = [];
      for (var index = this.page - 1; index > 0; index--) {
        var page = "".concat(window.location.pathname, "?").concat(window.location.search.split("&page")[0].substring(0, 1) != "?" ? window.location.search.split("&page")[0] : window.location.search.split("&page")[0].substring(1), "&page=").concat(index);
        urls.push(page);
      }
      Promise.all(urls.map(function (u) {
        return fetch(u);
      })).then(function (responses) {
        return Promise.all(responses.map(function (res) {
          return res.text();
        }));
      }).then(function (texts) {
        texts.forEach(function (text) {
          var parser = new DOMParser();
          var html = parser.parseFromString(text, 'text/html');
          var newGrid = html.querySelectorAll('#product-grid')[0];
          _this2.grid.insertAdjacentHTML('afterbegin', newGrid.innerHTML);
        });
      })["finally"](function () {
        _this2.scrollToProduct();
        _this2.setUpObserver();
      });
    }
  }, {
    key: "scrollToProduct",
    value: function scrollToProduct() {
      var prod = localStorage.getItem("iscroll_product");
      if (prod) {
        var elem = this.querySelector("[data-product-id=\"".concat(prod, "\"]"));
        if (elem) {
          elem.scrollIntoView({
            behaviour: 'smooth',
            block: "center"
          });
        }
      }
    }
  }, {
    key: "setUpObserver",
    value: function setUpObserver() {
      var observer = new IntersectionObserver(function (entries, observer) {
        var _this3 = this;
        entries.forEach(function (entry) {
          if (entry.isIntersecting && _this3.page > 0) {
            _this3.pagination.querySelector('.loading-overlay__spinner').classList.remove('hidden');
            _this3.loadMore();
          }
        });
      }.bind(this), {
        rootMargin: '450px 0px 450px 0px'
      });
      if (this.pagination) {
        observer.observe(this.pagination);
      }
    }
  }, {
    key: "setUpGridListener",
    value: function setUpGridListener() {
      this.grid.addEventListener('click', function (event) {
        var id = event.target.closest("product-card").dataset.productId;
        localStorage.setItem("iscroll_product", id);
      });
    }
  }, {
    key: "loadMore",
    value: function loadMore() {
      var _this4 = this;
      this.page++;
      var page = "".concat(window.location.pathname, "?").concat(window.location.search.split("&page")[0].substring(0, 1) != "?" ? window.location.search.split("&page")[0] : window.location.search.split("&page")[0].substring(1), "&page=").concat(this.page);
      fetch(page).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var parser = new DOMParser();
        var html = parser.parseFromString(responseText, 'text/html');
        var newGrid = html.querySelectorAll('#product-grid')[0];
        if (newGrid && !newGrid.classList.value.includes("collection--empty")) {
          _this4.grid.insertAdjacentHTML('beforeend', newGrid.innerHTML);
          _this4.productCount = _this4.grid.children.length;
          history.pushState({
            page: page
          }, '', page);
          _this4.pagination.querySelector('.loading-overlay__spinner').classList.add('hidden');
        } else {
          _this4.page = 0;
          _this4.pagination.innerText = "";
        }
      });
    }
  }]);
  return InfiniteScroll;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('infinite-scroll', InfiniteScroll);