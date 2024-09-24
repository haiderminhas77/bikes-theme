"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
var CartModal = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CartModal, _HTMLElement);
  var _super = _createSuper(CartModal);
  function CartModal() {
    var _this;
    _classCallCheck(this, CartModal);
    _this = _super.call(this);
    _this.modal = document.getElementById('cart-modal');
    _this.header = document.querySelector('header');
    _this.querySelector('#CartModal-Overlay').addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
    _this.quantityInput = document.querySelector('.quantity__input');
    _this.freeShippingNotices = document.getElementsByClassName('fsn');
    _this.cartLink = document.getElementById('cart-icon-bubble');
    _this.cartLink.href = "";
    _this.cartLink.addEventListener('click', _this.handleCartLinkClick.bind(_assertThisInitialized(_this)));
    _this.checkoutContainer = _this.querySelector('#cart-modal__checkout');
    _this.modal.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });
    _this.querySelectorAll('button[type="button"]').forEach(function (closeButton) {
      return closeButton.addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
    });
    _this.debouncedOnChange = debounce(function (event) {
      _this.onChange(event);
    }, 300);
    _this.addEventListener('change', _this.debouncedOnChange.bind(_assertThisInitialized(_this)));
    return _this;
  }
  _createClass(CartModal, [{
    key: "open",
    value: function open() {
      var _this2 = this;
      document.querySelectorAll('modal-dialog').forEach(function (modal) {
        modal.hide();
      });
      // here the animation doesn't seem to always get triggered. A timeout seem to help
      setTimeout(function () {
        _this2.classList.add('animate', 'active');
      });
      document.body.classList.add('overflow-hidden');
      this.querySelector('.cart-modal__contents-inner').classList.remove('hidden');
      this.modal.addEventListener('transitionend', function () {
        _this2.modal.focus();
        trapFocus(_this2.modal);
      }, {
        once: true
      });
      if (this.dataset.nostoEnabled == true) {
        Nosto.reloadCart();
      }
      ;
    }
  }, {
    key: "close",
    value: function close() {
      document.body.classList.remove('overflow-hidden');
      this.classList.remove('active');
      this.querySelector('.cart-modal__contents-inner').classList.add('hidden');

      // if (this.isHeaderSticky === true) {
      //     this.shopifySectionHeader.style.position = 'sticky';
      // }

      // document.body.removeEventListener('click', this.onBodyClick);
      removeTrapFocus(this.activeElement);
    }
  }, {
    key: "renderContents",
    value: function renderContents(parsedState) {
      var _this3 = this;
      this.productId = parsedState.id;
      this.updateCartModal(parsedState);

      // if (this.fullBleedHeader) this.fullBleedHeader.reveal();

      // if (window.getComputedStyle(this.shopifySectionHeader).position === 'sticky') {
      //     this.isHeaderSticky = true;
      // }

      this.open();
      this.view_cart_event();
      setTimeout(function () {
        _this3.querySelector('#CartModal-Overlay').addEventListener('click', _this3.close.bind(_this3));
        _this3.open();
      });
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'cart-icon-bubble'
      }, {
        id: 'cart-modal-button'
      }, {
        id: 'cart-modal-items'
      }, {
        id: 'cart-modal-subtotal'
      }];
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
    }
  }, {
    key: "handleCartLinkClick",
    value: function handleCartLinkClick(e) {
      var _this4 = this;
      e.preventDefault();
      var sections = "".concat(window.location.pathname, "?sections=").concat(this.getSectionsToRender().map(function (section) {
        return section.id;
      }));
      fetch(sections).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var parsedState = JSON.parse(responseText);
        _this4.renderContents(parsedState);
      })["finally"](function () {
        _this4.open();
      });
    }
  }, {
    key: "updateQuantity",
    value: function () {
      var _updateQuantity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(line, quantity, name) {
        var _this5 = this;
        var body;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.remove_cart_event(line, quantity);
                body = JSON.stringify({
                  line: line,
                  quantity: quantity,
                  sections: ["cart-modal-items", "cart-modal-button", "cart-modal-subtotal", "cart-icon-bubble"],
                  sections_url: window.location.pathname
                });
                fetch("".concat(routes.cart_change_url), _objectSpread(_objectSpread({}, fetchConfig()), {
                  body: body
                })).then(function (response) {
                  if (response.status === 200) {
                    return response.text();
                  } else {
                    _this5.handleErrorMessage(response, line);
                  }
                }).then(function (state) {
                  var parsedState = JSON.parse(state);
                  _this5.classList.toggle('is-empty', parsedState.item_count === 0);
                  var cartFooter = document.getElementById('main-cart-footer');
                  if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
                  _this5.updateCartModal(parsedState);
                  var lineItem = _this5.querySelector("[data-cart-item-index=\"".concat(line, "\"]"));
                  if (lineItem && lineItem.querySelector("[name=\"".concat(name, "\"]"))) lineItem.querySelector("[name=\"".concat(name, "\"]")).focus();
                })["catch"](function () {
                  _this5.querySelectorAll('.loading-overlay').forEach(function (overlay) {
                    return overlay.classList.add('hidden');
                  });
                })["finally"](function () {
                  _this5.updateFreeShippingNotices();
                });
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function updateQuantity(_x, _x2, _x3) {
        return _updateQuantity.apply(this, arguments);
      }
      return updateQuantity;
    }()
  }, {
    key: "remove_cart_event",
    value: function () {
      var _remove_cart_event = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(line, newQuantity) {
        var itemData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(newQuantity == 0)) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 3;
                return this.gatherLineItemData(line);
              case 3:
                itemData = _context2.sent;
                Shopify.analytics.publish("remove_cart", {
                  "event": "remove_cart",
                  "value": "".concat(itemData.productData.price / 100),
                  "affiliation": "".concat(itemData.productData.vendor),
                  "page_type": "".concat(window.location.href.split('.com/')[1].split('/')[0]),
                  "currency": "".concat(Shopify.currency.active),
                  "items": [{
                    "item_id": "".concat(itemData.productData.variants.find(function (variant) {
                      return variant.option2 == itemData.sizeVariant;
                    }).sku),
                    "item_name": "".concat(itemData.productData.title),
                    "item_brand": "".concat(itemData.productData.vendor),
                    "item_category": "".concat(itemData.productData.type),
                    "item_variant": "".concat(itemData.productData.variants.find(function (variant) {
                      return variant.option2 == itemData.sizeVariant;
                    }).name),
                    "item_size": "".concat(itemData.productData.variants.find(function (variant) {
                      return variant.option2 == itemData.sizeVariant;
                    }).option2),
                    "price": "".concat(itemData.productData.variants.find(function (variant) {
                      return variant.option2 == itemData.sizeVariant;
                    }).price / 100),
                    "currency": "".concat(Shopify.currency.active),
                    "quantity": "0"
                  }]
                });
                _context2.next = 8;
                break;
              case 7:
                return _context2.abrupt("return");
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function remove_cart_event(_x4, _x5) {
        return _remove_cart_event.apply(this, arguments);
      }
      return remove_cart_event;
    }()
  }, {
    key: "gatherLineItemData",
    value: function () {
      var _gatherLineItemData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(line) {
        var itemRemoved, itemHandle, sizeVariant, colourVariant, productData;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                itemRemoved = this.querySelectorAll('.cart-item')[line - 1];
                itemHandle = itemRemoved.dataset.handle;
                sizeVariant = itemRemoved.querySelector('[data-option-name="size"] dd') ? itemRemoved.querySelector('[data-option-name="size"] dd').innerText : null;
                colourVariant = itemRemoved.querySelector('[data-option-name="colour"] dd') ? itemRemoved.querySelector('[data-option-name="colour"] dd').innerText : null;
                _context3.next = 6;
                return fetch("".concat(window.Shopify.routes.root, "products/").concat(itemHandle, ".js")).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return data;
                });
              case 6:
                productData = _context3.sent;
                return _context3.abrupt("return", {
                  "itemHandle": itemHandle,
                  "line": line,
                  "sizeVariant": sizeVariant,
                  "colourVariant": colourVariant,
                  "productData": productData
                });
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function gatherLineItemData(_x6) {
        return _gatherLineItemData.apply(this, arguments);
      }
      return gatherLineItemData;
    }()
  }, {
    key: "handleErrorMessage",
    value: function handleErrorMessage(response, line) {
      var errorMessage = this.querySelectorAll(':scope .product-form__error-message-wrapper')[line - 1];
      errorMessage.querySelector('span').innerText = window.cartStrings.quantityError;
      errorMessage.classList.toggle('hidden', response.status === 200);
    }
  }, {
    key: "updateFreeShippingNotices",
    value: function updateFreeShippingNotices() {
      var _this6 = this;
      fetch("/cart", {
        method: "GET",
        headers: {
          Accept: 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        Array.from(_this6.freeShippingNotices).forEach(function (notice) {
          return notice.setAttribute("data-cart-total", response.total_price);
        });
      });
    }
  }, {
    key: "updateCartModal",
    value: function updateCartModal(parsedState) {
      var _this7 = this;
      this.getSectionsToRender().forEach(function (section) {
        var parsedStateSections = parsedState.sections || parsedState;
        document.getElementById(section.id).innerHTML = parsedStateSections[section.id];

        //Adding event listener to cart-modal-button
        if (section.id === 'cart-modal-button') {
          _this7.manageCartModalButton();
        }

        //Identifying which elements need to be hidden depending on if the cart is empty or not
        if (section.id === 'cart-modal-items') {
          _this7.controlCartModalContentsReveal(parsedStateSections, section.id);
        }
      });
    }
  }, {
    key: "manageCartModalButton",
    value: function manageCartModalButton() {
      this.checkout = document.getElementById('checkout');
      if (this.checkout) this.checkout.addEventListener('click', this.checkoutLoading.bind(this));
    }
  }, {
    key: "controlCartModalContentsReveal",
    value: function controlCartModalContentsReveal(parsedStateSections, id) {
      var cartItemLength = Array.from(new DOMParser().parseFromString(parsedStateSections[id], 'text/html').querySelectorAll(".cart-item")).length;
      if (cartItemLength > 0) {
        //Removing class from cart-modal__contents-inner styling when cart is not empty
        document.querySelector('.cart-modal__contents-inner').classList.remove('cart-modal__empty-wrapper');
        //Removing checkoutContainer element 'hidden' class when the cart is not empty
        this.checkoutContainer.classList.remove('hidden');

        //Updates item count in cart modal heading element - commented out as we are using a snippet instead but want to keep the code for now
        // let cartHeader = this.querySelector('.cart__header-text');
        // if (cartHeader) {
        //     let itemCount = document.querySelector('.cart-count-bubble').dataset.cartCount;
        //     cartHeader.insertAdjacentHTML('afterend', `<span class="cart__header-count">[${itemCount}]</span>`);
        // }
      } else {
        //Adding class from cart-modal__contents-inner styling when cart is empty
        document.querySelector('.cart-modal__contents-inner').classList.add('cart-modal__empty-wrapper');
        //Adding hidden class to the checkoutContainer when the cart is empty
        this.checkoutContainer.classList.add('hidden');
      }
    }
  }, {
    key: "checkoutLoading",
    value: function checkoutLoading(e) {
      var button = e.target;
      button.firstElementChild.innerText = "";
      button.style.backgroundColor = 'dimgrey';
      button.classList.add('loading');
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
    }
  }, {
    key: "setActiveElement",
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }, {
    key: "view_cart_event",
    value: function () {
      var _view_cart_event = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var cartData, cartArray;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cartArray = function _cartArray(cartData) {
                  var productsAsArray = Array.isArray(cartData.items) ? cartData.items : new Array(cartData.items);
                  var items = [];
                  var itemToAdd = {};
                  productsAsArray.forEach(function (product) {
                    itemToAdd = {
                      "affiliation": cartData.items[0].vendor,
                      "item_id": product.sku,
                      "item_name": product.product_title,
                      "item_brand": product.vendor,
                      "item_category": product.product_type,
                      "item_variant": product.variant_title,
                      "item_size": product.variant_title,
                      "price": product.price / 100,
                      "discount": product.line_level_discount_allocations.amount,
                      "coupon": product.line_level_discount_allocations.title,
                      "currency": Shopify.currency.active,
                      "quantity": product.quantity,
                      "index": items.length
                    };
                    items.push(itemToAdd);
                  });
                  return items;
                };
                _context4.next = 3;
                return fetch("/cart", {
                  method: "GET",
                  headers: {
                    Accept: 'application/json'
                  }
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return data;
                });
              case 3:
                cartData = _context4.sent;
                Shopify.analytics.publish("view_cart", {
                  "currency": "".concat(Shopify.currency.active),
                  "value": "".concat(cartData.total_price / 100),
                  "items": cartArray(cartData)
                });
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function view_cart_event() {
        return _view_cart_event.apply(this, arguments);
      }
      return view_cart_event;
    }()
  }]);
  return CartModal;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('cart-modal', CartModal);