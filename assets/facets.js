"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var FacetFiltersForm = /*#__PURE__*/function (_HTMLElement) {
  _inherits(FacetFiltersForm, _HTMLElement);
  var _super = _createSuper(FacetFiltersForm);
  function FacetFiltersForm() {
    var _this;
    _classCallCheck(this, FacetFiltersForm);
    _this = _super.call(this);
    _this.onActiveFilterClick = _this.onActiveFilterClick.bind(_assertThisInitialized(_this));
    _this.sideBarMode = _this.classList.value.includes('side-bar-filters');
    _this.facetCheckboxes = Array.from(_this.getElementsByClassName('facet-checkbox'));
    if (_this.sideBarMode) {
      _this.openActiveGroups();
    }
    _this.debouncedOnSubmit = debounce(function (event) {
      _this.onSubmitHandler(event);
    }, 500);
    _this.querySelector('form').addEventListener('input', _this.debouncedOnSubmit.bind(_assertThisInitialized(_this)));
    _this.querySelectorAll('.facets__main details').forEach(function (detailsElement) {
      detailsElement.addEventListener('click', _this.closeOtherFilters);
      detailsElement.addEventListener('keydown', _this.closeOtherFilters);
    });
    var facetWrapper = _this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
    return _this;
  }
  _createClass(FacetFiltersForm, [{
    key: "onSubmitHandler",
    value: function onSubmitHandler(event, externalSort) {
      event.preventDefault();
      if (this.sideBarMode) {
        var formData = new FormData(event.target.closest('form'));
        var searchParams = new URLSearchParams(formData).toString();
        var sortParamString = 'sort';
        var filterParamString = 'filter';
        if (externalSort) {
          if (FacetFiltersForm.searchParamsPrev.includes(filterParamString) && !FacetFiltersForm.searchParamsPrev.includes(sortParamString)) {
            //S3 sort with prior filter params and no prior sortby params
            searchParams = "".concat(FacetFiltersForm.searchParamsPrev, "&").concat(searchParams);
          } else if (FacetFiltersForm.searchParamsPrev.includes(filterParamString) && FacetFiltersForm.searchParamsPrev.includes(sortParamString)) {
            //s4 sort with prior filter params and prior sortby params
            searchParams = FacetFiltersForm.searchParamsPrev.split(sortParamString)[0] + searchParams;
          }
        }
        if (FacetFiltersForm.searchParamsPrev.includes(sortParamString) && FacetFiltersForm.searchParamsPrev.includes(filterParamString)) {
          var sortParam = FacetFiltersForm.searchParamsPrev.split("&".concat(sortParamString))[1];
          searchParams = "".concat(searchParams, "&").concat(sortParamString).concat(sortParam);
        } else if (FacetFiltersForm.searchParamsPrev.includes(sortParamString) && !FacetFiltersForm.searchParamsPrev.includes(filterParamString)) {
          var _sortParam = FacetFiltersForm.searchParamsPrev.split(sortParamString)[1];
          searchParams = "".concat(searchParams, "&").concat(sortParamString).concat(_sortParam);
        }
        FacetFiltersForm.renderPage(searchParams, event);
      } else {
        var _formData = new FormData(event.target.closest('form'));
        var _searchParams = new URLSearchParams(_formData).toString();
        FacetFiltersForm.renderPage(_searchParams, event);
      }
    }
  }, {
    key: "onActiveFilterClick",
    value: function onActiveFilterClick(event) {
      event.preventDefault();
      FacetFiltersForm.toggleActiveFacets();
      var url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
      FacetFiltersForm.renderPage(url);
    }
  }, {
    key: "openActiveGroups",
    value: function openActiveGroups() {
      this.facetCheckboxes.forEach(function (checkbox) {
        if (checkbox.firstElementChild.hasAttribute('checked')) {
          checkbox.closest('details').setAttribute('open', 'open');
        }
      });
    }
  }, {
    key: "closeOtherFilters",
    value: function closeOtherFilters(event) {
      var clickedDetails = event.target.closest('details');
      this.closest('.facets__main').querySelectorAll('details').forEach(function (details) {
        if (details !== clickedDetails) {
          details.removeAttribute('open');
          details.querySelector('summary').setAttribute('aria-expanded', false);
        }
      });
    }
  }], [{
    key: "setListeners",
    value: function setListeners() {
      var onHistoryChange = function onHistoryChange(event) {
        var searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
        if (searchParams === FacetFiltersForm.searchParamsPrev) return;
        FacetFiltersForm.renderPage(searchParams, null, false);
      };
      window.addEventListener('popstate', onHistoryChange);
    }
  }, {
    key: "toggleActiveFacets",
    value: function toggleActiveFacets() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      document.querySelectorAll('.js-facet-remove').forEach(function (element) {
        element.classList.toggle('disabled', disable);
      });
    }
  }, {
    key: "renderPage",
    value: function renderPage(searchParams, event) {
      var updateURLHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      FacetFiltersForm.searchParamsPrev = searchParams;
      var sections = FacetFiltersForm.getSections();
      var countContainer = document.getElementById('ProductCount');
      var countContainerDesktop = document.getElementById('ProductCountDesktop');
      document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
      if (countContainer) {
        countContainer.classList.add('loading');
      }
      if (countContainerDesktop) {
        countContainerDesktop.classList.add('loading');
      }
      sections.forEach(function (section) {
        var url = "".concat(window.location.pathname, "?section_id=").concat(section.section, "&").concat(searchParams);
        var filterDataUrl = function filterDataUrl(element) {
          return element.url === url;
        };
        FacetFiltersForm.filterData.some(filterDataUrl) ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) : FacetFiltersForm.renderSectionFromFetch(url, event);
      });
      if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
    }
  }, {
    key: "renderSectionFromFetch",
    value: function renderSectionFromFetch(url, event) {
      fetch(url).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = responseText;
        FacetFiltersForm.filterData = [].concat(_toConsumableArray(FacetFiltersForm.filterData), [{
          html: html,
          url: url
        }]);
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
      });
    }
  }, {
    key: "renderSectionFromCache",
    value: function renderSectionFromCache(filterDataUrl, event) {
      var html = FacetFiltersForm.filterData.find(filterDataUrl).html;
      FacetFiltersForm.renderFilters(html, event);
      FacetFiltersForm.renderProductGridContainer(html);
      FacetFiltersForm.renderProductCount(html);
    }
  }, {
    key: "renderProductGridContainer",
    value: function renderProductGridContainer(html) {
      document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
    }
  }, {
    key: "renderProductCount",
    value: function renderProductCount(html) {
      var count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
      var container = document.getElementById('ProductCount');
      var containerDesktop = document.getElementById('ProductCountDesktop');
      container.innerHTML = count;
      container.classList.remove('loading');
      var iscroll = document.querySelector('infinite-scroll');
      iscroll ? iscroll.setAttribute('data-filtered-collection-count', count) : null;
      if (containerDesktop) {
        containerDesktop.innerHTML = count;
        containerDesktop.classList.remove('loading');
      }
    }
  }, {
    key: "renderFilters",
    value: function renderFilters(html, event) {
      var parsedHTML = new DOMParser().parseFromString(html, 'text/html');
      var facetDetailsElements = parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersForm .js-filter');
      var matchesIndex = function matchesIndex(element) {
        var jsFilter = event ? event.target.closest('.js-filter') : undefined;
        return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
      };
      var facetsToRender = Array.from(facetDetailsElements).filter(function (element) {
        return !matchesIndex(element);
      });
      var countsToRender = Array.from(facetDetailsElements).find(matchesIndex);
      facetsToRender.forEach(function (element) {
        document.querySelector(".js-filter[data-index=\"".concat(element.dataset.index, "\"]")).innerHTML = element.innerHTML;
      });
      FacetFiltersForm.renderActiveFacets(parsedHTML);
      FacetFiltersForm.renderAdditionalElements(parsedHTML);
      if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
    }
  }, {
    key: "renderActiveFacets",
    value: function renderActiveFacets(html) {
      var activeFacetElementSelectors = ['.active-facets', '.active-facets-desktop'];
      activeFacetElementSelectors.forEach(function (selector) {
        var activeFacetsElement = html.querySelector(selector);
        if (!activeFacetsElement) return;
        document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
      });
      FacetFiltersForm.toggleActiveFacets(false);
    }
  }, {
    key: "renderAdditionalElements",
    value: function renderAdditionalElements(html) {
      var mobileElementSelectors = ['.facets__open', '.facets__count', '.sorting'];
      mobileElementSelectors.forEach(function (selector) {
        if (!html.querySelector(selector)) return;
        document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
      });
      document.getElementById('FacetFiltersForm').closest('menu-drawer').bindEvents();
    }
  }, {
    key: "renderCounts",
    value: function renderCounts(source, target) {
      var targetElement = target.querySelector('.facets__selected');
      var sourceElement = source.querySelector('.facets__selected');
      if (sourceElement && targetElement) {
        target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
      }
    }
  }, {
    key: "updateURLHash",
    value: function updateURLHash(searchParams) {
      history.pushState({
        searchParams: searchParams
      }, '', "".concat(window.location.pathname).concat(searchParams && '?'.concat(searchParams)));
    }
  }, {
    key: "getSections",
    value: function getSections() {
      return [{
        section: document.getElementById('product-grid').dataset.id
      }];
    }
  }]);
  return FacetFiltersForm;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();
var PriceRange = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(PriceRange, _HTMLElement2);
  var _super2 = _createSuper(PriceRange);
  function PriceRange() {
    var _this2;
    _classCallCheck(this, PriceRange);
    _this2 = _super2.call(this);
    _this2.querySelectorAll('input').forEach(function (element) {
      return element.addEventListener('change', _this2.onRangeChange.bind(_assertThisInitialized(_this2)));
    });
    _this2.setMinAndMaxValues();
    return _this2;
  }
  _createClass(PriceRange, [{
    key: "onRangeChange",
    value: function onRangeChange(event) {
      this.adjustToValidValues(event.currentTarget);
      this.setMinAndMaxValues();
    }
  }, {
    key: "setMinAndMaxValues",
    value: function setMinAndMaxValues() {
      var inputs = this.querySelectorAll('input');
      var minInput = inputs[0];
      var maxInput = inputs[1];
      if (maxInput.value) minInput.setAttribute('max', maxInput.value);
      if (minInput.value) maxInput.setAttribute('min', minInput.value);
      if (minInput.value === '') maxInput.setAttribute('min', 0);
      if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
    }
  }, {
    key: "adjustToValidValues",
    value: function adjustToValidValues(input) {
      var value = Number(input.value);
      var min = Number(input.getAttribute('min'));
      var max = Number(input.getAttribute('max'));
      if (value < min) input.value = min;
      if (value > max) input.value = max;
    }
  }]);
  return PriceRange;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('price-range', PriceRange);
var FacetRemove = /*#__PURE__*/function (_HTMLElement3) {
  _inherits(FacetRemove, _HTMLElement3);
  var _super3 = _createSuper(FacetRemove);
  function FacetRemove() {
    var _this3;
    _classCallCheck(this, FacetRemove);
    _this3 = _super3.call(this);
    _this3.querySelector('a').addEventListener('click', function (event) {
      event.preventDefault();
      var form = _this3.closest('facet-filters-form') || document.querySelector('facet-filters-form');
      form.onActiveFilterClick(event);
    });
    return _this3;
  }
  return _createClass(FacetRemove);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('facet-remove', FacetRemove);

// if (window.innerWidth > 750) {
// 	let headerSection = document.querySelector('.section-header')
// 	let filterForm = document.getElementById('FacetFiltersForm');

// 	filterForm.style.top = `${headerSection.clientHeight}px`;
// }

var sortButton = document.querySelector('.facets__open-filters');
var filterButton = document.querySelector('.facets__open-sort');
function openCorrectModalArea(event) {
  var areaToOpen = document.querySelector("".concat(event.target.classList.contains('facets__open-filters') ? '.facets__main .facets__details' : '.facets__sort-by'));
  areaToOpen.setAttribute('open', '');
  areaToOpen.querySelector('summary').setAttribute('aria-expanded', false);
  areaToOpen.focus();
}

// Functions to add/remove open class to sort/filter buttons to style and animate arrows on click
function addOpenClass(event) {
  var targetElement = event.currentTarget;
  if (!targetElement.classList.contains('open')) {
    targetElement.classList.add('open');
  } else {
    targetElement.classList.remove('open');
  }
}
sortButton.addEventListener('click', addOpenClass);
sortButton.addEventListener('click', openCorrectModalArea);
sortButton.addEventListener('keydown', addOpenClass);
sortButton.addEventListener('keydown', openCorrectModalArea);
filterButton.addEventListener('click', addOpenClass);
filterButton.addEventListener('click', openCorrectModalArea);
filterButton.addEventListener('keydown', addOpenClass);
filterButton.addEventListener('keydown', openCorrectModalArea);