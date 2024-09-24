"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
function getFocusableElements(container) {
  return Array.from(container.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
}
document.querySelectorAll('[id^="Details-"] summary').forEach(function (summary) {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', 'false');
  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }
  summary.addEventListener('click', function (event) {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });
  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
var trapFocusHandlers = {};
function trapFocus(container) {
  var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];
  removeTrapFocus();
  trapFocusHandlers.focusin = function (event) {
    if (event.target !== container && event.target !== last && event.target !== first) return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };
  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };
  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key

    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };
  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);
  elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch (_unused) {
  focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
  var navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN'];
  var currentFocusedElement = null;
  var mouseClick = null;
  window.addEventListener('keydown', function (event) {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });
  window.addEventListener('mousedown', function (event) {
    mouseClick = true;
  });
  window.addEventListener('focus', function () {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');
    if (mouseClick) return;
    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');
  }, true);
}
function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach(function (video) {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach(function (video) {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach(function (video) {
    return video.pause();
  });
  document.querySelectorAll('product-model').forEach(function (model) {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}
function removeTrapFocus() {
  var elementToFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
  if (elementToFocus) elementToFocus.focus();
}
function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;
  var openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;
  var summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}
var QuantityInput = /*#__PURE__*/function (_HTMLElement) {
  _inherits(QuantityInput, _HTMLElement);
  var _super = _createSuper(QuantityInput);
  function QuantityInput() {
    var _this;
    _classCallCheck(this, QuantityInput);
    _this = _super.call(this);
    _this.input = _this.querySelector('input');
    _this.changeEvent = new Event('change', {
      bubbles: true
    });
    _this.querySelectorAll('button').forEach(function (button) {
      return button.addEventListener('click', _this.onButtonClick.bind(_assertThisInitialized(_this)));
    });
    return _this;
  }
  _createClass(QuantityInput, [{
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var previousValue = this.input.value;
      event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
      if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
    }
  }]);
  return QuantityInput;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('quantity-input', QuantityInput);
function debounce(fn, wait) {
  var _this2 = this;
  var t;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this2, args);
    }, wait);
  };
}
function fetchConfig() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/".concat(type)
    }
  };
}

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}
Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};
Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};
var currencySymbol = document.getElementById("_int").dataset.currency;
Shopify.moneyFormat = "".concat(currencySymbol, "{{amount}}");
Shopify.formatMoney = function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || moneyFormat;
  function formatWithDelimiters(number, precision, thousands, decimal) {
    thousands = thousands || ',';
    decimal = decimal || '.';
    if (isNaN(number) || number === null) {
      return 0;
    }
    number = (number / 100.0).toFixed(precision);
    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    var centsAmount = parts[1] ? decimal + parts[1] : '';
    return dollarsAmount + centsAmount;
  }
  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
    case 'amount_with_apostrophe_separator':
      value = formatWithDelimiters(cents, 2, "'");
      break;
  }
  return formatString.replace(placeholderRegex, value);
};
Shopify.breakpoints = {
  mobile: 749,
  tablet: 989
};
Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on' + eventName, callback);
};
Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  for (var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);
  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));
  this.initCountry();
  this.initProvince();
};
Shopify.CountryProvinceSelector.prototype = {
  initCountry: function initCountry() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },
  initProvince: function initProvince() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },
  countryHandler: function countryHandler(e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);
    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }
      this.provinceContainer.style.display = "";
    }
  },
  clearOptions: function clearOptions(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },
  setOptions: function setOptions(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

// This cart error message is a global variable for use where cart AJAX calls fail and an appropriate message is not included in the response i.e cart_change endpoint
Shopify.cart_error_message = "The cart change couldn't be completed";
if (typeof window.Theme == 'undefined') {
  window.Theme = {};
}
var strings = {
  usages: {
    mainProduct: 'main-product'
  }
};

//used in snippet/facets.liquid /rendered in section/main-collection-product-grid.liquid / also used in custom element header-drawer
var MenuDrawer = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(MenuDrawer, _HTMLElement2);
  var _super2 = _createSuper(MenuDrawer);
  function MenuDrawer() {
    var _this3;
    _classCallCheck(this, MenuDrawer);
    _this3 = _super2.call(this);
    _this3.mainDetailsToggle = _this3.querySelector('details');
    _this3.header = _this3.header || document.querySelector('.section-header');
    //Props for specifc use cases to power customs methods
    _this3.stickyAtc = document.querySelector('sticky-atc');
    _this3.fullBleedHeader = _this3.hasAttribute("data-full-bleed");

    // if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    // view port height variable, no longer just for just iphone as above
    var setMobileHeight = function setMobileHeight(e) {
      document.documentElement.style.setProperty('--viewport-height', "".concat(window.innerHeight, "px"));
    };
    document.addEventListener('DOMContentLoaded', setMobileHeight);
    window.addEventListener('resize', setMobileHeight);
    _this3.addEventListener('keyup', _this3.onKeyUp.bind(_assertThisInitialized(_this3)));
    _this3.addEventListener('focusout', _this3.onFocusOut.bind(_assertThisInitialized(_this3)));
    _this3.bindEvents();
    return _this3;
  }
  _createClass(MenuDrawer, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this4 = this;
      this.querySelectorAll('summary').forEach(function (summary) {
        return summary.addEventListener('click', _this4.onSummaryClick.bind(_this4));
      });
      this.querySelectorAll('button').forEach(function (button) {
        return button.addEventListener('click', _this4.onCloseButtonClick.bind(_this4));
      });
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
      var openDetailsElement = event.target.closest('details[open]');
      if (!openDetailsElement) return;
      openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
    }
  }, {
    key: "onSummaryClick",
    value: function onSummaryClick(event) {
      var summaryElement = event.currentTarget;
      var detailsElement = summaryElement.parentNode;
      var isOpen = detailsElement.hasAttribute('open');
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      function addTrapFocus() {
        trapFocus(summaryElement.nextElementSibling);
        summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
      }
      if (detailsElement === this.mainDetailsToggle) {
        if (isOpen) event.preventDefault();
        isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
      } else {
        setTimeout(function () {
          detailsElement.classList.add('menu-opening');
          summaryElement.setAttribute('aria-expanded', true);
          !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
        }, 100);
      }

      //Call custom methods in specific use cases
      if (this.stickyAtc) this.stickyAtcHandling(isOpen, summaryElement);
      if (this.fullBleedHeader) this.fullBleedHeaderHandling(isOpen);
    }
  }, {
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this5 = this;
      setTimeout(function () {
        _this5.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
      this.sortByModalObserver(event);
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event) {
      var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (event !== undefined) {
        this.mainDetailsToggle.classList.remove('menu-opening');
        this.mainDetailsToggle.querySelectorAll('details').forEach(function (details) {
          details.removeAttribute('open');
          details.classList.remove('menu-opening');
        });
        document.body.classList.remove("overflow-hidden-".concat(this.dataset.breakpoint));
        removeTrapFocus(elementToFocus);
        this.closeAnimation(this.mainDetailsToggle);
      }
    }
  }, {
    key: "onFocusOut",
    value: function onFocusOut(event) {
      var _this6 = this;
      setTimeout(function () {
        if (_this6.mainDetailsToggle.hasAttribute('open') && !_this6.mainDetailsToggle.contains(document.activeElement)) _this6.closeMenuDrawer();
      });
    }
  }, {
    key: "onCloseButtonClick",
    value: function onCloseButtonClick(event) {
      var detailsElement = event.currentTarget.closest('details');
      this.closeSubmenu(detailsElement);
    }
  }, {
    key: "closeSubmenu",
    value: function closeSubmenu(detailsElement) {
      detailsElement.classList.remove('menu-opening');
      detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
      removeTrapFocus();
      this.closeAnimation(detailsElement);
    }
  }, {
    key: "closeAnimation",
    value: function closeAnimation(detailsElement) {
      var animationStart;
      var handleAnimation = function handleAnimation(time) {
        if (animationStart === undefined) {
          animationStart = time;
        }
        var elapsedTime = time - animationStart;
        if (elapsedTime < 400) {
          window.requestAnimationFrame(handleAnimation);
        } else {
          detailsElement.removeAttribute('open');
          if (detailsElement.closest('details[open]')) {
            trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
          }
        }
      };
      window.requestAnimationFrame(handleAnimation);
    }
  }, {
    key: "stickyAtcHandling",
    value: function stickyAtcHandling(isOpen, summaryElement) {
      if (summaryElement.classList.contains('header__icon--menu')) {
        if (!isOpen) {
          this.stickyAtc.classList.add('hidden');
        } else if (isOpen) {
          this.stickyAtc.classList.remove('hidden');
        }
      }
    }
  }, {
    key: "fullBleedHeaderHandling",
    value: function fullBleedHeaderHandling(isOpen) {
      this.header = document.querySelector('.section-header');
      if (!isOpen) {
        this.header.classList.remove("shopify-section-header-transparent");
      } else {
        this.header.classList.add("shopify-section-header-transparent");
      }
    }

    // Mutation observer to scroll to either sort by options or top of filters in filter modal on mobile (PLP)
  }, {
    key: "sortByModalObserver",
    value: function sortByModalObserver(event) {
      var targetModal = document.querySelector('.facets__disclosure');
      var options = {
        attributes: true
      };
      function handleMutation(records, observerObj) {
        observerObj.disconnect();
        if (records.find(function (record) {
          return record.attributeName === "open";
        })) {
          if (event.target.classList.contains('facets__open-sort') || event.target.closest('#facets__open-wrapper').classList.contains('facets__open-sort')) {
            document.querySelector('.facets__sort-by').scrollIntoView();
          }
          if (event.target.classList.contains('facets__open-filters') || event.target.closest('#facets__open-wrapper').classList.contains('facets__open-filters')) {
            document.querySelector('.facets__summary').scrollIntoView(false);
          }
        }
        ;
      }
      var observer = new MutationObserver(handleMutation);
      observer.observe(targetModal, options);
    }
  }]);
  return MenuDrawer;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('menu-drawer', MenuDrawer);

//headerDrawer extends MenuDrawer - used in section/header.liquid
var HeaderDrawer = /*#__PURE__*/function (_MenuDrawer) {
  _inherits(HeaderDrawer, _MenuDrawer);
  var _super3 = _createSuper(HeaderDrawer);
  function HeaderDrawer() {
    var _this7;
    _classCallCheck(this, HeaderDrawer);
    _this7 = _super3.call(this);
    _this7.announcementBar = _this7.announcementBar || document.getElementsByClassName('announcement')[0];
    _this7.checkWindowWidth();
    window.addEventListener('resize', function () {
      _this7.checkWindowWidth();
    });
    return _this7;
  }
  _createClass(HeaderDrawer, [{
    key: "openMenuDrawer",
    value: function openMenuDrawer(summaryElement) {
      var _this8 = this;
      this.mainDetailsToggle = this.querySelector('details');
      this.header = this.header || document.querySelector('.section-header');
      this.header.classList.add('shopify-section-header-mobnav');
      this.announcementBar.classList.add('hidden');
      setTimeout(function () {
        _this8.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add("overflow-hidden-".concat(this.dataset.breakpoint));
      document.body.classList.add("header-mobnav_overlay");
    }
  }, {
    key: "closeMenuDrawer",
    value: function closeMenuDrawer(event) {
      var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (event !== undefined) {
        this.mainDetailsToggle.classList.remove('menu-opening');
        this.mainDetailsToggle.querySelectorAll('details').forEach(function (details) {
          details.removeAttribute('open');
          details.classList.remove('menu-opening');
        });
        document.body.classList.remove("overflow-hidden-".concat(this.dataset.breakpoint));
        document.body.classList.remove("header-mobnav_overlay");
        this.header.classList.remove('shopify-section-header-mobnav');
        this.announcementBar.classList.remove('hidden');
        removeTrapFocus(elementToFocus);
        this.closeAnimation(this.mainDetailsToggle);
      }
    }
  }, {
    key: "checkWindowWidth",
    value: function checkWindowWidth() {
      if (window.innerWidth > Shopify.breakpoints.tablet) {
        this.header.classList.remove('shopify-section-header-mobnav');
        document.body.classList.remove("header-mobnav_overlay");
        this.announcementBar.classList.remove('hidden');
      }
    }
  }]);
  return HeaderDrawer;
}(MenuDrawer);
customElements.define('header-drawer', HeaderDrawer);

// use in collage.liquid (video pop up)/main-product.liquid (pop up)
var ModalDialog = /*#__PURE__*/function (_HTMLElement3) {
  _inherits(ModalDialog, _HTMLElement3);
  var _super4 = _createSuper(ModalDialog);
  function ModalDialog() {
    var _this9;
    _classCallCheck(this, ModalDialog);
    _this9 = _super4.call(this);
    _this9.querySelector('[id^="ModalClose-"]').addEventListener('click', _this9.hide.bind(_assertThisInitialized(_this9)));
    _this9.addEventListener('keyup', function (event) {
      if (event.code.toUpperCase() === 'ESCAPE') _this9.hide();
    });
    if (_this9.classList.contains('media-modal')) {
      _this9.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) _this9.hide();
      });
    } else {
      _this9.addEventListener('click', function (event) {
        if (event.target.nodeName === 'MODAL-DIALOG') _this9.hide();
      });
    }
    return _this9;
  }
  _createClass(ModalDialog, [{
    key: "show",
    value: function show(opener) {
      this.openedBy = opener;
      var popup = this.querySelector('.template-popup');
      document.body.classList.add('overflow-hidden');
      this.setAttribute('open', '');
      if (popup) popup.loadContent();
      trapFocus(this, this.querySelector('[role="dialog"]'));
      window.pauseAllMedia();
    }
  }, {
    key: "hide",
    value: function hide() {
      document.body.classList.remove('overflow-hidden');
      this.removeAttribute('open');
      removeTrapFocus(this.openedBy);
      window.pauseAllMedia();
    }
  }]);
  return ModalDialog;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('modal-dialog', ModalDialog);

//used sections/landing-mat.liquid
var LandingMat = /*#__PURE__*/function (_ModalDialog) {
  _inherits(LandingMat, _ModalDialog);
  var _super5 = _createSuper(LandingMat);
  function LandingMat() {
    var _this10;
    _classCallCheck(this, LandingMat);
    _this10 = _super5.call(this);
    _this10.storeCountry = _this10.dataset.storeCountry;
    _this10.storeDomain = _this10.dataset.storeDomain;
    _this10.section = document.getElementById(_this10.parentElement.id);
    _this10.siblingStoreData = Array.from(_this10.querySelector("#SiblingStoreData").children).map(function (store) {
      return JSON.parse(store.innerHTML);
    });
    _this10.testMode = _this10.dataset.testMode;
    _this10.matTitle = _this10.getElementsByClassName('landing-mat-modal__content-title')[0];
    _this10.matMessage = _this10.getElementsByClassName('landing-mat-modal__content-message')[0];
    _this10.matFlag = _this10.getElementsByClassName('landing-mat-modal__content-flag')[0];
    _this10.matRemainLink = _this10.getElementsByClassName('landing-mat-modal__content-remain-link')[0];
    _this10.destroyMat.bind(_assertThisInitialized(_this10));
    return _this10;
  }
  _createClass(LandingMat, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var source = document.referrer;

      //set referrer to external source if test mode enabled
      if (this.testMode) source = "https://www.bbc.co.uk/programmes/m0012fb4";
      if (source && !source.includes(this.storeDomain)) {
        this.userLocation();
      } else {
        this.destroyMat();
      }
    }
  }, {
    key: "userLocation",
    value: function userLocation() {
      var _this11 = this;
      fetch("https://ipinfo.io", {
        headers: {
          'Accept': "application/json"
        }
      }).then(function (response) {
        return response.json();
      }).then(function (responseJSON) {
        _this11.checkMatRequired(responseJSON.country);
      });
    }
  }, {
    key: "checkMatRequired",
    value: function checkMatRequired(userLocation) {
      if (userLocation == this.storeCountry) {
        this.destroyMat;
      } else {
        var matContent = this.siblingStoreData.filter(function (store) {
          return store.country == userLocation;
        })[0];
        matContent ? this.loadMat(matContent) : this.destroyMat();
      }
    }
  }, {
    key: "loadMat",
    value: function loadMat(matContent) {
      var _this12 = this;
      this.matTitle.innerText = matContent.title;
      this.matMessage.innerText = matContent.message;
      this.matFlag.srcset = matContent.store_flag;
      this.matRemainLink.innerText = matContent.remain_link;
      setTimeout(function () {
        _this12.setAttribute("open", "");
      }, 500);
      this.matFlag.addEventListener("click", function (e) {
        _this12.classList.add("landing-mat-modal--removal");
        window.location.href = matContent.store_url;
        _this12.destroyMat();
      });
      this.matRemainLink.addEventListener("click", function (e) {
        _this12.classList.add("landing-mat-modal--removal");
        setTimeout(function () {
          _this12.destroyMat();
        }, 1000);
      });
    }
  }, {
    key: "destroyMat",
    value: function destroyMat() {
      this.remove();
    }
  }]);
  return LandingMat;
}(ModalDialog);
customElements.define('landing-mat', LandingMat);

//used in section/collage.liquid, snippets product-popup.liquid and snippets/product-thumbnail.liquid
var ModalOpener = /*#__PURE__*/function (_HTMLElement4) {
  _inherits(ModalOpener, _HTMLElement4);
  var _super6 = _createSuper(ModalOpener);
  function ModalOpener() {
    var _this13;
    _classCallCheck(this, ModalOpener);
    _this13 = _super6.call(this);
    var button = _this13.querySelector('button');
    if (!button) return _possibleConstructorReturn(_this13);
    button.addEventListener('click', function () {
      var modal = document.querySelector(_this13.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
    return _this13;
  }
  return _createClass(ModalOpener);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('modal-opener', ModalOpener);
var QuickView = /*#__PURE__*/function (_HTMLElement5) {
  _inherits(QuickView, _HTMLElement5);
  var _super7 = _createSuper(QuickView);
  function QuickView() {
    var _this14;
    _classCallCheck(this, QuickView);
    _this14 = _super7.call(this);

    /* Constructor properties & methods include
    - this.dialogWrapper: modal-dialog element to handle opening/closing for quick-view on plp
    - this.setObserver(): method for setting attribute observer for modal dialog opening to trigger method flow with assessRender() method and correct product handle
    - this.cachedDOM: property to initialise an empty array, this will be filled with objects containing a product handle, quick view DOM and productData in JSON format
    - this.contentWrapper: property of quickview's main content parent element
    - this.fullDetailsLink: property of the full details link, used and updated in multiple methods so defined here
    - this.zoomOn: property, Boolean, needs to be default set to false at class lifecycle start.
    */

    _this14.dialogWrapper = document.querySelector('modal-dialog#quick-view-plp-modal');
    _this14.setObserver();
    _this14.cachedDOM = [];
    _this14.contentWrapper = _this14.querySelector('.quick-view__content-wrapper');
    _this14.fullDetailsLink = _this14.querySelector(':scope .full-details__link');
    _this14.zoomOn = false;
    return _this14;
  }
  _createClass(QuickView, [{
    key: "setObserver",
    value: function setObserver() {
      var _this15 = this;
      var modalObserver = new MutationObserver(function (mutationList) {
        mutationList.forEach(function (mutation) {
          if (mutation.type == 'attributes') {
            if (mutation.oldValue !== null) {
              return;
            } else {
              var _this15$dialogWrapper, _this15$dialogWrapper2;
              _this15.product = _this15.dialogWrapper.openedBy.closest('.quick-view__button').dataset.productHandle;
              _this15.quickViewCard = ((_this15$dialogWrapper = _this15.dialogWrapper) === null || _this15$dialogWrapper === void 0 ? void 0 : (_this15$dialogWrapper2 = _this15$dialogWrapper.openedBy) === null || _this15$dialogWrapper2 === void 0 ? void 0 : _this15$dialogWrapper2.closest('product-card')) || null;
              _this15.assessRender(_this15.product);
            }
          }
        });
      });
      modalObserver.observe(this.dialogWrapper, {
        attributeFilter: ['open'],
        attributeOldValue: true
      });
    }
  }, {
    key: "assessRender",
    value: function assessRender(productToFetch, fromSwatch) {
      this.toggleLoadingSpinner(false);
      if (fromSwatch === true) {
        this.currentSwatches = this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container').outerHTML;
      }
      this.resetModalContent();
      if (this.cachedDOM.length >= 1) {
        // uses .find() method on cacheDOM array to look by handle for previously cached product, if found, the handle's returned to productToRender, otherwise returns null
        var productToRender = this.cachedDOM.find(function (cachedDOMEntry) {
          return productToFetch === cachedDOMEntry.handle;
        }) ? this.cachedDOM.find(function (cachedDOMEntry) {
          return productToFetch === cachedDOMEntry.handle;
        }) : null;
        // if productToRender is not null, renderQuickViewFromCache() is fired with handle, otherwise productFetchAPI() is fired with handle from assessRender() args
        productToRender != null ? this.renderQuickViewFromCache(productToRender, fromSwatch) : this.productFetchAPI(productToFetch, fromSwatch);
      } else {
        // if cachedDOM array has no entries, assume API call
        this.productFetchAPI(productToFetch, fromSwatch);
      }
    }
  }, {
    key: "productFetchAPI",
    value: function () {
      var _productFetchAPI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(productToFetch, fromSwatch) {
        var _this16 = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch(window.Shopify.routes.root + "products/".concat(productToFetch, "?sections=quick-view-section")).then(function (res) {
                  return res.json();
                }).then(function (response) {
                  var parser = new DOMParser();
                  var quickViewContent = parser.parseFromString(response['quick-view-section'], 'text/html');
                  _this16.appendChild(quickViewContent.querySelector('.quick-view__content-wrapper'));
                  var productJSON = JSON.parse(_this16.querySelector('.product-json').innerText);
                  _this16.setAttribute('aria-label', "quick view modal for ".concat(productJSON.title));
                  _this16.dataset.handle = productJSON.handle;
                  _this16.cacheQuickViewDOM(_this16.querySelector('.quick-view__content-wrapper').cloneNode(true), productJSON.handle, productJSON, fromSwatch);
                  if (!fromSwatch) {
                    _this16.handleSwatches(productJSON);
                  } else {
                    _this16.updateSelectedSwatchForCachedCurrentSwatches(productToFetch);
                  }
                  _this16.toggleLoadingSpinner(true);
                });
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function productFetchAPI(_x, _x2) {
        return _productFetchAPI.apply(this, arguments);
      }
      return productFetchAPI;
    }()
  }, {
    key: "handleSwatches",
    value: function () {
      var _handleSwatches = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(productData) {
        var _this17 = this;
        var swatchesForQuickView, swatchCallResponse, responseText, parserDOM, swatchData, swatchesWrapper, allSwatches, selectedSwatch, seeMoreToggle;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.quickViewCard) {
                  _context2.next = 4;
                  break;
                }
                swatchesForQuickView = this.quickViewCard.querySelector('.product-sibling-swatch-container.card__swatch--container').cloneNode(true);
                _context2.next = 20;
                break;
              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return fetch("".concat(window.Shopify.routes.root, "products/").concat(productData.handle, "?section_id=product-card-sibling-selector-swatches"));
              case 7:
                swatchCallResponse = _context2.sent;
                _context2.next = 10;
                return swatchCallResponse.text();
              case 10:
                responseText = _context2.sent;
                parserDOM = new DOMParser();
                swatchData = parserDOM.parseFromString(responseText, 'text/html');
                swatchesForQuickView = swatchData.querySelector('.product-sibling-swatch-container.card__swatch--container');
                _context2.next = 20;
                break;
              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](4);
                console.error('Error fetching swatches:', _context2.t0);
                return _context2.abrupt("return");
              case 20:
                swatchesWrapper = this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container'); // swatchesWrapper.outerHTML = swatchesForQuickView.outerHTML;
                if (swatchesWrapper) {
                  swatchesWrapper.outerHTML = swatchesForQuickView.outerHTML;
                }
                allSwatches = this.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch'); // Removes swatch--selected class from all swatches
                allSwatches.forEach(function (swatch) {
                  swatch.classList.remove('swatch--selected');
                });
                // Finds selected swatch and applies class 
                selectedSwatch = Array.from(allSwatches).find(function (swatch) {
                  return swatch.dataset.handle == productData.handle;
                });
                selectedSwatch ? selectedSwatch.classList.add('swatch--selected') : null;

                // See more swatch toggle
                seeMoreToggle = this.querySelector(':scope .card__swatch.card__swatch--see-more') ? this.querySelector(':scope .card__swatch.card__swatch--see-more') : null;
                if (seeMoreToggle != null) {
                  seeMoreToggle.remove();
                }
                allSwatches.forEach(function (swatch) {
                  swatch.classList.remove('card__swatch--overspill-narrow-card');
                  swatch.classList.remove('card__swatch--overspill-wide-card');
                  swatch.addEventListener('click', _this17.assessRender.bind(_this17, swatch.dataset.handle, true));
                });
              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 16]]);
      }));
      function handleSwatches(_x3) {
        return _handleSwatches.apply(this, arguments);
      }
      return handleSwatches;
    }()
  }, {
    key: "updateSelectedSwatchForCachedCurrentSwatches",
    value: function updateSelectedSwatchForCachedCurrentSwatches(productToFetchHandle) {
      var _this18 = this;
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.currentSwatches, 'text/html');
      var productHandle = '/products/' + productToFetchHandle;

      // Select all elements with the specified class
      var swatches = doc.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch.swatch-circle');

      // Remove selected classes from all swatches
      swatches.forEach(function (swatch) {
        swatch.classList.remove('card__swatch--selected', 'swatch--selected');
      });

      // Find the swatch with the matching data-url attribute
      var targetSwatch = Array.from(swatches).find(function (swatch) {
        return swatch.getAttribute('data-url') === productHandle;
      });

      // Add the selected classes to the target swatch
      if (targetSwatch) {
        targetSwatch.classList.add('card__swatch--selected', 'swatch--selected');
      }

      // Convert the updated document back to a string
      this.currentSwatches = doc.body.innerHTML;
      this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container').outerHTML = this.currentSwatches;
      var allSwatches = this.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch');
      allSwatches.forEach(function (swatch) {
        swatch.addEventListener('click', _this18.assessRender.bind(_this18, swatch.dataset.handle, true));
      });
    }
  }, {
    key: "swatch_clicked_event",
    value: function swatch_clicked_event(product) {
      var _this$dialogWrapper$o, _this$dialogWrapper$o2;
      Shopify.analytics.publish("colour_swatch_click", {
        "currency": "".concat(Shopify.currency.active),
        "value": "".concat(product.price / 100),
        "item_list_id": "",
        "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
        "affiliation": "".concat(product.vendor),
        "items": [{
          "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
          "item_id": "".concat(product.variants[0].sku),
          "item_name": "".concat(product.title),
          "item_brand": "".concat(product.vendor),
          "item_category": "".concat(product.type),
          "item_variant": "".concat(product.title, " - ").concat(product.variants[0].title),
          "affiliation": "".concat(product.vendor),
          "price": "".concat(product.price / 100),
          "currency": "".concat(Shopify.currency.active),
          "quantity": 1,
          "discount": 0,
          "index": "".concat(((_this$dialogWrapper$o = this.dialogWrapper.openedBy.closest('li.grid__item')) === null || _this$dialogWrapper$o === void 0 ? void 0 : (_this$dialogWrapper$o2 = _this$dialogWrapper$o.dataset) === null || _this$dialogWrapper$o2 === void 0 ? void 0 : _this$dialogWrapper$o2.position) || 0)
        }]
      });
    }
  }, {
    key: "cacheQuickViewDOM",
    value: function cacheQuickViewDOM(DOMToCache, handle, data, fromSwatch) {
      // Stores product handle, completed quickView DOM, and productData JSON in an object in the cachedDOM array
      this.cachedDOM.push({
        handle: handle,
        DOM: DOMToCache,
        productData: data
      });
      if (fromSwatch === true) {
        this.swatch_clicked_event(data);
      } else {
        this.quick_view_opened(data);
      }
    }
  }, {
    key: "quick_view_opened",
    value: function quick_view_opened(product) {
      var _this$dialogWrapper$o3, _this$dialogWrapper$o4;
      Shopify.analytics.publish("quick_view_opened", {
        "currency": "".concat(Shopify.currency.active),
        "value": "".concat(product.price / 100),
        "item_list_id": "",
        "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
        "affiliation": "".concat(product.vendor),
        "items": [{
          "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
          "item_id": "".concat(product.variants[0].sku),
          "item_name": "".concat(product.title),
          "item_brand": "".concat(product.vendor),
          "item_category": "".concat(product.type),
          "item_variant": "".concat(product.title, " - ").concat(product.variants[0].title),
          "affiliation": "".concat(product.vendor),
          "price": "".concat(product.price / 100),
          "currency": "".concat(Shopify.currency.active),
          "quantity": 1,
          "discount": 0,
          "index": "".concat(((_this$dialogWrapper$o3 = this.dialogWrapper.openedBy.closest('li.grid__item')) === null || _this$dialogWrapper$o3 === void 0 ? void 0 : (_this$dialogWrapper$o4 = _this$dialogWrapper$o3.dataset) === null || _this$dialogWrapper$o4 === void 0 ? void 0 : _this$dialogWrapper$o4.position) || 0)
        }]
      });
    }
  }, {
    key: "renderQuickViewFromCache",
    value: function () {
      var _renderQuickViewFromCache = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(productToRender, fromSwatch) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // clears modal, re-inserts quickView DOM from cached JSON object,
                // fires necessary methods to initialise listeners
                this.resetModalContent(true);
                this.setAttribute('aria-label', "quick view modal for ".concat(productToRender.productData.title));
                document.querySelector('.quick-view__content-wrapper').outerHTML = productToRender.DOM.outerHTML;
                if (!fromSwatch) {
                  this.handleSwatches(productToRender);
                } else {
                  this.updateSelectedSwatchForCachedCurrentSwatches(productToRender.productData.handle);
                }
                this.toggleLoadingSpinner(true);
                if (fromSwatch === true) {
                  this.swatch_clicked_event(productToRender.productData);
                }
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function renderQuickViewFromCache(_x4, _x5) {
        return _renderQuickViewFromCache.apply(this, arguments);
      }
      return renderQuickViewFromCache;
    }()
  }, {
    key: "resetModalContent",
    value: function resetModalContent() {
      var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Deletes all content from quickView modal to enable fresh section render
      this.querySelector('.quick-view__content-wrapper') ? this.querySelector('.quick-view__content-wrapper').remove() : null;
      // If method called from renderQuickViewFromCache it will re-create a content wrapper to re-append cached content
      if (cache) {
        var contentWrapper = document.createElement('div');
        var classesForWrapper = ['quick-view__content-wrapper', 'product', 'grid', 'grid--2-col-desktop', 'grid--1-col-tablet-down'];
        classesForWrapper.forEach(function (classForWrapper) {
          contentWrapper.classList.add(classForWrapper);
        });
        this.appendChild(contentWrapper);
      }
    }
  }, {
    key: "toggleLoadingSpinner",
    value: function toggleLoadingSpinner(force) {
      // Turns a loading screen on/off
      var loadingSpinner = this.querySelector('.loading-overlay__spinner');
      loadingSpinner.classList.toggle('hidden', force);
    }
  }, {
    key: "closeQuickView",
    value: function closeQuickView() {
      // Closes modal on ATC event
      document.body.classList.remove('overflow-hidden');
      this.dialogWrapper.removeAttribute('open');
      removeTrapFocus(this.dialogWrapper.openedBy);
    }
  }, {
    key: "updatePricing",
    value: function updatePricing(currentVariant) {
      if (currentVariant.compare_at_price === null) {
        this.querySelector('.price__sale .price-item--regular').style.display = 'none';
        this.querySelector('.price__sale .price-item--sale').innerHTML = "".concat(Shopify.formatMoney(currentVariant.price, Shopify.moneyFormat), " ").concat(document.getElementById('_int').dataset.currencyCode);
      } else {
        this.querySelector('.price__sale .price-item--sale').innerHTML = "".concat(Shopify.formatMoney(currentVariant.price, Shopify.moneyFormat), " ").concat(document.getElementById('_int').dataset.currencyCode);
        this.querySelector('.price__sale .price-item--regular').style.display = 'flex';
      }
    }
  }]);
  return QuickView;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('quick-view', QuickView);

//used in snippets/product-thumbnail.liquid, specific to PDP
var PdpModalOpener = /*#__PURE__*/function (_ModalOpener) {
  _inherits(PdpModalOpener, _ModalOpener);
  var _super8 = _createSuper(PdpModalOpener);
  function PdpModalOpener() {
    var _this19;
    _classCallCheck(this, PdpModalOpener);
    _this19 = _super8.call(this);
    _this19.handleMobileGallery();
    return _this19;
  }
  _createClass(PdpModalOpener, [{
    key: "handleMobileGallery",
    value: function handleMobileGallery() {
      // if (window.innerWidth < Shopify.breakpoints.mobile && !this.clientWidth > 0) {
      // 	let variantMedia = this.querySelector('.product__media');
      // 	let parentLi = this.closest('li');
      // 	if (parentLi.querySelector('product-gallery-deferred-media') !== null) {
      // 		let variantDeferredMedia = parentLi.querySelector('product-gallery-deferred-media');
      // 		parentLi.append(variantDeferredMedia);
      // 	} else if (parentLi.querySelector('product-model') !== null) {
      // 		let variantModel = parentLi.querySelector('product-model');
      // 		parentLi.append(variantModel);
      // 	} else {
      // 		parentLi.append(variantMedia);
      // 	}
      // }
    }
  }]);
  return PdpModalOpener;
}(ModalOpener);
customElements.define('pdp-modal-opener', PdpModalOpener);

// used alongside modal-dialog in collage.liquid (video pop up) and video.liquid
var DeferredMedia = /*#__PURE__*/function (_HTMLElement6) {
  _inherits(DeferredMedia, _HTMLElement6);
  var _super9 = _createSuper(DeferredMedia);
  function DeferredMedia() {
    var _this20;
    _classCallCheck(this, DeferredMedia);
    _this20 = _super9.call(this);
    var poster = _this20.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return _possibleConstructorReturn(_this20);
    if (_assertThisInitialized(_this20) !== 'product-gallery-deferred-media') poster.addEventListener('click', _this20.loadContent.bind(_assertThisInitialized(_this20)));
    return _this20;
  }
  _createClass(DeferredMedia, [{
    key: "loadContent",
    value: function loadContent() {
      window.pauseAllMedia();
      if (!this.getAttribute('loaded')) {
        var content = document.createElement('div');
        content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
        this.appendChild(content.querySelector('video, model-viewer, iframe'));
        this.videoSrcHandler();
      }
    }
  }, {
    key: "videoSrcHandler",
    value: function videoSrcHandler() {
      var video = this.querySelector('#mp4-video-player');
      if (video !== null) {
        if (window.matchMedia("(min-width: ".concat(Shopify.breakpoints.mobile, "px)")).matches) {
          video.src = video.dataset.desktopSrc;
        } else {
          video.src = video.dataset.mobileSrc;
        }
      }
      this.initiateVideo();
    }
  }, {
    key: "initiateVideo",
    value: function initiateVideo() {
      var _this21 = this;
      this.setAttribute('loaded', true);
      if (this.querySelector('iframe') === null) {
        if (this.dataset.autoplaySetting !== 'true') {
          this.querySelector('video').play();
          this.querySelector('video').addEventListener('click', function () {
            _this21.querySelector('video').paused === true ? play() : pause();
          });
        }
      }
      //previously, .focus() was applied to the end of the above line, but it was causing the video to be skipped immediately to on the PDP mobile gallery (PdpDeferredMedia class/custom element, which extends this method). Workaround needs to be found if this causes issues in the future
      // if (this.classList.contains('product__lifestyle-video')) {
      // 	this.style.paddingBottom = 'unset';
      // }
    }
  }]);
  return DeferredMedia;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('deferred-media', DeferredMedia);

// used in snippet product media (rendered in featured-product and main-product)
var ProductGalleryDeferredMedia = /*#__PURE__*/function (_DeferredMedia) {
  _inherits(ProductGalleryDeferredMedia, _DeferredMedia);
  var _super10 = _createSuper(ProductGalleryDeferredMedia);
  function ProductGalleryDeferredMedia() {
    var _this22;
    _classCallCheck(this, ProductGalleryDeferredMedia);
    _this22 = _super10.call(this);
    var poster = _this22.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return _possibleConstructorReturn(_this22);
    if (_this22.dataset.autoplaySetting && _this22.dataset.autoplaySetting == "true") {
      window.addEventListener('DOMContentLoaded', _this22.loadContent.bind(_assertThisInitialized(_this22)));
    } else {
      poster.addEventListener('click', _this22.loadContent.bind(_assertThisInitialized(_this22)));
    }
    return _this22;
  }
  _createClass(ProductGalleryDeferredMedia, [{
    key: "loadContent",
    value: function loadContent() {
      _get(_getPrototypeOf(ProductGalleryDeferredMedia.prototype), "loadContent", this).call(this);
      if (this.dataset.autoplaySetting && this.dataset.autoplaySetting == "true") {
        if (this.querySelector('video')) {
          var video = this.querySelector('video');
          setTimeout(function () {
            video.play();
          }, 200);
        }
      }
    }
  }]);
  return ProductGalleryDeferredMedia;
}(DeferredMedia);
customElements.define('product-gallery-deferred-media', ProductGalleryDeferredMedia);
var SliderComponent = /*#__PURE__*/function (_HTMLElement7) {
  _inherits(SliderComponent, _HTMLElement7);
  var _super11 = _createSuper(SliderComponent);
  function SliderComponent() {
    var _this23;
    _classCallCheck(this, SliderComponent);
    _this23 = _super11.call(this);
    _this23.slider = _this23.querySelector('[id^="Slider-"]');
    _this23.sliderItems = _this23.slider.querySelectorAll(':scope > [id^="Slide-"]');
    _this23.enableSliderLooping = false;
    _this23.sliderItemsToShow = Array.from(_this23.sliderItems).filter(function (element) {
      return element.clientWidth > 0;
    });
    _this23.sliderControlButtons = _this23.querySelectorAll('.slider-counter__link');
    _this23.progressSlider = _this23.querySelector(':scope .progress-slider');
    _this23.enableSliderLooping = false;
    _this23.currentPageElement = Array.from(_this23.querySelectorAll('.slider-counter--current')).filter(function (element) {
      return element.clientHeight > 0;
    })[0];
    _this23.pageTotalElement = Array.from(_this23.querySelectorAll('.slider-counter--total')).filter(function (element) {
      return element.clientHeight > 0;
    })[0];
    var prevButtons = Array.from(_this23.querySelectorAll('button[name="previous"]')).filter(function (button) {
      return button.clientHeight > 0;
    });
    var sliderButtons = prevButtons.concat(Array.from(_this23.querySelectorAll('button[name="next"]')).filter(function (button) {
      return button.clientHeight > 0;
    }));
    if (sliderButtons.length > 2) {
      _this23.locateCorrectSliderButtons(sliderButtons);
    } else {
      _this23.prevButton = sliderButtons.filter(function (sliderButton) {
        return sliderButton.name === 'previous';
      })[0];
      _this23.nextButton = sliderButtons.filter(function (sliderButton) {
        return sliderButton.name === 'next';
      })[0];
    }
    if (!_this23.slider || !_this23.nextButton) return _possibleConstructorReturn(_this23);
    _this23.initPages();
    var resizeObserver = new ResizeObserver(function (entries) {
      return _this23.initPages();
    });
    resizeObserver.observe(_this23.slider);
    _this23.slider.addEventListener('scroll', _this23.update.bind(_assertThisInitialized(_this23)));
    if (_this23.prevButton) _this23.prevButton.addEventListener('click', _this23.onButtonClick.bind(_assertThisInitialized(_this23)));
    if (_this23.nextButton) _this23.nextButton.addEventListener('click', _this23.onButtonClick.bind(_assertThisInitialized(_this23)));
    _this23.sliderControlButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        return _this23.onProgressBarButtonClick(event);
      });
    });
    return _this23;
  }
  _createClass(SliderComponent, [{
    key: "locateCorrectSliderButtons",
    value: function locateCorrectSliderButtons(sliderButtons) {
      var _this24 = this;
      sliderButtons.forEach(function (sliderButton) {
        var buttonParent = sliderButton.closest('slider-component') || sliderButton.closest('slideshow-component') || sliderButton.closest('gallery-component');
        if (buttonParent === _this24) {
          if (sliderButton.name === 'previous') {
            _this24.prevButton = sliderButton;
          } else if (sliderButton.name === 'next') {
            _this24.nextButton = sliderButton;
          }
        }
      });
    }
  }, {
    key: "initPages",
    value: function initPages() {
      if (this.sliderItemsToShow.length < 2) return;
      this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
      this.slidesPerPage = Math.round((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
      this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;

      // is there a progress slider present within this instance of slider, and does the amount of progress lines within it not match the total pages?

      if (this.progressSlider) {
        if (this.totalPages <= 1) {
          this.progressSlider.remove();
        } else {
          if (this.querySelectorAll('.slider-counter__link'.length !== this.totalPages) || !this.querySelector('.slider-counter__link--active') || !this.querySelector('.gallery-counter__link--active')) {
            debounce(this.regulateProgressSlider(), 500);
          }
        }
      } else {
        this.update();
      }
    }
  }, {
    key: "resetPages",
    value: function resetPages() {
      this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
      this.initPages();
    }
  }, {
    key: "update",
    value: function update() {
      var previousPage = this.currentPage;
      this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;
      if (this.currentPageElement && this.pageTotalElement) {
        this.currentPageElement.textContent = this.currentPage;
        if (this.currentPage > this.sliderControlButtons.length) {
          this.totalPages = this.currentPage;
          if (this.progressSlider && this.recursionCap == false) {
            this.regulateProgressSlider();
            this.recursionCap = false;
          }
        }
        this.pageTotalElement.textContent = this.totalPages;
      }
      if (this.sliderControlButtons.length) {
        this.sliderControlButtons.forEach(function (link) {
          link.classList.remove('slider-counter__link--active');
          link.removeAttribute('aria-current');
        });
        if (this.sliderControlButtons[this.currentPage - 1] != undefined) {
          this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
          this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
        }
      }
      if (this.currentPage != previousPage) {
        this.dispatchEvent(new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1]
          }
        }));
      }
      if (this.enableSliderLooping) return;
      if (this.localName != "gallery-component") {
        if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
          this.prevButton.setAttribute('disabled', 'disabled');
        } else {
          this.prevButton.removeAttribute('disabled');
        }
        if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
          this.nextButton.setAttribute('disabled', 'disabled');
        } else {
          this.nextButton.removeAttribute('disabled');
        }
      }
    }
  }, {
    key: "isSlideVisible",
    value: function isSlideVisible(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
      return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var step = event.currentTarget.dataset.step || 1;
      this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + step * this.sliderItemOffset : this.slider.scrollLeft - step * this.sliderItemOffset;
      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }, {
    key: "onProgressBarButtonClick",
    value: function onProgressBarButtonClick(event) {
      event.preventDefault();
      var currentIndex = Array.from(this.sliderControlButtons).indexOf(event.currentTarget);
      if (currentIndex !== -1) {
        this.slider.scrollTo({
          left: currentIndex * this.sliderItemOffset
        });
        this.update();
      }
    }
  }, {
    key: "regulateProgressSlider",
    value: function regulateProgressSlider() {
      var _this25 = this;
      var progressSliderDifference = this.totalPages - this.querySelectorAll('.slider-counter__link').length;
      var progressSliderContainer = this.querySelector('.gallery__control-wrapper');
      if (progressSliderDifference > 0 && this.querySelectorAll('.slider-counter__link').length > 0) {
        for (var i = 0; i < progressSliderDifference; i++) {
          var progressSliderItemTemplate = this.querySelector('.slider-counter__link').outerHTML;
          progressSliderContainer.innerHTML += progressSliderItemTemplate;
        }
      } else if (progressSliderDifference < 0) {
        for (var _i = 0; _i < progressSliderDifference * -1; _i++) {
          var progressSliderItems = progressSliderContainer.querySelectorAll('.slider-counter__link');
          progressSliderItems[0].remove();
        }
      }
      this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
      this.sliderControlButtons.forEach(function (line) {
        line.style.width = "".concat(100 / _this25.totalPages, "%");
      });
      this.recursionCap = true;
      this.update();
    }
  }]);
  return SliderComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('slider-component', SliderComponent);
var GalleryComponent = /*#__PURE__*/function (_HTMLElement8) {
  _inherits(GalleryComponent, _HTMLElement8);
  var _super12 = _createSuper(GalleryComponent);
  function GalleryComponent() {
    var _this26;
    _classCallCheck(this, GalleryComponent);
    _this26 = _super12.call(this);
    _this26.slider = _this26.querySelector('[id^="Slider-"]');
    _this26.sliderItems = _this26.slider.querySelectorAll(':scope > [id^="Slide-"]');
    _this26.usage = _this26.dataset.usage;
    _this26.slider.scrollLeft = 0;
    _this26.sliderFirstItemNode = _this26.querySelector('.slider__slide:not(.hidden)');
    _this26.sliderItemsToShow = Array.from(_this26.sliderItems).filter(function (element) {
      return element.clientWidth > 0;
    });
    _this26.sliderLastItem = _this26.sliderItemsToShow[_this26.sliderItemsToShow.length - 1];
    _this26.currentPage = _this26.sliderLastItem ? Math.round(_this26.slider.scrollLeft / _this26.sliderLastItem.clientWidth) + 1 : 1;
    _this26.gallerySlideshowViewportLength = _this26.querySelector(':scope .product__media-list').clientWidth * (_this26.querySelectorAll(':scope .gallery__controls .gallery-counter__link').length / 2);
    _this26.galleryPrevButton = _this26.querySelector('.slider-button--prev');
    _this26.galleryNextButton = _this26.querySelector('.slider-button--next');
    _this26.currentPageElement = Array.from(_this26.querySelectorAll('.slider-counter--current')).filter(function (element) {
      return element.clientHeight > 0;
    })[0];
    _this26.galleryControlWrapper = _this26.querySelector('.gallery-buttons');
    _this26.galleryControlLinksArray = Array.from(_this26.querySelectorAll('.gallery-counter__link')).filter(function (button) {
      return button.clientHeight > 0;
    });
    _this26.galleryControlLinksArray.forEach(function (link) {
      return link.addEventListener('click', _this26.updateActiveImage.bind(_assertThisInitialized(_this26)));
    });
    _this26.slider.addEventListener('scroll', _this26.updateActiveGalleryControl.bind(_assertThisInitialized(_this26)));
    _this26.setGalleryControlListeners(_this26.galleryPrevButton, _this26.galleryNextButton);
    if (_this26.usage === strings.usages.mainProduct) _this26.updateActiveGalleryControl();
    _this26.manageGalleryControls(_this26.sliderItemsToShow.length < 2);
    return _this26;
  }
  _createClass(GalleryComponent, [{
    key: "manageGalleryControls",
    value: function manageGalleryControls(hideOrShow) {
      this.galleryNextButton.classList.toggle('hidden', hideOrShow);
      this.galleryPrevButton.classList.toggle('hidden', hideOrShow);
    }
  }, {
    key: "setGalleryControlListeners",
    value: function setGalleryControlListeners(previous, next) {
      previous.addEventListener('click', this.previousGalleryImage.bind(this));
      next.addEventListener('click', this.nextGalleryImage.bind(this));
      if (this.currentPage == 1) {
        previous.setAttribute('disabled', 'disabled');
      } else if (this.currentPage == this.sliderItems.length) {
        next.setAttribute('disabled', 'disabled');
      }
    }
  }, {
    key: "updateGallery",
    value: function updateGallery(currentVariant) {
      var variantColourway = currentVariant.option1.replace(' ', '-');
      var galleryMediaArray = Array.from(this.querySelectorAll('.product__media-item'));
      var variantImageCount = 0;
      if (currentVariant.featured_media.alt.includes(currentVariant.option1)) {
        galleryMediaArray.forEach(function (media) {
          var mediaIds = media.id.split(' ');
          mediaIds.forEach(function (id) {
            id === variantColourway ? (media.classList.remove('hidden'), variantImageCount += 1) : media.classList.add('hidden');
          });
        });
      }
      this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) {
        return element.clientWidth > 0;
      });
      this.sliderLastItem = this.sliderItemsToShow[this.sliderItemsToShow.length - 1];
      this.sliderFirstItemNode = this.querySelector('.slider__slide:not(.hidden)');
      this.slider.scrollLeft = 0;
      if (this.usage === strings.usages.mainProduct) {
        this.updateGalleryControlQuantity(variantImageCount);
        this.updateActiveGalleryControl();
      }
    }
  }, {
    key: "updateGalleryControlQuantity",
    value: function updateGalleryControlQuantity(variantImageCount) {
      var _this27 = this;
      var galleryControlsContainer = Array.from(this.querySelectorAll('.gallery__control-wrapper')).filter(function (element) {
        return element.clientWidth > 0;
      })[0];
      var currentGalleryControls = galleryControlsContainer.children;
      var galleryControlTemplate = currentGalleryControls[0].outerHTML;
      var galleryControlsDifference = variantImageCount - currentGalleryControls.length;
      if (galleryControlsDifference !== 0 || galleryControlsContainer.closest('.gallery-thumbnail-slider')) {
        if (galleryControlsDifference > 0) {
          for (var i = 0; i < galleryControlsDifference; i++) {
            galleryControlsContainer.innerHTML += galleryControlTemplate;
          }
        } else if (galleryControlsDifference < 0) {
          var quantityToDelete = galleryControlsDifference * -1;
          for (var _i2 = 0; _i2 < quantityToDelete; _i2++) {
            currentGalleryControls[0].remove();
          }
        }
        currentGalleryControls.forEach(function (galleryControl, index) {
          galleryControl.setAttribute('aria-label', "".concat(galleryControlsContainer.dataset.langstringLoad, " ").concat(index + 1, " ").concat(galleryControlsContainer.dataset.langstringOf, " ").concat(currentGalleryControls.length));
          galleryControl.addEventListener('click', _this27.updateActiveImage.bind(_this27));
          if (galleryControlsContainer.closest('.gallery-thumbnail-slider')) {
            var newThumbnailMedia = _this27.sliderItemsToShow[index].querySelector('img').src.replace('width=1500', 'width=50');
            galleryControl.querySelector('img').src = newThumbnailMedia;
          }
          if (galleryControlsContainer.closest('.progress-slider')) {
            _this27.pageTotalElement.innerText = "".concat(currentGalleryControls.length);
            _this27.totalPages = currentGalleryControls.length;
            galleryControl.style.width = "".concat(100 / currentGalleryControls.length, "%");
          }
        });
        this.galleryControlLinksArray = Array.from(currentGalleryControls);
        this.updateActiveGalleryControl();
      }
    }
  }, {
    key: "updateActiveGalleryControl",
    value: function updateActiveGalleryControl() {
      this.currentPage = this.sliderLastItem ? Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1 : 1;
      if (!this.galleryControlLinksArray.length) return;
      this.galleryControlLinksArray.forEach(function (link) {
        link.classList.remove('gallery-counter__link--active');
        link.classList.remove('slider-counter__link--active');
        link.removeAttribute('aria-current');
      });
      this.galleryControlLinksArray[this.currentPage - 1].classList.add('gallery-counter__link--active');
      this.galleryControlLinksArray[this.currentPage - 1].setAttribute('aria-current', true);
    }
  }, {
    key: "updateActiveImage",
    value: function updateActiveImage(event) {
      event.preventDefault();
      var slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.galleryControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }, {
    key: "nextGalleryImage",
    value: function nextGalleryImage() {
      event.preventDefault();
      if (this.currentPage < this.sliderItemsToShow.length) {
        event.currentTarget.removeAttribute('disabled');
        this.galleryPrevButton.removeAttribute('disabled');
        this.slider.scrollLeft = this.slider.scrollLeft + this.slider.clientWidth;
        this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;
        this.currentPage == this.sliderItemsToShow.length - 1 ? event.currentTarget.setAttribute('disabled', 'disabled') : event.currentTarget.removeAttribute('disabled');
      } else {}
    }
  }, {
    key: "previousGalleryImage",
    value: function previousGalleryImage() {
      event.preventDefault();
      if (this.slider.scrollLeft !== 0) {
        this.galleryNextButton.removeAttribute('disabled');
        this.slider.scrollLeft = this.slider.scrollLeft - this.slider.clientWidth;
        this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;
        this.currentPage == 2 ? event.currentTarget.setAttribute('disabled', 'disabled') : event.currentTarget.removeAttribute('disabled');
      } else {}
    }
  }]);
  return GalleryComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('gallery-component', GalleryComponent);
var SlideshowComponent = /*#__PURE__*/function (_SliderComponent) {
  _inherits(SlideshowComponent, _SliderComponent);
  var _super13 = _createSuper(SlideshowComponent);
  function SlideshowComponent() {
    var _this28;
    _classCallCheck(this, SlideshowComponent);
    _this28 = _super13.call(this);
    _this28.sliderControlWrapper = _this28.querySelector('.slider-buttons');
    // back to this.enableSliderLooping = true - previously changed to
    // this.enableSliderLooping = this.querySelector('.slideshow__autoplay');
    // to allow for non looping slides when not autoplay but issues when no autoplay - slideshow still loops
    _this28.enableSliderLooping = true;
    if (!_this28.sliderControlWrapper) return _possibleConstructorReturn(_this28);
    _this28.sliderFirstItemNode = _this28.slider.querySelector('.slideshow__slide');
    if (_this28.sliderItemsToShow.length > 0) _this28.currentPage = 1;
    _this28.sliderControlLinksArray = Array.from(_this28.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    _this28.sliderControlLinksArray.forEach(function (link) {
      return link.addEventListener('click', _this28.linkToSlide.bind(_assertThisInitialized(_this28)));
    });
    _this28.slider.addEventListener('scroll', _this28.setSlideVisibility.bind(_assertThisInitialized(_this28)));
    _this28.setSlideVisibility();
    if (_this28.slider.getAttribute('data-autoplay') === 'true') _this28.setAutoPlay();
    return _this28;
  }
  _createClass(SlideshowComponent, [{
    key: "setAutoPlay",
    value: function setAutoPlay() {
      this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
      this.autoplaySpeed = this.slider.dataset.speed * 1000;
      this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
      this.addEventListener('mouseover', this.focusInHandling.bind(this));
      this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
      this.addEventListener('focusin', this.focusInHandling.bind(this));
      this.addEventListener('focusout', this.focusOutHandling.bind(this));
      this.play();
      this.autoplayButtonIsSetToPlay = true;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "onButtonClick", this).call(this, event);
      var isFirstSlide = this.currentPage === 1;
      var isLastSlide = this.currentPage === this.sliderItemsToShow.length;
      if (!isFirstSlide && !isLastSlide) return;
      if (isFirstSlide && event.currentTarget.name === 'previous') {
        this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
      } else if (isLastSlide && event.currentTarget.name === 'next') {
        this.slideScrollPosition = 0;
      }
      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "update", this).call(this);
      this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
      //previously commented out to allow for non looping slides when not autoplay - but interfers with looping slides - 
      this.prevButton.removeAttribute('disabled');
      if (!this.sliderControlButtons.length) return;
      this.sliderControlButtons.forEach(function (link) {
        link.classList.remove('slider-counter__link--active');
        link.removeAttribute('aria-current');
      });
      if (this.sliderControlButtons[this.currentPage - 1] != undefined) {
        this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
        this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
      }
    }
  }, {
    key: "autoPlayToggle",
    value: function autoPlayToggle() {
      this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
      this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
    }
  }, {
    key: "focusOutHandling",
    value: function focusOutHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
      this.play();
    }
  }, {
    key: "focusInHandling",
    value: function focusInHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
        this.play();
      } else if (this.autoplayButtonIsSetToPlay) {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.slider.setAttribute('aria-live', 'off');
      clearInterval(this.autoplay);
      this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.slider.setAttribute('aria-live', 'polite');
      clearInterval(this.autoplay);
    }
  }, {
    key: "togglePlayButtonState",
    value: function togglePlayButtonState(pauseAutoplay) {
      if (pauseAutoplay) {
        this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
      } else {
        this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
      }
    }
  }, {
    key: "autoRotateSlides",
    value: function autoRotateSlides() {
      var slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }, {
    key: "setSlideVisibility",
    value: function setSlideVisibility() {
      var _this29 = this;
      this.sliderItemsToShow.forEach(function (item, index) {
        var button = item.querySelector('a');
        if (index === _this29.currentPage - 1) {
          if (button) button.removeAttribute('tabindex');
          item.setAttribute('aria-hidden', 'false');
          item.removeAttribute('tabindex');
        } else {
          if (button) button.setAttribute('tabindex', '-1');
          item.setAttribute('aria-hidden', 'true');
          item.setAttribute('tabindex', '-1');
        }
      });
    }
  }, {
    key: "linkToSlide",
    value: function linkToSlide(event) {
      event.preventDefault();
      var slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }]);
  return SlideshowComponent;
}(SliderComponent);
customElements.define('slideshow-component', SlideshowComponent);
var VariantPicker = /*#__PURE__*/function (_HTMLElement9) {
  _inherits(VariantPicker, _HTMLElement9);
  var _super14 = _createSuper(VariantPicker);
  function VariantPicker() {
    var _this30;
    _classCallCheck(this, VariantPicker);
    _this30 = _super14.call(this);

    //base properties
    _this30.usage = _this30.dataset.usage;
    _this30.stickyAtcContainer = document.querySelector('sticky-atc');
    _this30.fieldsets = Array.from(_this30.querySelectorAll('fieldset'));
    _this30.options = _this30.getSelectedOptions();
    _this30.colourLangstring = _this30.dataset.colourLangstring;
    _this30.showMoreButton = _this30.querySelector('#product-form__show-more-label');
    _this30.showLessButton = _this30.querySelector('#product-form__show-less-label');

    //Set properties for associated components

    switch (_this30.usage) {
      case strings.usages.mainProduct:
        _this30.galleryComponent = document.querySelector('gallery-component');
        _this30.infoBadgesContainer = document.querySelectorAll('info-badges');
        break;
      case 'quick-view':
        _this30.galleryComponent = document.querySelector('quick-view gallery-component');
        break;
    }

    //listeners
    _this30.addEventListener('change', _this30.onVariantChange);
    if (_this30.showMoreButton) _this30.showMoreButton.addEventListener('click', _this30.handleShowMoreClick.bind(_assertThisInitialized(_this30)));
    if (_this30.showLessButton) _this30.showLessButton.addEventListener('click', _this30.handleShowLessClick.bind(_assertThisInitialized(_this30)));

    //Method calls
    _this30.updateMasterId();
    return _this30;
  }
  _createClass(VariantPicker, [{
    key: "onVariantChange",
    value: function onVariantChange(event) {
      var _this31 = this;
      //acquire newly selected variant, check against product variants, evaluate this.currentVariant and then update atc input value
      this.options = this.getSelectedOptions();
      this.updateMasterId();
      // this.updateVariantInput(); 
      document.querySelector('sibling-selector') ? document.querySelector('sibling-selector').storeOption(this.currentVariant.option2) : null;
      if (event.target.closest('fieldset').dataset.option === this.colourLangstring) this.updateOptionAvailability(event);
      if (this.stickyAtcContainer) this.stickyAtcContainer.updateOptionsAndPrice(this.currentVariant);

      //Check if newly selected  variant exists. Continue to update picker elements if it does
      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateVariantInput();
        this.renderProductInfo(); //update price and stock info on main product instance only
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
        //Native methods updating unused components - can be removed?
        this.updateShareUrl();
        this.updatePickupAvailability();
        this.removeErrorMessage();

        //Updating other related components such as gallery, badges and urls
        switch (this.usage) {
          case strings.usages.mainProduct || 'quick-view':
            //Update  variant picker inputs/labels for availability and option names etc
            this.updateVariantAvailability(this.currentVariant);
            this.updateColourLabel(event);
            if (event.target.name.split('-')[0] === this.colourLangstring) this.galleryComponent.updateGallery(this.currentVariant);
            this.updateURL();
            if (this.infoBadgesContainer) this.infoBadgesContainer.forEach(function (infoBadgeContainer) {
              infoBadgeContainer.dataset.variant = _this31.currentVariant.title;
              infoBadgeContainer.querySelectorAll('.badge').forEach(function (badge) {
                badge.dataset.variant = _this31.currentVariant.title;
              });
              infoBadgeContainer.toggleBadge(_this31.currentVariant);
            });
            this.updateSizeGuide(this.currentVariant);
            break;
        }
      }
    }
  }, {
    key: "updateVariantAvailability",
    value: function updateVariantAvailability(currentVariant) {
      if (currentVariant.available == true) {
        document.querySelector('.product .price__badge-sold-out').style.display = "none";
        document.querySelector('.product .price__badge-in-stock').style.display = "block";
      } else {
        document.querySelector('.product .price__badge-sold-out').style.display = "block";
        document.querySelector('.product .price__badge-in-stock').style.display = "none";
      }
    }
  }, {
    key: "updateSizeGuide",
    value: function updateSizeGuide(selectedVariant) {
      var selectedSizeString = document.querySelector('.size-guide__selected-size');
      selectedSizeString.innerHTML = selectedVariant.option2;
    }
  }, {
    key: "updateVariantInput",
    value: function updateVariantInput() {
      var _this32 = this;
      //Simplify with removal of addons. Unknown purpose of new dispatchEvent.
      if (this.usage === strings.usages.mainProduct) {
        var productForms = document.querySelectorAll("#product-form-".concat(this.dataset.section, ", #product-form-installment"));
        productForms.forEach(function (productForm) {
          // extra level of logic in place to ensure that addons ATCs within PDPs aren't changed (due to query selector all above when usage is main-product)
          var input = productForm.querySelector('input[name="id"]');
          if (_this32.currentVariant) input.value = _this32.currentVariant.id;
          //input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      } else {
        //find my atc
        var targetContainer = this.closest(this.usage) || this.closest(".".concat(this.usage));
        var productForm = targetContainer.querySelector("#product-form-".concat(this.dataset.section));
        var input = productForm.querySelector('input[name="id"]');
        input.value = this.currentVariant.id;
        input.setAttribute('data-option-name', this.currentVariant.option1);
        input.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      }
    }
  }, {
    key: "getSelectedOptions",
    value: function getSelectedOptions() {
      var options = this.fieldsets.map(function (fieldset) {
        return Array.from(fieldset.querySelectorAll('.product-form__variant-input')).find(function (fieldsetChild) {
          return fieldsetChild.selected || fieldsetChild.checked;
        }).value;
      });
      return options;
    }
  }, {
    key: "updateMasterId",
    value: function updateMasterId() {
      var _this33 = this;
      this.currentVariant = this.getVariantData().find(function (variant) {
        return !variant.options.map(function (option, index) {
          return _this33.options[index] === option;
        }).includes(false);
      });
    }
  }, {
    key: "getVariantData",
    value: function getVariantData() {
      //Can this just be used to populate a prop in the constructor which is then referenced throughout class lifespan?
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }, {
    key: "updateOptionAvailability",
    value: function updateOptionAvailability(event) {
      this.fieldsetsToUpdate = Array.from(this.querySelectorAll("fieldset:not([id=\"".concat(event.target.closest('fieldset').id, "\"])")));
      this.fieldsetsToUpdate.forEach(function (fieldset) {
        fieldset.querySelectorAll('label').forEach(function (label) {
          label.classList.remove('product-form__option--unavailable');
        });
      });
      this.regulateOosOptions(event);
      this.regulateUnavailableOptions(event);
    }
  }, {
    key: "regulateOosOptions",
    value: function regulateOosOptions(event) {
      var _this34 = this;
      this.variantData.forEach(function (variant) {
        if (!variant.available && variant.option1 === event.target.value) {
          variant.options.forEach(function (option) {
            _this34.fieldsetsToUpdate.forEach(function (fieldset) {
              if (fieldset.querySelector("[value=\"".concat(option, "\"]"))) {
                fieldset.querySelector("[value=\"".concat(option, "\"]")).nextElementSibling ? fieldset.querySelector("[value=\"".concat(option, "\"]")).nextElementSibling.classList.add('product-form__option--unavailable') : fieldset.querySelector("[value=\"".concat(option, "\"]")).classList.add('product-form__option--unavailable');
              }
            });
          });
        }
      });
    }
  }, {
    key: "regulateUnavailableOptions",
    value: function regulateUnavailableOptions(event) {
      var currentVariants = this.variantData.filter(function (variant) {
        return variant.option1 === event.target.value;
      });
      var currentAvailableOption2s = currentVariants.map(function (variant) {
        return variant.option2;
      });
      this.fieldsetsToUpdate.forEach(function (fieldset) {
        Array.from(fieldset.querySelectorAll('.product-form__variant-input')).forEach(function (variantPickerOption) {
          if (!currentAvailableOption2s.includes(variantPickerOption.value)) {
            fieldset.querySelector("[value=\"".concat(variantPickerOption.value, "\"]")).nextElementSibling ? fieldset.querySelector("[value=\"".concat(variantPickerOption.value, "\"]")).nextElementSibling.classList.add('product-form__option--unavailable') : fieldset.querySelector("[value=\"".concat(variantPickerOption.value, "\"]")).classList.add('product-form__option--unavailable');
          }
        });
      });
    }
  }, {
    key: "updateColourLabel",
    value: function updateColourLabel(event) {
      var fieldset = event.target.closest("fieldset");
      if (this.colourLangstring === fieldset.dataset.option) {
        var colourLabel = fieldset.querySelector('.form__label');
        colourLabel.querySelector('.form__label--value').innerText = "".concat(this.options[0]);
      }
    }
  }, {
    key: "updateURL",
    value: function updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({}, '', "".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateShareUrl",
    value: function updateShareUrl() {
      var shareButton = document.getElementById("Share-".concat(this.dataset.section));
      if (!shareButton) return;
      shareButton.updateUrl("".concat(window.shopUrl).concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updatePickupAvailability",
    value: function updatePickupAvailability() {
      var pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;
      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }
  }, {
    key: "removeErrorMessage",
    value: function removeErrorMessage() {
      var section = this.closest('section');
      if (!section) return;
      var productForm = section.querySelector('product-form');
      if (productForm) productForm.handleErrorMessage();
    }
  }, {
    key: "renderProductInfo",
    value: function renderProductInfo() {
      var _this35 = this;
      if (this.usage === strings.usages.mainProduct) {
        fetch("".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id, "&section_id=").concat(this.dataset.section)).then(function (response) {
          return response.text();
        }).then(function (responseText) {
          var id = "price-".concat(_this35.dataset.section);
          var html = new DOMParser().parseFromString(responseText, 'text/html');
          var destinations = Array.from(document.querySelectorAll("#".concat(id)));
          var source = html.getElementById(id);
          destinations.forEach(function (destination) {
            if (source && destination) destination.innerHTML = source.innerHTML;
            if (destination) destination.classList.remove('visibility-hidden');
          });
        });
      }
    }
  }, {
    key: "toggleAddButton",
    value: function toggleAddButton() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var text = arguments.length > 1 ? arguments[1] : undefined;
      var modifyClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var productForm;
      if (this.usage === strings.usages.mainProduct) {
        productForm = document.getElementById("product-form-".concat(this.dataset.section));
      } else {
        var targetContainer = this.closest(this.usage) || this.closest(".".concat(this.usage));
        productForm = targetContainer.querySelector('form');
      }
      if (!productForm) return;
      productForm.querySelectorAll('[name="add"]').forEach(function (addButton) {
        var addButtonText = addButton.querySelector('span');
        if (!addButton) return;
        if (disable) {
          addButton.setAttribute('disabled', 'disabled');
          if (text) addButtonText.textContent = text;
        } else {
          addButton.removeAttribute('disabled');
          addButtonText.textContent = window.variantStrings.addToCart;
        }
        if (!modifyClass) return;
      });
    }
  }, {
    key: "setUnavailable",
    value: function setUnavailable() {
      var button;
      if (this.usage === strings.usages.mainProduct) {
        button = document.getElementById("product-form-".concat(this.dataset.section));
        var prices = document.querySelectorAll("#price-".concat(this.dataset.section));
        if (prices) {
          prices.forEach(function (price) {
            price.classList.add('visibility-hidden');
          });
        }
      } else {
        var targetContainer = this.closest(this.usage) || this.closest(".".concat(this.usage));
        button = targetContainer.querySelector('form');
      }
      button.querySelectorAll('[name="add"]').forEach(function (addButton) {
        if (!addButton) return;
        var addButtonText = addButton.querySelector('[name="add"] > span');
        addButtonText.textContent = window.variantStrings.unavailable;
      });
    }
  }, {
    key: "handleShowMoreClick",
    value: function handleShowMoreClick(event) {
      this.overThresholdInputs = Array.from(event.target.closest('fieldset').children).filter(function (elem) {
        return elem.classList.value.includes('hidden');
      });
      this.overThresholdInputs.forEach(function (input) {
        return input.classList.remove('hidden');
      });
      this.showMoreButton.classList.add('hidden');
    }
  }, {
    key: "handleShowLessClick",
    value: function handleShowLessClick(event) {
      this.showLessButton.classList.add('hidden');
      this.overThresholdInputs.forEach(function (input) {
        return input.classList.add('hidden');
      });
      this.showMoreButton.classList.remove('hidden');
    }
  }]);
  return VariantPicker;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('variant-picker', VariantPicker);
var FreeShipping = /*#__PURE__*/function (_HTMLElement10) {
  _inherits(FreeShipping, _HTMLElement10);
  var _super15 = _createSuper(FreeShipping);
  function FreeShipping() {
    var _this36;
    _classCallCheck(this, FreeShipping);
    _this36 = _super15.call(this);
    _this36.remainder = _this36.getElementsByClassName('fsn__remainder')[0];
    _this36.threshold = parseInt(_this36.remainder.dataset.threshold);
    _this36.beforeThresholdMessage = _this36.children[0];
    _this36.afterThresholdMessage = _this36.children[1];
    _this36.progressBarMode = _this36.dataset.progress;
    return _this36;
  }
  _createClass(FreeShipping, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      this.updateAmount(name, parseInt(oldValue), parseInt(newValue));
    }
  }, {
    key: "updateAmount",
    value: function updateAmount(name, oldValue, newValue) {
      var newTotal = newValue;
      var newRemainder = this.threshold - newTotal;
      this.remainder.innerText = Shopify.formatMoney(newRemainder, Shopify.moneyFormat);
      this.handleMessageFlip(newRemainder);
      if (this.progressBarMode) this.updateProgressBar(newRemainder);
    }
  }, {
    key: "updateProgressBar",
    value: function updateProgressBar(newRemainder) {
      this.progressBar = this.querySelector(".fsn__progress-outer");
      var newProg = (this.threshold - newRemainder) / this.threshold * 100;
      this.progressBar.firstElementChild.style["width"] = "".concat(newProg, "%");
    }
  }, {
    key: "handleMessageFlip",
    value: function handleMessageFlip(newRemainder) {
      if (newRemainder > 0 && !this.afterThresholdMessage.classList.contains("hidden")) {
        this.afterThresholdMessage.classList.add("hidden");
        this.beforeThresholdMessage.classList.remove("hidden");
      } else if (newRemainder <= 0 && !this.beforeThresholdMessage.classList.contains("hidden")) {
        this.beforeThresholdMessage.classList.add("hidden");
        this.afterThresholdMessage.classList.remove("hidden");
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-cart-total'];
    }
  }]);
  return FreeShipping;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('free-shipping-notice', FreeShipping);
var GridToggle = /*#__PURE__*/function (_HTMLElement11) {
  _inherits(GridToggle, _HTMLElement11);
  var _super16 = _createSuper(GridToggle);
  function GridToggle() {
    var _this37;
    _classCallCheck(this, GridToggle);
    _this37 = _super16.call(this);
    _this37.toggle = _assertThisInitialized(_this37);
    _this37.increase = _this37.querySelectorAll('[data-action="increase"]')[0];
    _this37.decrease = _this37.querySelectorAll('[data-action="decrease"]')[0];
    _this37.buttons = Array.from(_this37.getElementsByClassName("grid__toggle-button"));
    _this37.breakpoints = Shopify.breakpoints;
    _this37.currentBreakpoint = _this37.identifyBreakpoint(_this37.breakpoints);
    _this37.currentProductPerRow = _this37.dataset["".concat(_this37.currentBreakpoint, "Products")];
    _this37.setUpToggle();
    _this37.toggle.addEventListener('click', _this37.handleToggleClick.bind(_assertThisInitialized(_this37)));
    window.addEventListener('resize', debounce(_this37.resetToggle.bind(_assertThisInitialized(_this37)), 300));
    return _this37;
  }
  _createClass(GridToggle, [{
    key: "handleToggleClick",
    value: function handleToggleClick(event) {
      this.grid = document.getElementById('product-grid');
      var clicked = event.target;
      if (!clicked.classList.contains('grid__toggle-button--active') && clicked.classList.contains('grid__toggle-button')) {
        var bp = this.currentBreakpoint === "mobile" ? "" : "-".concat(this.currentBreakpoint);
        var prevVal = this.getElementsByClassName('grid__toggle-button--active')[0].dataset.value.toString();
        var newVal = clicked.dataset.value.toString();
        this.buttons.forEach(function (button) {
          return button.classList.remove('grid__toggle-button--active');
        });
        clicked.classList.add('grid__toggle-button--active');
        this.grid.classList.replace("grid--".concat(prevVal, "-col").concat(bp), "grid--".concat(newVal, "-col").concat(bp));
      }
    }
  }, {
    key: "identifyBreakpoint",
    value: function identifyBreakpoint(breakpoints) {
      if (window.innerWidth <= breakpoints.mobile) {
        return "mobile";
      } else if (window.innerWidth > breakpoints.mobile && window.innerWidth <= breakpoints.tablet) {
        return "tablet";
      } else {
        return "desktop";
      }
    }
  }, {
    key: "setUpToggle",
    value: function setUpToggle() {
      switch (this.currentBreakpoint) {
        case "mobile":
          this.decrease.setAttribute('data-value', 1);
          this.increase.setAttribute('data-value', 2);
          break;
        case "tablet":
          this.decrease.setAttribute('data-value', 2);
          this.increase.setAttribute('data-value', 3);
          break;
        case "desktop":
          this.decrease.setAttribute('data-value', 3);
          this.increase.setAttribute('data-value', 4);
        default:
          break;
      }
      this.setActive();
    }
  }, {
    key: "setActive",
    value: function setActive() {
      var _this38 = this;
      this.buttons.forEach(function (button) {
        return button.dataset.value === _this38.currentProductPerRow ? button.classList.add('grid__toggle-button--active') : null;
      });
    }
  }, {
    key: "resetToggle",
    value: function resetToggle() {
      this.currentBreakpoint = this.identifyBreakpoint(Shopify.breakpoints);
      this.setUpToggle();
    }
  }]);
  return GridToggle;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('grid-toggle', GridToggle);
var ProductCard = /*#__PURE__*/function (_HTMLElement12) {
  _inherits(ProductCard, _HTMLElement12);
  var _super17 = _createSuper(ProductCard);
  function ProductCard() {
    var _this39$image, _this39$image2;
    var _this39;
    _classCallCheck(this, ProductCard);
    _this39 = _super17.call(this);
    if (_this39.getElementsByClassName("card__product-json")[0]) {
      _this39.product = JSON.parse(_this39.getElementsByClassName("card__product-json")[0].innerText);
    }
    _this39.cardTitleLink = _this39.getElementsByClassName("card-information__text") ? _this39.getElementsByClassName("card-information__text")[0].firstElementChild : null;
    _this39.cardImageLink = _this39.getElementsByClassName("card__image-link") ? _this39.getElementsByClassName("card__image-link")[0] : null;
    _this39.image = _this39.querySelector(':scope .card__image');
    _this39.primaryImage = ((_this39$image = _this39.image) === null || _this39$image === void 0 ? void 0 : _this39$image.src) || null;
    _this39.secondImage = _this39.findSecondImage();
    (_this39$image2 = _this39.image) === null || _this39$image2 === void 0 ? void 0 : _this39$image2.addEventListener('mouseenter', function () {
      return _this39.imageChangeOnHover();
    });
    if (_this39.product) {
      if (_this39.dataset.hideSiblingSelector != "true") {
        _this39.loadSwatches(_this39.dataset.productTitle);
      }
      _this39.priceContainer = _this39.product.compare_at_price ? _this39.getElementsByClassName("price__sale")[0] : _this39.getElementsByClassName("price-item")[0];
    }
    _this39.infoBadges = _this39.querySelector('info-badges');
    _this39.swatchesHidden = true;
    _this39.quickViewButton = _this39.querySelector(':scope .quick-view__button');
    if (!_this39.closest('.shopify-section').parentElement.classList.contains('nosto_element')) {
      var _this39$cardTitleLink, _this39$cardImageLink;
      (_this39$cardTitleLink = _this39.cardTitleLink) === null || _this39$cardTitleLink === void 0 ? void 0 : _this39$cardTitleLink.addEventListener('click', function (event) {
        event.preventDefault();
        _this39.handleSelectItemEvent(_this39.cardTitleLink, _this39.product);
      });
      (_this39$cardImageLink = _this39.cardImageLink) === null || _this39$cardImageLink === void 0 ? void 0 : _this39$cardImageLink.addEventListener('click', function (event) {
        event.preventDefault();
        _this39.handleSelectItemEvent(_this39.cardTitleLink, _this39.product);
      });
    }
    return _this39;
  }
  _createClass(ProductCard, [{
    key: "handleSelectItemEvent",
    value: function () {
      var _handleSelectItemEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(link, product) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                Shopify.analytics.publish("select_item", {
                  "currency": "".concat(Shopify.currency.active),
                  "value": "".concat(product.price / 100),
                  "item_list_id": "",
                  "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
                  "affiliation": "".concat(product.vendor),
                  "items": [{
                    "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
                    "item_id": "".concat(product.variants[0].sku),
                    "item_name": "".concat(product.title),
                    "item_brand": "".concat(product.vendor),
                    "item_category": "".concat(product.type),
                    "item_variant": "".concat(product.title, " - ").concat(product.variants[0].title),
                    "affiliation": "".concat(product.vendor),
                    "price": "".concat(product.price / 100),
                    "currency": "".concat(Shopify.currency.active),
                    "quantity": 1,
                    "discount": 0,
                    "index": "".concat(this.closest('li.grid__item').dataset.position)
                  }]
                });
                window.location.href = link;
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function handleSelectItemEvent(_x6, _x7) {
        return _handleSelectItemEvent.apply(this, arguments);
      }
      return handleSelectItemEvent;
    }()
  }, {
    key: "loadSwatches",
    value: function () {
      var _loadSwatches = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(productHandle) {
        var _this40 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                fetch(window.Shopify.routes.root + "products/".concat(productHandle, "?sections=product-card-sibling-selector-swatches")).then(function (res) {
                  return res.json();
                }).then(function (response) {
                  var parser = new DOMParser();
                  var siblingSelector = parser.parseFromString(response['product-card-sibling-selector-swatches'], 'text/html');
                  siblingSelector = siblingSelector.querySelector('.card__swatch--container');
                  _this40.querySelector('.card-information__wrapper').appendChild(siblingSelector);
                }).then(function () {
                  _this40.initSwatches();
                });
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      function loadSwatches(_x8) {
        return _loadSwatches.apply(this, arguments);
      }
      return loadSwatches;
    }()
  }, {
    key: "initSwatches",
    value: function initSwatches() {
      var _this$swatchesContain;
      this.swatchesContainer = this.querySelector(".card__swatch--container");
      this.swatches = Array.from(this.getElementsByClassName('card__swatch'));
      (_this$swatchesContain = this.swatchesContainer) === null || _this$swatchesContain === void 0 ? void 0 : _this$swatchesContain.addEventListener('click', this.onSwatchClick.bind(this));
      if (this.swatches.length > 2) {
        var _this$querySelector;
        (_this$querySelector = this.querySelector(':scope .card__swatch--see-more')) === null || _this$querySelector === void 0 ? void 0 : _this$querySelector.addEventListener('click', this.toggleSwatchList.bind(this));
      }
    }
  }, {
    key: "findSecondImage",
    value: function findSecondImage() {
      if (this.querySelector('.card__swatch--selected')) {
        return this.querySelector('.card__swatch--selected').dataset.secondImage !== '' ? this.querySelector('.card__swatch--selected').dataset.secondImage : null;
      } else if (this.dataset.secondImage !== '') {
        return this.dataset.secondImage;
      } else {
        return this.image.src;
      }
    }
  }, {
    key: "imageChangeOnHover",
    value: function imageChangeOnHover() {
      var _this41 = this;
      // setTimeout is present only as a debounce so as to prevent image.src & image.srcset updates too fast resulting in network request cancellations in chrome
      if (this.secondImage != null && window.innerWidth > 998) {
        var _this$querySelector2;
        var itemImage = this.querySelector(':scope .media--hover-effect .card__image');
        setTimeout(function () {
          itemImage.src = _this41.secondImage;
          itemImage.srcset = _this41.secondImage;
        }, 100);
        (_this$querySelector2 = this.querySelector('.media--hover-effect img')) === null || _this$querySelector2 === void 0 ? void 0 : _this$querySelector2.addEventListener('mouseout', function () {
          setTimeout(function () {
            itemImage.src = _this41.primaryImage;
            itemImage.srcset = _this41.primaryImage;
          }, 100);
        });
      }
    }
  }, {
    key: "onSwatchClick",
    value: function () {
      var _onSwatchClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
        var selectedSwatch;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(e.target.classList.contains('card__swatch') && !e.target.classList.contains('card__swatch--see-more'))) {
                  _context6.next = 17;
                  break;
                }
                this.swatches.forEach(function (swatch) {
                  return swatch.classList.remove("card__swatch--selected");
                });
                e.target.classList.add("card__swatch--selected");
                this.swatches.forEach(function (swatch) {
                  return swatch.classList.remove("swatch--selected");
                });
                e.target.classList.add("swatch--selected");
                selectedSwatch = e.target;
                this.updateImage(selectedSwatch);
                this.secondImage = this.findSecondImage();
                this.updateLink(selectedSwatch);
                this.updateTitle(selectedSwatch);
                this.updatePrice(selectedSwatch);
                this.updateVariantId(selectedSwatch);
                this.quickViewButton ? this.quickViewButton.dataset.productHandle = selectedSwatch.dataset.handle : null;
                _context6.next = 15;
                return this.fetchNewProductJson(selectedSwatch.dataset.handle);
              case 15:
                this.product = _context6.sent;
                this.updateBadges(selectedSwatch);
              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function onSwatchClick(_x9) {
        return _onSwatchClick.apply(this, arguments);
      }
      return onSwatchClick;
    }()
  }, {
    key: "updateBadges",
    value: function () {
      var _updateBadges = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var _this$infoBadges;
        var variantAsInt, currentVariant;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                variantAsInt = parseInt(this.dataset.variantId);
                currentVariant = this.product.variants.find(function (variant) {
                  return variant.id == variantAsInt;
                });
                (_this$infoBadges = this.infoBadges) === null || _this$infoBadges === void 0 ? void 0 : _this$infoBadges.toggleBadge(currentVariant);
              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function updateBadges() {
        return _updateBadges.apply(this, arguments);
      }
      return updateBadges;
    }()
  }, {
    key: "fetchNewProductJson",
    value: function () {
      var _fetchNewProductJson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(handle) {
        var productData;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return fetch("".concat(window.Shopify.routes.root, "products/").concat(handle, ".js")).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return data;
                });
              case 2:
                productData = _context8.sent;
                this.swatch_click_event(this.product);
                return _context8.abrupt("return", productData);
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function fetchNewProductJson(_x10) {
        return _fetchNewProductJson.apply(this, arguments);
      }
      return fetchNewProductJson;
    }()
  }, {
    key: "swatch_click_event",
    value: function swatch_click_event(product) {
      var _this$closest, _this$closest$dataset;
      Shopify.analytics.publish("colour_swatch_click", {
        "currency": "".concat(Shopify.currency.active),
        "value": "".concat(product.price / 100),
        "item_list_id": "",
        "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
        "affiliation": "".concat(product.vendor),
        "items": [{
          "item_list_name": "".concat(window.location.pathname.split('/collections/')[1]),
          "item_id": "".concat(product.variants[0].sku),
          "item_name": "".concat(product.title),
          "item_brand": "".concat(product.vendor),
          "item_category": "".concat(product.type),
          "item_variant": "".concat(product.title, " - ").concat(product.variants[0].title),
          "affiliation": "".concat(product.vendor),
          "price": "".concat(product.price / 100),
          "currency": "".concat(Shopify.currency.active),
          "quantity": 1,
          "discount": 0,
          "index": "".concat(((_this$closest = this.closest('li.grid__item')) === null || _this$closest === void 0 ? void 0 : (_this$closest$dataset = _this$closest.dataset) === null || _this$closest$dataset === void 0 ? void 0 : _this$closest$dataset.position) || 0)
        }]
      });
    }
  }, {
    key: "updateImage",
    value: function updateImage(swatch) {
      var newImg = swatch.dataset.mainImage;
      this.primaryImage = newImg;
      this.querySelector(':scope .card__image').src = this.primaryImage;
      this.querySelector(':scope .card__image').srcset = this.primaryImage;
    }
  }, {
    key: "updateSecondImage",
    value: function updateSecondImage(swatch) {
      this.secondImage = swatch.dataset.secondImage;
    }
  }, {
    key: "updateTitle",
    value: function updateTitle(swatch) {
      var leadTitle = this.querySelector(':scope .card__title span.lead-title');
      var subTitle = this.querySelector(':scope .sub-title');
      if (leadTitle) {
        leadTitle.innerText = swatch.dataset.title;
      }
      if (subTitle) {
        subTitle.innerText = swatch.dataset.subtitle;
      }
    }
  }, {
    key: "updateVariantId",
    value: function updateVariantId(swatch) {
      var newId = swatch.dataset.variantId;
      var newHandle = swatch.dataset.handle;
      this.dataset.variantId = newId;
      this.dataset.productTitle = newHandle;
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(swatch) {
      var universalPriceParent = this.querySelector(':scope .price');
      var salePriceParent = this.querySelector(':scope .price__sale');
      var mainPriceParent = this.querySelector(':scope .price .price__regular');
      var comparePrice = swatch.dataset.comparePrice ? swatch.dataset.comparePrice : null;
      if (comparePrice != null) {
        universalPriceParent.classList.add('price--on-sale');
        salePriceParent.innerHTML = "<span class=\"price-item price-item--regular\">".concat(comparePrice, "</span><span class=\"price-item--sale\">").concat(swatch.dataset.price, "</span>");
      } else {
        universalPriceParent.classList.remove('price--on-sale');
        mainPriceParent.innerHTML = "<span class=\"visually-hidden visually-hidden--inline\">Regular price</span> <span class=\"price-item price-item--regular\">".concat(swatch.dataset.price, "</span>");
      }
    }
  }, {
    key: "updateLink",
    value: function updateLink(swatch) {
      var newLink;
      newLink = swatch.dataset.url;
      this.cardTitleLink.href = newLink;
      this.cardImageLink.href = newLink;
    }
  }, {
    key: "toggleSwatchList",
    value: function toggleSwatchList(e) {
      var seeMoreSwatch = this.querySelector(':scope .card__swatch--see-more');
      if (this.swatchesHidden) {
        e.currentTarget.querySelectorAll(':scope span').forEach(function (spanElem) {
          spanElem.innerText = spanElem.innerText.replace('+', '-');
        });
        this.showSwatches();
        seeMoreSwatch.classList.toggle('active-position', this.swatchesHidden);
        this.swatchesHidden = false;
      } else {
        e.currentTarget.querySelectorAll(':scope span').forEach(function (spanElem) {
          spanElem.innerText = spanElem.innerText.replace('-', '+');
        });
        this.hideSwatches();
        seeMoreSwatch.classList.toggle('active-position', this.swatchesHidden);
        this.swatchesHidden = true;
      }
    }
  }, {
    key: "showSwatches",
    value: function showSwatches() {
      var hiddenSwatches = window.innerWidth < 750 ? this.querySelectorAll(':scope .sibling-swatch:nth-child(n+3):not(.card__swatch--see-more') : this.querySelectorAll(':scope .sibling-swatch:nth-child(n+5):not(.card__swatch--see-more');
      hiddenSwatches.forEach(function (hiddenSwatch) {
        hiddenSwatch.classList.add('show');
      });
      var swatchContainer = this.querySelector(':scope .product-sibling-swatch-container');
      swatchContainer.classList.add('open-swatches');
    }
  }, {
    key: "hideSwatches",
    value: function hideSwatches() {
      var allSwatchesOnCard = this.querySelectorAll(':scope .card__swatch');
      var swatchTotal = allSwatchesOnCard.length;
      if (window.innerWidth > 750) {
        for (var i = 4; i < swatchTotal; i++) {
          if (!allSwatchesOnCard[i].classList.contains('card__swatch--see-more')) {
            allSwatchesOnCard[i].classList.remove('show');
          }
        }
      } else {
        for (var _i3 = 2; _i3 < swatchTotal; _i3++) {
          if (!allSwatchesOnCard[_i3].classList.contains('card__swatch--see-more')) {
            allSwatchesOnCard[_i3].classList.remove('show');
          }
        }
      }
      var swatchContainer = this.querySelector(':scope .product-sibling-swatch-container');
      swatchContainer.classList.remove('open-swatches');
    }
  }]);
  return ProductCard;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('product-card', ProductCard);
var InfoBadges = /*#__PURE__*/function (_HTMLElement13) {
  _inherits(InfoBadges, _HTMLElement13);
  var _super18 = _createSuper(InfoBadges);
  function InfoBadges() {
    var _this42;
    _classCallCheck(this, InfoBadges);
    _this42 = _super18.call(this);
    _this42.badges = Array.from(_this42.querySelectorAll('.badge'));
    if (_this42.dataset.usage == 'product-card') {
      _this42.currentVariant = _this42.closest('product-card').product.variants.find(function (variant) {
        return variant;
      });
      _this42.toggleBadge(_this42.currentVariant);
    } else if (_this42.dataset.usage == 'main-product') {
      _this42.currentVariant = _this42.closest('.product-main').querySelector('variant-picker').currentVariant;
      _this42.toggleBadge(_this42.currentVariant, true);
    }
    return _this42;
  }
  _createClass(InfoBadges, [{
    key: "toggleBadge",
    value: function toggleBadge(currentVariant) {
      var firedOnPageLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (firedOnPageLoad == true) {
        for (var i = 0; i < this.badges.length; i++) {
          if (this.badges[i].dataset.variant != currentVariant.title) {
            this.badges[i].remove();
          }
        }
      }
      this.badges.forEach(function (badge) {
        if (badge.dataset.variant == currentVariant.title && badge.innerText != "") {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      });
    }
  }]);
  return InfoBadges;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('info-badges', InfoBadges);
var VideoBanner = /*#__PURE__*/function (_HTMLElement14) {
  _inherits(VideoBanner, _HTMLElement14);
  var _super19 = _createSuper(VideoBanner);
  function VideoBanner() {
    var _this43;
    _classCallCheck(this, VideoBanner);
    _this43 = _super19.call(this);
    _this43.player = _this43.firstElementChild;
    _this43.wideBreakPoint = Shopify.breakpoints.mobile + 1;
    _this43.wideViewPort = window.matchMedia("(min-width: ".concat(_this43.wideBreakPoint, "px)"));
    _this43.resizeVideo(_this43.wideViewPort);
    return _this43;
  }
  _createClass(VideoBanner, [{
    key: "resizeVideo",
    value: function resizeVideo() {
      var src = this.dataset.mobileSrc;
      var poster = this.dataset.mobilePoster;
      if (this.wideViewPort.matches) {
        src = this.dataset.desktopSrc;
        poster = this.dataset.desktopPoster;
      }
      this.player.src = src;
      this.player.poster = poster;
    }
  }]);
  return VideoBanner;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('video-banner', VideoBanner);
var CartRemoveButton = /*#__PURE__*/function (_HTMLElement15) {
  _inherits(CartRemoveButton, _HTMLElement15);
  var _super20 = _createSuper(CartRemoveButton);
  function CartRemoveButton() {
    var _this44;
    _classCallCheck(this, CartRemoveButton);
    _this44 = _super20.call(this);
    _this44.debouncedOnClick = debounce(function () {
      var container = _this44.closest('cart-modal') || _this44.closest('cart-items');
      container.updateQuantity(_this44.dataset.index, 0);
    }, 500);
    _this44.addEventListener('click', function (event) {
      event.preventDefault();
      _this44.debouncedOnClick();
    });
    return _this44;
  }
  return _createClass(CartRemoveButton);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('cart-remove-button', CartRemoveButton);
var VideoControlButton = /*#__PURE__*/function (_HTMLElement16) {
  _inherits(VideoControlButton, _HTMLElement16);
  var _super21 = _createSuper(VideoControlButton);
  function VideoControlButton() {
    var _this45;
    _classCallCheck(this, VideoControlButton);
    _this45 = _super21.call(this);
    _this45.controlButton = _this45.querySelector('button');
    _this45.playSVG = _this45.querySelector('.video-control-button__play');
    _this45.pauseSVG = _this45.querySelector('.video-control-button__pause');
    _this45.targetVideo = document.querySelector('.video-control-button--target');
    _this45.controlButton.addEventListener('click', function () {
      _this45.pauseSVG.classList.contains('hidden') ? _this45.playVideo() : _this45.pauseVideo();
    });
    window.addEventListener('DOMContentLoaded', function () {
      _this45.playVideo();
    });
    return _this45;
  }
  _createClass(VideoControlButton, [{
    key: "pauseVideo",
    value: function pauseVideo() {
      this.targetVideo.pause();
      this.pauseSVG.classList.add('hidden');
      this.playSVG.classList.remove('hidden');
    }
  }, {
    key: "playVideo",
    value: function playVideo() {
      this.targetVideo.play();
      this.playSVG.classList.add('hidden');
      this.pauseSVG.classList.remove('hidden');
    }
  }]);
  return VideoControlButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('video-control-button', VideoControlButton);
var CountdownTimer = /*#__PURE__*/function (_HTMLElement17) {
  _inherits(CountdownTimer, _HTMLElement17);
  var _super22 = _createSuper(CountdownTimer);
  function CountdownTimer() {
    var _this46;
    _classCallCheck(this, CountdownTimer);
    _this46 = _super22.call(this);
    _this46.expirationDayAsString = _this46.dataset.expDate != null ? _this46.dataset.expDate : null;
    _this46.expirationTimeAsString = _this46.dataset.expTime != null ? _this46.dataset.expTime : null;
    var expirationAsString = _this46.formatDateString(_this46.expirationDayAsString, _this46.expirationTimeAsString);
    _this46.second = 1000;
    _this46.minute = _this46.second * 60;
    _this46.hour = _this46.minute * 60;
    _this46.day = _this46.hour * 24;
    _this46.countDownFire(expirationAsString);
    return _this46;
  }

  /* This method takes the inputs from theme settings, validates and formats them for Date Objects them */
  _createClass(CountdownTimer, [{
    key: "formatDateString",
    value: function formatDateString(expDate, expTime) {
      /* RegEx to validate time format correctly in HH:MM, otherwise returns null */
      if (expTime.match(/^[0-2][0-9]:[0-5][0-9]/)) {
        if (expTime[0] > 1) {
          if (expTime[1] > 4) {
            /* fallback fires if HH exceeds 23, also returns null */
            this.fireFallBack();
            return null;
          }
        }
        /* re-format date from UK DD/MM/YYYY to YYYY/MM/DD for Date String */
        var expDateArr = expDate.split('/');
        var formattedDate = "".concat(expDateArr[2], "-").concat(expDateArr[1], "-").concat(expDateArr[0]);
        /* Construct Date String */
        var dateString = "".concat(formattedDate, "T").concat(expTime);
        return dateString;
      } else {
        return null;
      }
    }
  }, {
    key: "countDownFire",
    value: function countDownFire(expirationAsString) {
      var _this47 = this;
      /* providing formatDateString didn't return null, countdown interval is fired */
      if (expirationAsString != null) {
        var countingInterval = setInterval(function () {
          var expObj = new Date(expirationAsString).getTime();
          var now = new Date().getTime();
          var timeDiff = expObj - now;
          expObj = expObj - 1000;
          if (timeDiff < 1) {
            /* when countdown hits 0, kill interval, fire fallback method */
            clearInterval(countingInterval);
            _this47.fireFallBack();
          } else {
            _this47.calcAndPrintCount(timeDiff);
          }
        }, this.second);
      } else {
        this.fireFallBack();
      }
    }
  }, {
    key: "calcAndPrintCount",
    value: function calcAndPrintCount(timeDiff) {
      /* method for updating countdown timer on the front end, hides zero'd denominations (i.e instead of "0 days 22 h 18m 10s" it will hide "0 days") */
      var daysLeft = Math.floor(timeDiff / this.day);
      this.querySelector(':scope .days-remaining').innerText = daysLeft;
      if (daysLeft == 1) {
        this.querySelector(':scope .day-string').style.display = 'inline';
        this.querySelector(':scope .days-string').style.display = 'none';
      } else if (daysLeft < 1) {
        this.querySelector(':scope .days-remaining').style.display = 'none';
        this.querySelector(':scope .day-string').style.display = 'none';
        this.querySelector(':scope .days-string').style.display = 'none';
      } else if (daysLeft > 1) {
        this.querySelector(':scope .days-string').style.display = 'inline';
        this.querySelector(':scope .day-string').style.display = 'none';
      }
      if (Math.floor(timeDiff % this.day / this.hour) >= 1) {
        this.querySelector(':scope .hours-remaining').innerText = Math.floor(timeDiff % this.day / this.hour);
        this.querySelector(':scope .hours-wrapper').style.display = 'inline';
      } else {
        this.querySelector(':scope .hours-wrapper').style.display = 'none';
      }
      if (Math.floor(timeDiff % this.hour / this.minute) >= 1) {
        this.querySelector(':scope .minutes-remaining').innerText = Math.floor(timeDiff % this.hour / this.minute);
        this.querySelector(':scope .mins-wrapper').style.display = 'inline';
      } else {
        this.querySelector(':scope .mins-wrapper').style.display = 'none';
      }
      if (Math.floor(timeDiff % this.minute / this.second) >= 1) {
        this.querySelector(':scope .seconds-remaining').innerText = Math.floor(timeDiff % this.minute / this.second);
        this.querySelector(':scope .secs-wrapper').style.display = 'inline';
      } else {
        this.querySelector(':scope .secs-wrapper').style.display = 'none';
      }
    }
  }, {
    key: "fireFallBack",
    value: function fireFallBack() {
      /* swaps the displayed element for the fallback message instead of the timer */
      this.querySelector(':scope .active-timer').style.display = 'none';
      this.querySelector(':scope .inactive-timer').style.display = 'block';
    }
  }]);
  return CountdownTimer;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('countdown-timer', CountdownTimer);
var SiblingSelector = /*#__PURE__*/function (_HTMLElement18) {
  _inherits(SiblingSelector, _HTMLElement18);
  var _super23 = _createSuper(SiblingSelector);
  function SiblingSelector() {
    var _this48;
    _classCallCheck(this, SiblingSelector);
    _this48 = _super23.call(this);
    _this48.bikePDP = document.querySelector('.product-main-bike') ? true : false;

    // set local storage prop for variant option value if required 
    // set xScroll to stored value if referrer is another bike PDP
    if (!document.referrer.includes('products')) {
      localStorage.setItem('previousSelectedOptionValue', '');
    } else {
      if (_this48.bikePDP) _this48.setScrollHeight();
    }

    // if bike PDP, reset stored xScroll value and set event listener for swatch click
    if (_this48.bikePDP) {
      localStorage.setItem('previousPDPScrollHeight', '');
      _this48.addEventListener('click', _this48.storeScrollHeight.bind(_assertThisInitialized(_this48)));
    }

    // props and listeners for variant selection persistence if products has variant options 
    _this48.productHasVariants = document.querySelector('.product__info-container').querySelector('variant-picker') ? true : false;
    if (_this48.productHasVariants) {
      _this48.variantFieldset = document.querySelector("variant-picker[data-product-id=\"".concat(_this48.dataset.prodId, "\"]")).querySelector("[data-option=\"".concat(_this48.dataset.variantOption, "\"]"));
    }
    _this48.selectedOptionValue = _this48.variantFieldset ? _this48.variantFieldset.querySelector('[checked]').value : null;
    if (_this48.variantFieldset) {
      _this48.variantFieldset.addEventListener('change', _this48.getSelectedOptionValue.bind(_assertThisInitialized(_this48)));
      document.addEventListener('DOMContentLoaded', _this48.selectOptionValue.bind(_assertThisInitialized(_this48)));
    }
    return _this48;
  }
  _createClass(SiblingSelector, [{
    key: "selectOptionValue",
    value: function selectOptionValue() {
      var _this49 = this;
      var storedValue = localStorage.getItem('previousSelectedOptionValue');
      setTimeout(function () {
        Array.from(_this49.variantFieldset.querySelectorAll('input')).forEach(function (elem) {
          if (elem.value == storedValue) {
            elem.click();
          } else {
            null;
          }
        });
      }, 500);
    }
  }, {
    key: "getSelectedOptionValue",
    value: function getSelectedOptionValue(event) {
      if (event.target.classList.value.includes('product-form__variant-input')) {
        this.selectOptionValue = event.target.value;
        this.storeOption(this.selectedOptionValue);
      }
    }
  }, {
    key: "storeOption",
    value: function storeOption(optionValue) {
      localStorage.setItem('previousSelectedOptionValue', optionValue);
    }
  }, {
    key: "storeScrollHeight",
    value: function storeScrollHeight(e) {
      localStorage.setItem('previousPDPScrollHeight', window.scrollY);
    }
  }, {
    key: "setScrollHeight",
    value: function setScrollHeight() {
      window.scrollTo(0, localStorage.getItem('previousPDPScrollHeight'));
    }
  }]);
  return SiblingSelector;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('sibling-selector', SiblingSelector);
var DsHotspots = /*#__PURE__*/function (_HTMLElement19) {
  _inherits(DsHotspots, _HTMLElement19);
  var _super24 = _createSuper(DsHotspots);
  function DsHotspots() {
    _classCallCheck(this, DsHotspots);
    return _super24.call(this);
  }
  _createClass(DsHotspots, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.initDotInteractions();
      document.addEventListener('keydown', this.handleEscape);
      this.openFirstHotspot();
      var parentComponent = this.closest('slideshow-component');
      if (parentComponent) {
        parentComponent.addEventListener('click', this.handleClickOutsideHotspots);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      document.removeEventListener('keydown', this.handleEscape);
      var parentComponent = this.closest('slideshow-component');
      if (parentComponent) {
        parentComponent.removeEventListener('click', this.handleClickOutsideHotspots);
      }
    }
  }, {
    key: "handleEscape",
    value: function handleEscape(event) {
      if (event.key === "Escape") {
        var openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
        var openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');
        openProducts.forEach(function (product) {
          product.removeAttribute('open');
        });
        openDots.forEach(function (dot) {
          dot.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }, {
    key: "initDotInteractions",
    value: function initDotInteractions() {
      var dots = this.querySelectorAll('.ds-hotspots__dot');
      var products = this.querySelectorAll('.ds-hotspots__product');
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          products.forEach(function (product) {
            if (product !== dot.parentNode.querySelector('.ds-hotspots__product')) {
              product.removeAttribute('open');
            }
          });
          dots.forEach(function (otherDot) {
            if (otherDot !== dot) {
              otherDot.setAttribute('aria-expanded', 'false');
            }
          });
          var productInfo = dot.parentNode.querySelector('.ds-hotspots__product');
          if (!productInfo) return;
          if (productInfo.hasAttribute('open')) {
            productInfo.removeAttribute('open');
            dot.setAttribute('aria-expanded', 'false');
          } else {
            productInfo.setAttribute('open', '');
            dot.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }
  }, {
    key: "openFirstHotspot",
    value: function openFirstHotspot() {
      var firstDot = this.querySelector('.ds-hotspots__dot');
      var firstProduct = firstDot ? firstDot.parentNode.querySelector('.ds-hotspots__product') : null;
      if (firstDot && firstProduct) {
        firstProduct.setAttribute('open', '');
        firstDot.setAttribute('aria-expanded', 'true');
      }
    }
  }, {
    key: "handleClickOutsideHotspots",
    value: function handleClickOutsideHotspots(event) {
      var _this50 = this;
      if (this.contains(event.target) && !event.target.closest('.ds-hotspots__dot, .ds-hotspots__product-wrapper, .slider-button')) {
        var openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
        var openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');
        openProducts.forEach(function (product) {
          product.removeAttribute('open');
        });
        openDots.forEach(function (dot) {
          dot.setAttribute('aria-expanded', 'false');
        });
        return;
      }
      if (event.target.closest('.slider-button')) {
        var _openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
        var _openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');
        _openProducts.forEach(function (product) {
          product.removeAttribute('open');
        });
        _openDots.forEach(function (dot) {
          dot.setAttribute('aria-expanded', 'false');
        });
        setTimeout(function () {
          var parentComponent = _this50.closest('slideshow-component');
          var currentSlide = parentComponent.querySelector('.slideshow__slide[aria-hidden="false"]');
          var targetSlide;
          if (event.target.closest('.slider-button--next')) {
            var nextSlide = currentSlide.nextElementSibling;
            while (nextSlide && !nextSlide.classList.contains('slideshow__slide')) {
              nextSlide = nextSlide.nextElementSibling;
            }
            targetSlide = nextSlide;
          } else if (event.target.closest('.slider-button--prev')) {
            var prevSlide = currentSlide.previousElementSibling;
            while (prevSlide && !prevSlide.classList.contains('slideshow__slide')) {
              prevSlide = prevSlide.previousElementSibling;
            }
            targetSlide = prevSlide;
          }
          if (targetSlide) {
            var firstDot = targetSlide.querySelector('.ds-hotspots__dot');
            var firstProduct = firstDot ? firstDot.parentNode.querySelector('.ds-hotspots__product') : null;
            if (firstDot && firstProduct) {
              firstProduct.setAttribute('open', '');
              firstDot.setAttribute('aria-expanded', 'true');
            }
          }
        }, 300);
        return;
      }
    }
  }]);
  return DsHotspots;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('ds-hotspots', DsHotspots);
var ArticleProgressBar = /*#__PURE__*/function (_HTMLElement20) {
  _inherits(ArticleProgressBar, _HTMLElement20);
  var _super25 = _createSuper(ArticleProgressBar);
  function ArticleProgressBar() {
    var _this51;
    _classCallCheck(this, ArticleProgressBar);
    _this51 = _super25.call(this);
    _this51.body = document.querySelector('body');
    _this51.progressBar = _this51.querySelector('.article__progress-bar');
    window.addEventListener('scroll', _this51.stretchBar.bind(_assertThisInitialized(_this51)));
    return _this51;
  }
  _createClass(ArticleProgressBar, [{
    key: "stretchBar",
    value: function stretchBar() {
      var pixelsScrolled = window.scrollY;
      var viewportHeight = window.innerHeight;
      var totalHeight = this.body.scrollHeight;
      var percentageScrolled = pixelsScrolled / (totalHeight - viewportHeight) * 100;
      this.progressBar.style.width = Math.round(percentageScrolled) + "%";
    }
  }]);
  return ArticleProgressBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('article-progress-bar', ArticleProgressBar);