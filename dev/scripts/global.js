function getFocusableElements(container) {
	return Array.from(
		container.querySelectorAll(
			"summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
		)
	);
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
	summary.setAttribute('role', 'button');
	summary.setAttribute('aria-expanded', 'false');

	if (summary.nextElementSibling.getAttribute('id')) {
		summary.setAttribute('aria-controls', summary.nextElementSibling.id);
	}

	summary.addEventListener('click', (event) => {
		event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
	});

	if (summary.closest('header-drawer')) return;

	summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
	var elements = getFocusableElements(container);
	var first = elements[0];
	var last = elements[elements.length - 1];

	removeTrapFocus();

	trapFocusHandlers.focusin = (event) => {
		if (
			event.target !== container &&
			event.target !== last &&
			event.target !== first
		)
			return;

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
		if (
			(event.target === container || event.target === first) &&
			event.shiftKey
		) {
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
} catch {
	focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
	const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
	let currentFocusedElement = null;
	let mouseClick = null;

	window.addEventListener('keydown', (event) => {
		if (navKeys.includes(event.code.toUpperCase())) {
			mouseClick = false;
		}
	});

	window.addEventListener('mousedown', (event) => {
		mouseClick = true;
	});

	window.addEventListener('focus', () => {
		if (currentFocusedElement) currentFocusedElement.classList.remove('focused');
		if (mouseClick) return;
		currentFocusedElement = document.activeElement;
		currentFocusedElement.classList.add('focused');
	}, true);
}

function pauseAllMedia() {
	document.querySelectorAll('.js-youtube').forEach((video) => {
		video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	});

	document.querySelectorAll('.js-vimeo').forEach((video) => {
		video.contentWindow.postMessage('{"method":"pause"}', '*');
	});

	document.querySelectorAll('video').forEach((video) => video.pause());
	document.querySelectorAll('product-model').forEach((model) => {
		if (model.modelViewerUI) model.modelViewerUI.pause();
	});
}

function removeTrapFocus(elementToFocus = null) {
	document.removeEventListener('focusin', trapFocusHandlers.focusin);
	document.removeEventListener('focusout', trapFocusHandlers.focusout);
	document.removeEventListener('keydown', trapFocusHandlers.keydown);
	if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
	if (event.code.toUpperCase() !== 'ESCAPE') return;
	const openDetailsElement = event.target.closest('details[open]');
	if (!openDetailsElement) return;
	const summaryElement = openDetailsElement.querySelector('summary');
	openDetailsElement.removeAttribute('open');
	summaryElement.setAttribute('aria-expanded', false);
	summaryElement.focus();
}

class QuantityInput extends HTMLElement {
	constructor() {
		super();

		this.input = this.querySelector('input');
		this.changeEvent = new Event('change', { bubbles: true })

		this.querySelectorAll('button').forEach(
			(button) => button.addEventListener('click', this.onButtonClick.bind(this))
		);
	}

	onButtonClick(event) {
		event.preventDefault();
		const previousValue = this.input.value;
		event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();

		if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);

	}
}

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, args), wait);
	};
}

function fetchConfig(type = 'json') {
	return {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
	};
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
	window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
	return function () {
		return fn.apply(scope, arguments);
	}
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

const currencySymbol = document.getElementById("_int").dataset.currency;
Shopify.moneyFormat = `${currencySymbol}{{amount}}`;

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
		var dollarsAmount = parts[0].replace(
			/(\d)(?=(\d\d\d)+(?!\d))/g,
			'$1' + thousands
		);
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
}

Shopify.breakpoints = {
	mobile: 749,
	tablet: 989
}

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
	initCountry: function () {
		var value = this.countryEl.getAttribute('data-default');
		Shopify.setSelectorByValue(this.countryEl, value);
		this.countryHandler();
	},
	initProvince: function () {
		var value = this.provinceEl.getAttribute('data-default');
		if (value && this.provinceEl.options.length > 0) {
			Shopify.setSelectorByValue(this.provinceEl, value);
		}
	},
	countryHandler: function (e) {
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
	clearOptions: function (selector) {
		while (selector.firstChild) {
			selector.removeChild(selector.firstChild);
		}
	},
	setOptions: function (selector, values) {
		for (var i = 0, count = values.length; i < values.length; i++) {
			var opt = document.createElement('option');
			opt.value = values[i];
			opt.innerHTML = values[i];
			selector.appendChild(opt);
		}
	}
};

// This cart error message is a global variable for use where cart AJAX calls fail and an appropriate message is not included in the response i.e cart_change endpoint
Shopify.cart_error_message = `The cart change couldn't be completed`;

if ((typeof window.Theme) == 'undefined') {
	window.Theme = {};
}

const strings = {
	usages: {
		mainProduct: 'main-product'
	}
}

//used in snippet/facets.liquid /rendered in section/main-collection-product-grid.liquid / also used in custom element header-drawer
class MenuDrawer extends HTMLElement {
	constructor() {
		super();

		this.mainDetailsToggle = this.querySelector('details');
		this.header = this.header || document.querySelector('.section-header');
		//Props for specifc use cases to power customs methods
		this.stickyAtc = document.querySelector('sticky-atc');
		this.fullBleedHeader = this.hasAttribute("data-full-bleed");

		// if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
		// view port height variable, no longer just for just iphone as above
		let setMobileHeight = (e) => {
			document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
		}
		document.addEventListener('DOMContentLoaded', setMobileHeight);
		window.addEventListener('resize', setMobileHeight);
		this.addEventListener('keyup', this.onKeyUp.bind(this));
		this.addEventListener('focusout', this.onFocusOut.bind(this));

		this.bindEvents();
	}

	bindEvents() {
		this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
		this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
	}

	onKeyUp(event) {
		if (event.code.toUpperCase() !== 'ESCAPE') return;

		const openDetailsElement = event.target.closest('details[open]');

		if (!openDetailsElement) return;

		openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
	}

	onSummaryClick(event) {
		const summaryElement = event.currentTarget;
		const detailsElement = summaryElement.parentNode;
		const isOpen = detailsElement.hasAttribute('open');
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		function addTrapFocus() {
			trapFocus(summaryElement.nextElementSibling);
			summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
		}

		if (detailsElement === this.mainDetailsToggle) {
			if (isOpen) event.preventDefault();
			isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
		} else {
			setTimeout(() => {
				detailsElement.classList.add('menu-opening');
				summaryElement.setAttribute('aria-expanded', true);
				!reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
			}, 100);
		}

		//Call custom methods in specific use cases
		if (this.stickyAtc) this.stickyAtcHandling(isOpen, summaryElement);
		if (this.fullBleedHeader) this.fullBleedHeaderHandling(isOpen);
		
	}

	openMenuDrawer(summaryElement) {
		setTimeout(() => {
			this.mainDetailsToggle.classList.add('menu-opening');
		});

		summaryElement.setAttribute('aria-expanded', true);
		trapFocus(this.mainDetailsToggle, summaryElement);
		document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);

		this.sortByModalObserver(event);
	}

	closeMenuDrawer(event, elementToFocus = false) {
		if (event !== undefined) {
			this.mainDetailsToggle.classList.remove('menu-opening');

			this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
				details.removeAttribute('open');
				details.classList.remove('menu-opening');
			});

			document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
			removeTrapFocus(elementToFocus);
			this.closeAnimation(this.mainDetailsToggle);
		}
	}

	onFocusOut(event) {
		setTimeout(() => {
			if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
		});
	}

	onCloseButtonClick(event) {
		const detailsElement = event.currentTarget.closest('details');
		this.closeSubmenu(detailsElement);
	}

	closeSubmenu(detailsElement) {
		detailsElement.classList.remove('menu-opening');
		detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
		removeTrapFocus();
		this.closeAnimation(detailsElement);
	}

	closeAnimation(detailsElement) {
		let animationStart;
		const handleAnimation = (time) => {
			if (animationStart === undefined) {
				animationStart = time;
			}
			const elapsedTime = time - animationStart;
			if (elapsedTime < 400) {
				window.requestAnimationFrame(handleAnimation);
			} else {
				detailsElement.removeAttribute('open');
				if (detailsElement.closest('details[open]')) {
					trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
				}
			}
		}
		window.requestAnimationFrame(handleAnimation);
	}

	stickyAtcHandling(isOpen, summaryElement) {
		if (summaryElement.classList.contains('header__icon--menu')) {
			if (!isOpen) {
				this.stickyAtc.classList.add('hidden');
			} else if (isOpen) {
				this.stickyAtc.classList.remove('hidden');
			}
		}
	}

	fullBleedHeaderHandling(isOpen) {
		this.header = document.querySelector('.section-header')
		if (!isOpen) {
			this.header.classList.remove("shopify-section-header-transparent");
		} else {
			this.header.classList.add("shopify-section-header-transparent");
		}
	}

	// Mutation observer to scroll to either sort by options or top of filters in filter modal on mobile (PLP)
	sortByModalObserver(event) {
		let targetModal = document.querySelector('.facets__disclosure');

		let options = {
			attributes: true
		};

		function handleMutation(records, observerObj){
			observerObj.disconnect();
			if (records.find((record) => record.attributeName === "open")){
				if (event.target.classList.contains('facets__open-sort') || event.target.closest('#facets__open-wrapper').classList.contains('facets__open-sort')) {
					document.querySelector('.facets__sort-by').scrollIntoView();
				} 
				if (event.target.classList.contains('facets__open-filters') || event.target.closest('#facets__open-wrapper').classList.contains('facets__open-filters')) {
					document.querySelector('.facets__summary').scrollIntoView(false);
				}
			};
		}

		let observer = new MutationObserver(handleMutation);
		observer.observe(targetModal, options);
	}
}

customElements.define('menu-drawer', MenuDrawer);

//headerDrawer extends MenuDrawer - used in section/header.liquid
class HeaderDrawer extends MenuDrawer {
	constructor() {
		super();

		this.announcementBar = this.announcementBar || document.getElementsByClassName('announcement')[0];
		this.checkWindowWidth();

		window.addEventListener('resize', () => {
			this.checkWindowWidth();
		})
	}
	
	openMenuDrawer(summaryElement) {
		this.mainDetailsToggle = this.querySelector('details');
		this.header = this.header || document.querySelector('.section-header');
		this.header.classList.add('shopify-section-header-mobnav');
		this.announcementBar.classList.add('hidden');

		setTimeout(() => {
			this.mainDetailsToggle.classList.add('menu-opening');
		});

		summaryElement.setAttribute('aria-expanded', true);
		trapFocus(this.mainDetailsToggle, summaryElement);
		document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
		document.body.classList.add(`header-mobnav_overlay`);
	}

	closeMenuDrawer(event, elementToFocus = false) {
		if (event !== undefined) {
			this.mainDetailsToggle.classList.remove('menu-opening');
			this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
				details.removeAttribute('open');
				details.classList.remove('menu-opening');
			});

			document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
			document.body.classList.remove(`header-mobnav_overlay`);
			this.header.classList.remove('shopify-section-header-mobnav');
			this.announcementBar.classList.remove('hidden');
			removeTrapFocus(elementToFocus);
			this.closeAnimation(this.mainDetailsToggle);
		}
	}

	checkWindowWidth() {
		if (window.innerWidth > Shopify.breakpoints.tablet) {
			this.header.classList.remove('shopify-section-header-mobnav');
			document.body.classList.remove(`header-mobnav_overlay`);
			this.announcementBar.classList.remove('hidden');
		}
	}
}

customElements.define('header-drawer', HeaderDrawer);

// use in collage.liquid (video pop up)/main-product.liquid (pop up)
class ModalDialog extends HTMLElement {
	constructor() {
		super();

		this.querySelector('[id^="ModalClose-"]').addEventListener(
			'click',
			this.hide.bind(this)
		);

		this.addEventListener('keyup', (event) => {
			if (event.code.toUpperCase() === 'ESCAPE') this.hide();
		});

		if (this.classList.contains('media-modal')) {
			this.addEventListener('pointerup', (event) => {
				if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
			});
		} else {
			this.addEventListener('click', (event) => {
				if (event.target.nodeName === 'MODAL-DIALOG') this.hide();
			});
		}
	}

	show(opener) {
		this.openedBy = opener;
		const popup = this.querySelector('.template-popup');
		document.body.classList.add('overflow-hidden');
		this.setAttribute('open', '');
		if (popup) popup.loadContent();
		trapFocus(this, this.querySelector('[role="dialog"]'));
		window.pauseAllMedia();
	}

	hide() {
		document.body.classList.remove('overflow-hidden');
		this.removeAttribute('open');
		removeTrapFocus(this.openedBy);
		window.pauseAllMedia();
	}
}

customElements.define('modal-dialog', ModalDialog);

//used sections/landing-mat.liquid
class LandingMat extends ModalDialog {
	constructor() {
		super();

		this.storeCountry = this.dataset.storeCountry;
		this.storeDomain = this.dataset.storeDomain;
		this.section = document.getElementById(this.parentElement.id);
		this.siblingStoreData = Array.from(this.querySelector("#SiblingStoreData").children).map(store => JSON.parse(store.innerHTML));
		this.testMode = this.dataset.testMode;
		this.matTitle = this.getElementsByClassName('landing-mat-modal__content-title')[0];
		this.matMessage = this.getElementsByClassName('landing-mat-modal__content-message')[0];
		this.matFlag = this.getElementsByClassName('landing-mat-modal__content-flag')[0];
		this.matRemainLink = this.getElementsByClassName('landing-mat-modal__content-remain-link')[0];
		this.destroyMat.bind(this);
	}

	connectedCallback() {
		let source = document.referrer;

		//set referrer to external source if test mode enabled
		if (this.testMode) source = "https://www.bbc.co.uk/programmes/m0012fb4";

		if (source && !source.includes(this.storeDomain)) {
			this.userLocation();
		} else {
			this.destroyMat();
		}
	}

	userLocation() {
		fetch("https://ipinfo.io", { headers: { 'Accept': "application/json" } })
			.then(response => response.json())
			.then((responseJSON) => {
				this.checkMatRequired(responseJSON.country)
			});
	}

	checkMatRequired(userLocation) {
		if (userLocation == this.storeCountry) {
			this.destroyMat;
		} else {
			let matContent = this.siblingStoreData.filter(store => store.country == userLocation)[0];
			matContent ? this.loadMat(matContent) : this.destroyMat();
		}
	}

	loadMat(matContent) {
		this.matTitle.innerText = matContent.title;
		this.matMessage.innerText = matContent.message;
		this.matFlag.srcset = matContent.store_flag;
		this.matRemainLink.innerText = matContent.remain_link;

		setTimeout(() => {
			this.setAttribute("open", "");
		}, 500);


		this.matFlag.addEventListener("click", (e) => {
			this.classList.add("landing-mat-modal--removal");
			window.location.href = matContent.store_url;
			this.destroyMat();
		});

		this.matRemainLink.addEventListener("click", (e) => {
			this.classList.add("landing-mat-modal--removal");
			setTimeout(() => {
				this.destroyMat();
			}, 1000);
		});
	}

	destroyMat() {
		this.remove();
	}
}
customElements.define('landing-mat', LandingMat);

//used in section/collage.liquid, snippets product-popup.liquid and snippets/product-thumbnail.liquid
class ModalOpener extends HTMLElement {
	constructor() {
		super();
		
		const button = this.querySelector('button');
		if (!button) return;

		button.addEventListener('click', () => {
			const modal = document.querySelector(this.getAttribute('data-modal'));
			if (modal) modal.show(button);
		});
	}
}
customElements.define('modal-opener', ModalOpener);

class QuickView extends HTMLElement {
	constructor(){
		super();

		/* Constructor properties & methods include
		- this.dialogWrapper: modal-dialog element to handle opening/closing for quick-view on plp
		- this.setObserver(): method for setting attribute observer for modal dialog opening to trigger method flow with assessRender() method and correct product handle
		- this.cachedDOM: property to initialise an empty array, this will be filled with objects containing a product handle, quick view DOM and productData in JSON format
		- this.contentWrapper: property of quickview's main content parent element
		- this.fullDetailsLink: property of the full details link, used and updated in multiple methods so defined here
		- this.zoomOn: property, Boolean, needs to be default set to false at class lifecycle start.
		*/

		this.dialogWrapper = document.querySelector('modal-dialog#quick-view-plp-modal');
		this.setObserver();
		this.cachedDOM = [];
		this.contentWrapper = this.querySelector('.quick-view__content-wrapper');
		this.fullDetailsLink = this.querySelector(':scope .full-details__link');
		this.zoomOn = false;
	}

	setObserver(){
		const modalObserver = new MutationObserver((mutationList) => {
			mutationList.forEach(mutation => {
				if(mutation.type == 'attributes'){
					if(mutation.oldValue !== null){
						return
					} else {
						this.product = this.dialogWrapper.openedBy.closest('.quick-view__button').dataset.productHandle;
						this.quickViewCard = this.dialogWrapper?.openedBy?.closest('product-card') || null;
						this.assessRender(this.product);
					}
				}
			})
		})

		modalObserver.observe(this.dialogWrapper, { attributeFilter: ['open'], attributeOldValue: true });
	}

	assessRender(productToFetch, fromSwatch){
		this.toggleLoadingSpinner(false);
		if(fromSwatch === true){
			this.currentSwatches = this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container').outerHTML;
		}
		this.resetModalContent();
		if(this.cachedDOM.length >= 1){
			// uses .find() method on cacheDOM array to look by handle for previously cached product, if found, the handle's returned to productToRender, otherwise returns null
			let productToRender = this.cachedDOM.find(cachedDOMEntry => productToFetch === cachedDOMEntry.handle) ? this.cachedDOM.find(cachedDOMEntry => productToFetch === cachedDOMEntry.handle) : null;
			// if productToRender is not null, renderQuickViewFromCache() is fired with handle, otherwise productFetchAPI() is fired with handle from assessRender() args
			productToRender != null ? this.renderQuickViewFromCache(productToRender, fromSwatch) : this.productFetchAPI(productToFetch, fromSwatch);
		} else {
			// if cachedDOM array has no entries, assume API call
			this.productFetchAPI(productToFetch, fromSwatch);
		}
	}

	async productFetchAPI(productToFetch, fromSwatch){
		fetch(window.Shopify.routes.root + `products/${productToFetch}?sections=quick-view-section`)
			.then(res => res.json())
			.then(response => {
				let parser = new DOMParser();
				let quickViewContent = parser.parseFromString(response['quick-view-section'], 'text/html');
				this.appendChild(quickViewContent.querySelector('.quick-view__content-wrapper'));
				let productJSON = JSON.parse(this.querySelector('.product-json').innerText);
				this.setAttribute('aria-label', `quick view modal for ${productJSON.title}`);
				this.dataset.handle = productJSON.handle;
				this.cacheQuickViewDOM(this.querySelector('.quick-view__content-wrapper').cloneNode(true), productJSON.handle, productJSON, fromSwatch);
				if(!fromSwatch){
					this.handleSwatches(productJSON);
				} else {
                    this.updateSelectedSwatchForCachedCurrentSwatches(productToFetch);
				}
				this.toggleLoadingSpinner(true);
			})
	}

	async handleSwatches(productData){
		// Clones swatches from relevant product card, inserts them to modal, removes see-more logic and sets event listener to call assessRender() with swatches product handle as argument
        let swatchesForQuickView;
		if (!!this.quickViewCard) {
			swatchesForQuickView = this.quickViewCard.querySelector('.product-sibling-swatch-container.card__swatch--container').cloneNode(true);
		} else {
			try {
				let swatchCallResponse = await fetch(`${window.Shopify.routes.root}products/${productData.handle}?section_id=product-card-sibling-selector-swatches`);
				let responseText = await swatchCallResponse.text();
				let parserDOM = new DOMParser();
				let swatchData = parserDOM.parseFromString(responseText, 'text/html');
				swatchesForQuickView = swatchData.querySelector('.product-sibling-swatch-container.card__swatch--container');
			} catch (error) {
				console.error('Error fetching swatches:', error);
				return;
			}
		}
		let swatchesWrapper = this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container');
		// swatchesWrapper.outerHTML = swatchesForQuickView.outerHTML;
		if (swatchesWrapper) {
			swatchesWrapper.outerHTML = swatchesForQuickView.outerHTML;
		}
		let allSwatches = this.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch');
		// Removes swatch--selected class from all swatches
		allSwatches.forEach(swatch => {
			swatch.classList.remove('swatch--selected');
		})
		// Finds selected swatch and applies class 
		let selectedSwatch = Array.from(allSwatches).find(swatch => swatch.dataset.handle == productData.handle);
		selectedSwatch ? selectedSwatch.classList.add('swatch--selected') : null;

		// See more swatch toggle
		let seeMoreToggle = this.querySelector(':scope .card__swatch.card__swatch--see-more') ? this.querySelector(':scope .card__swatch.card__swatch--see-more') : null;
		if(seeMoreToggle != null){
			seeMoreToggle.remove();
		}
		allSwatches.forEach(swatch => {
			swatch.classList.remove('card__swatch--overspill-narrow-card');
			swatch.classList.remove('card__swatch--overspill-wide-card');
			swatch.addEventListener('click', this.assessRender.bind(this, swatch.dataset.handle, true));
		})
	}

    updateSelectedSwatchForCachedCurrentSwatches(productToFetchHandle){
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.currentSwatches, 'text/html');
        const productHandle = '/products/' + productToFetchHandle;

        // Select all elements with the specified class
        const swatches = doc.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch.swatch-circle');

        // Remove selected classes from all swatches
        swatches.forEach(swatch => {
            swatch.classList.remove('card__swatch--selected', 'swatch--selected');
        });

        // Find the swatch with the matching data-url attribute
        const targetSwatch = Array.from(swatches).find(swatch => swatch.getAttribute('data-url') === productHandle);

        // Add the selected classes to the target swatch
        if (targetSwatch) {
            targetSwatch.classList.add('card__swatch--selected', 'swatch--selected');
        }

        // Convert the updated document back to a string
        this.currentSwatches = doc.body.innerHTML;

        this.querySelector(':scope .product-sibling-swatch-container.card__swatch--container').outerHTML = this.currentSwatches;

        let allSwatches = this.querySelectorAll(':scope .sibling-swatch.card__swatch.color-swatch');
        allSwatches.forEach(swatch => {
            swatch.addEventListener('click', this.assessRender.bind(this, swatch.dataset.handle, true));
        })
    }

	swatch_clicked_event(product){
			Shopify.analytics.publish("colour_swatch_click", {
				"currency": `${Shopify.currency.active}`,
				"value": `${product.price / 100}`,
				"item_list_id": "",
				"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
				"affiliation": `${product.vendor}`,
				"items": [
					{
						"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
						"item_id": `${product.variants[0].sku}`,
						"item_name": `${product.title}`,
						"item_brand": `${product.vendor}`,
						"item_category": `${product.type}`,
						"item_variant": `${product.title} - ${product.variants[0].title}`,
						"affiliation": `${product.vendor}`,
						"price": `${product.price / 100}`,
						"currency": `${Shopify.currency.active}`,
						"quantity": 1,
						"discount": 0,
						"index": `${this.dialogWrapper.openedBy.closest('li.grid__item')?.dataset?.position || 0}`
					}
				]
			})
	}

	cacheQuickViewDOM(DOMToCache, handle, data, fromSwatch){
		// Stores product handle, completed quickView DOM, and productData JSON in an object in the cachedDOM array
		this.cachedDOM.push({ handle: handle, DOM: DOMToCache, productData: data});
		if(fromSwatch === true){
			this.swatch_clicked_event(data)
		} else {
			this.quick_view_opened(data)
		}
	}

	quick_view_opened(product){
		Shopify.analytics.publish("quick_view_opened", {
			"currency": `${Shopify.currency.active}`,
			"value": `${product.price / 100}`,
			"item_list_id": "",
			"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
			"affiliation": `${product.vendor}`,
			"items": [
				{
					"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
					"item_id": `${product.variants[0].sku}`,
					"item_name": `${product.title}`,
					"item_brand": `${product.vendor}`,
					"item_category": `${product.type}`,
					"item_variant": `${product.title} - ${product.variants[0].title}`,
					"affiliation": `${product.vendor}`,
					"price": `${product.price / 100}`,
					"currency": `${Shopify.currency.active}`,
					"quantity": 1,
					"discount": 0,
					"index": `${this.dialogWrapper.openedBy.closest('li.grid__item')?.dataset?.position || 0}`
				}
			]
		})
	}

	async renderQuickViewFromCache(productToRender, fromSwatch){
		// clears modal, re-inserts quickView DOM from cached JSON object,
		// fires necessary methods to initialise listeners
		this.resetModalContent(true);
		this.setAttribute('aria-label', `quick view modal for ${productToRender.productData.title}`);
		document.querySelector('.quick-view__content-wrapper').outerHTML = productToRender.DOM.outerHTML;
		if(!fromSwatch) {
            this.handleSwatches(productToRender);
        } else {
            this.updateSelectedSwatchForCachedCurrentSwatches(productToRender.productData.handle);
        }
		this.toggleLoadingSpinner(true);
		if(fromSwatch === true){
			this.swatch_clicked_event(productToRender.productData)
		}
	}

	resetModalContent(cache = false){
        // Deletes all content from quickView modal to enable fresh section render
		this.querySelector('.quick-view__content-wrapper') ? this.querySelector('.quick-view__content-wrapper').remove() : null;
		// If method called from renderQuickViewFromCache it will re-create a content wrapper to re-append cached content
		if(cache){
			let contentWrapper = document.createElement('div');
			let classesForWrapper = ['quick-view__content-wrapper', 'product', 'grid', 'grid--2-col-desktop', 'grid--1-col-tablet-down'];
			classesForWrapper.forEach(classForWrapper => {
				contentWrapper.classList.add(classForWrapper);
			});
			this.appendChild(contentWrapper);
		}
    }

	toggleLoadingSpinner(force){
		// Turns a loading screen on/off
		let loadingSpinner = this.querySelector('.loading-overlay__spinner');
		loadingSpinner.classList.toggle('hidden', force);
	}

	closeQuickView(){
		// Closes modal on ATC event
		document.body.classList.remove('overflow-hidden');
		this.dialogWrapper.removeAttribute('open');
		removeTrapFocus(this.dialogWrapper.openedBy);
	}

	updatePricing(currentVariant){
		if(currentVariant.compare_at_price === null){
			this.querySelector('.price__sale .price-item--regular').style.display = 'none';
			this.querySelector('.price__sale .price-item--sale').innerHTML = `${Shopify.formatMoney(currentVariant.price, Shopify.moneyFormat)} ${document.getElementById('_int').dataset.currencyCode}`;
		} else {
			this.querySelector('.price__sale .price-item--sale').innerHTML = `${Shopify.formatMoney(currentVariant.price, Shopify.moneyFormat)} ${document.getElementById('_int').dataset.currencyCode}`;
			this.querySelector('.price__sale .price-item--regular').style.display = 'flex';
		}
	}
}
customElements.define('quick-view', QuickView)

//used in snippets/product-thumbnail.liquid, specific to PDP
class PdpModalOpener extends ModalOpener {
	constructor() {
		super();

		this.handleMobileGallery();
	}

	handleMobileGallery() {
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
}
customElements.define('pdp-modal-opener', PdpModalOpener);

// used alongside modal-dialog in collage.liquid (video pop up) and video.liquid
class DeferredMedia extends HTMLElement {
	constructor() {
		super();

		const poster = this.querySelector('[id^="Deferred-Poster-"]');
		if (!poster) return;
		if (this !== 'product-gallery-deferred-media') poster.addEventListener('click', this.loadContent.bind(this));
	}

	loadContent() {
		window.pauseAllMedia();
		if (!this.getAttribute('loaded')) {
			const content = document.createElement('div');
			content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
			this.appendChild(content.querySelector('video, model-viewer, iframe'));
			this.videoSrcHandler();
		}
	}

	videoSrcHandler() {
		let video = this.querySelector('#mp4-video-player');
		if (video !== null) {
			if (window.matchMedia(`(min-width: ${Shopify.breakpoints.mobile}px)`).matches) {
				video.src = video.dataset.desktopSrc;
			} else {
				video.src = video.dataset.mobileSrc;
			}
		}
		this.initiateVideo();
	}

	initiateVideo() {
		this.setAttribute('loaded', true);
		if (this.querySelector('iframe') === null) {
			if (this.dataset.autoplaySetting !== 'true') {
				this.querySelector('video').play();
				this.querySelector('video').addEventListener('click', () => {
					this.querySelector('video').paused === true ? play() : pause();
				})
			}
		}
		//previously, .focus() was applied to the end of the above line, but it was causing the video to be skipped immediately to on the PDP mobile gallery (PdpDeferredMedia class/custom element, which extends this method). Workaround needs to be found if this causes issues in the future
		// if (this.classList.contains('product__lifestyle-video')) {
		// 	this.style.paddingBottom = 'unset';
		// }
	}
}

customElements.define('deferred-media', DeferredMedia);

// used in snippet product media (rendered in featured-product and main-product)
class ProductGalleryDeferredMedia extends DeferredMedia {
	constructor() {
		super();
		const poster = this.querySelector('[id^="Deferred-Poster-"]');
		if (!poster) return;

		if ((this.dataset.autoplaySetting && this.dataset.autoplaySetting == "true")) {
			window.addEventListener('DOMContentLoaded', this.loadContent.bind(this));
		} else {
			poster.addEventListener('click', this.loadContent.bind(this));
		}
	}

	loadContent() {
		super.loadContent();
		if ((this.dataset.autoplaySetting && this.dataset.autoplaySetting == "true")) {
			if (this.querySelector('video')) {
				let video = this.querySelector('video');
				setTimeout(function () {
					video.play();
				}, 200);
			}
		}
	}
}

customElements.define('product-gallery-deferred-media', ProductGalleryDeferredMedia);

class SliderComponent extends HTMLElement {
	constructor() {
		super();

		this.slider = this.querySelector('[id^="Slider-"]');
		this.sliderItems = this.slider.querySelectorAll(':scope > [id^="Slide-"]');
		this.enableSliderLooping = false;
		this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
		this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
		this.progressSlider = this.querySelector(':scope .progress-slider');

		this.enableSliderLooping = false;
		this.currentPageElement = Array.from(this.querySelectorAll('.slider-counter--current')).filter(element => element.clientHeight > 0)[0];
		this.pageTotalElement = Array.from(this.querySelectorAll('.slider-counter--total')).filter(element => element.clientHeight > 0)[0];

		let prevButtons = Array.from(this.querySelectorAll('button[name="previous"]')).filter(button => button.clientHeight > 0);
		let sliderButtons = prevButtons.concat(Array.from(this.querySelectorAll('button[name="next"]')).filter(button => button.clientHeight > 0));

		if (sliderButtons.length > 2) {
			this.locateCorrectSliderButtons(sliderButtons);
		} else {
			this.prevButton = sliderButtons.filter(sliderButton => sliderButton.name === 'previous')[0];
			this.nextButton = sliderButtons.filter(sliderButton => sliderButton.name === 'next')[0];
		}

		if (!this.slider || !this.nextButton) return;

		this.initPages();
		const resizeObserver = new ResizeObserver(entries => this.initPages());
		resizeObserver.observe(this.slider);

		this.slider.addEventListener('scroll', this.update.bind(this));
		if (this.prevButton) this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
		if (this.nextButton) this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
		this.sliderControlButtons.forEach(button => {
			button.addEventListener('click', (event) => this.onProgressBarButtonClick(event));
		});
	}

	locateCorrectSliderButtons(sliderButtons) {
		sliderButtons.forEach(sliderButton => {
			let buttonParent = sliderButton.closest('slider-component') || sliderButton.closest('slideshow-component') || sliderButton.closest('gallery-component');
			if (buttonParent === this) {
				if (sliderButton.name === 'previous') {
					this.prevButton = sliderButton;
				} else if (sliderButton.name === 'next') {
					this.nextButton = sliderButton;
				}
			}
		})
	}

	initPages() {
		if (this.sliderItemsToShow.length < 2) return;

		this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
		this.slidesPerPage = Math.round((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
		this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;


		// is there a progress slider present within this instance of slider, and does the amount of progress lines within it not match the total pages?

		if (this.progressSlider) {
			if (this.totalPages <= 1) {
				this.progressSlider.remove();
			} else {
				if ((this.querySelectorAll(('.slider-counter__link').length !== this.totalPages)) || (!this.querySelector('.slider-counter__link--active') || !this.querySelector('.gallery-counter__link--active'))) {
					debounce(this.regulateProgressSlider(), 500);
				}
			}
		} else {
			this.update();
		}
	}

	resetPages() {
		this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
		this.initPages();
	}

	update() {
		const previousPage = this.currentPage;
		this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

		if (this.currentPageElement && this.pageTotalElement) {
			this.currentPageElement.textContent = this.currentPage;
			if (this.currentPage > this.sliderControlButtons.length) {
				this.totalPages = this.currentPage;
				if (this.progressSlider && this.recursionCap == false){
					this.regulateProgressSlider();
					this.recursionCap = false;
				}
			}
			this.pageTotalElement.textContent = this.totalPages;
		}

		if (this.sliderControlButtons.length) {
			this.sliderControlButtons.forEach(link => {
				link.classList.remove('slider-counter__link--active');
				link.removeAttribute('aria-current');
			});
			if(this.sliderControlButtons[this.currentPage - 1] != undefined){
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

	isSlideVisible(element, offset = 0) {
		const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
		return (element.offsetLeft + element.clientWidth) <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
	}

	onButtonClick(event) {
		event.preventDefault();
		const step = event.currentTarget.dataset.step || 1;
		this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + (step * this.sliderItemOffset) : this.slider.scrollLeft - (step * this.sliderItemOffset);
		this.slider.scrollTo({
			left: this.slideScrollPosition
		});
	}

	onProgressBarButtonClick(event) {
		event.preventDefault();
		const currentIndex = Array.from(this.sliderControlButtons).indexOf(event.currentTarget);
		if (currentIndex !== -1) {
			this.slider.scrollTo({
				left: currentIndex * this.sliderItemOffset
			});
			this.update();
		}
	}

	regulateProgressSlider() {
		let progressSliderDifference = this.totalPages - this.querySelectorAll('.slider-counter__link').length;
		let progressSliderContainer = this.querySelector('.gallery__control-wrapper');

		if (progressSliderDifference > 0 && this.querySelectorAll('.slider-counter__link').length > 0) {
			for (let i = 0; i < progressSliderDifference; i++) {
				let progressSliderItemTemplate = this.querySelector('.slider-counter__link').outerHTML;
				progressSliderContainer.innerHTML += progressSliderItemTemplate;
			}

		} else if (progressSliderDifference < 0) {
			for (let i = 0; i < (progressSliderDifference * -1); i++) {
				let progressSliderItems = progressSliderContainer.querySelectorAll('.slider-counter__link');
				progressSliderItems[0].remove();
			}
		}

		this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');

		this.sliderControlButtons.forEach(line => {
			line.style.width = `${100 / this.totalPages}%`;
		})
		this.recursionCap = true;
		this.update();
	}
}

customElements.define('slider-component', SliderComponent);

class GalleryComponent extends HTMLElement {
	constructor() {
		super();
		this.slider = this.querySelector('[id^="Slider-"]');
		this.sliderItems = this.slider.querySelectorAll(':scope > [id^="Slide-"]');
		this.usage = this.dataset.usage;
		this.slider.scrollLeft = 0;
		this.sliderFirstItemNode = this.querySelector('.slider__slide:not(.hidden)');
		this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
		this.sliderLastItem = this.sliderItemsToShow[this.sliderItemsToShow.length - 1];
		this.currentPage = this.sliderLastItem ? Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1 : 1;
		this.gallerySlideshowViewportLength = (this.querySelector(':scope .product__media-list').clientWidth * (this.querySelectorAll(':scope .gallery__controls .gallery-counter__link').length / 2));
		this.galleryPrevButton = this.querySelector('.slider-button--prev');
		this.galleryNextButton = this.querySelector('.slider-button--next');
		this.currentPageElement = Array.from(this.querySelectorAll('.slider-counter--current')).filter(element => element.clientHeight > 0)[0];

		this.galleryControlWrapper = this.querySelector('.gallery-buttons');
		this.galleryControlLinksArray = Array.from(this.querySelectorAll('.gallery-counter__link')).filter(button => button.clientHeight > 0);
		this.galleryControlLinksArray.forEach(link => link.addEventListener('click', this.updateActiveImage.bind(this)));
		this.slider.addEventListener('scroll', this.updateActiveGalleryControl.bind(this));
	
		this.setGalleryControlListeners(this.galleryPrevButton, this.galleryNextButton);
		if (this.usage === strings.usages.mainProduct) this.updateActiveGalleryControl();
		this.manageGalleryControls(this.sliderItemsToShow.length < 2);
	}

	manageGalleryControls(hideOrShow){
		this.galleryNextButton.classList.toggle('hidden', hideOrShow);
		this.galleryPrevButton.classList.toggle('hidden', hideOrShow);
	}

	setGalleryControlListeners(previous, next){
		previous.addEventListener('click', this.previousGalleryImage.bind(this));
		next.addEventListener('click', this.nextGalleryImage.bind(this));
		if(this.currentPage == 1){
			previous.setAttribute('disabled', 'disabled');
		} else if(this.currentPage == this.sliderItems.length){
			next.setAttribute('disabled', 'disabled');
		}
	}

	updateGallery(currentVariant) {
		let variantColourway = currentVariant.option1.replace(' ', '-');
		let galleryMediaArray = Array.from(this.querySelectorAll('.product__media-item'));
		let variantImageCount = 0;

		
		if (currentVariant.featured_media.alt.includes(currentVariant.option1)) {
			galleryMediaArray.forEach(media => {
				let mediaIds = media.id.split(' ');
				mediaIds.forEach(id => {
					id === variantColourway ? (media.classList.remove('hidden'), variantImageCount += 1) : media.classList.add('hidden');
				})
			})
		}

		this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
		this.sliderLastItem = this.sliderItemsToShow[this.sliderItemsToShow.length - 1];
		this.sliderFirstItemNode = this.querySelector('.slider__slide:not(.hidden)');
		this.slider.scrollLeft = 0;

		if (this.usage === strings.usages.mainProduct) {
			this.updateGalleryControlQuantity(variantImageCount);
			this.updateActiveGalleryControl();
		}
	}

	updateGalleryControlQuantity(variantImageCount) {
		let galleryControlsContainer = Array.from(this.querySelectorAll('.gallery__control-wrapper')).filter(element => element.clientWidth > 0)[0];
		let currentGalleryControls = galleryControlsContainer.children;
		let galleryControlTemplate = currentGalleryControls[0].outerHTML;
		let galleryControlsDifference = variantImageCount - currentGalleryControls.length;
		if (galleryControlsDifference !== 0 || galleryControlsContainer.closest('.gallery-thumbnail-slider')) {
			if (galleryControlsDifference > 0) {
				for (let i = 0; i < galleryControlsDifference; i++) {
					galleryControlsContainer.innerHTML += galleryControlTemplate;
				}
			} else if (galleryControlsDifference < 0) {
				let quantityToDelete = galleryControlsDifference * -1;
				for (let i = 0; i < quantityToDelete; i++) {
					currentGalleryControls[0].remove();
				}
	}
			currentGalleryControls.forEach((galleryControl, index) => {
				galleryControl.setAttribute('aria-label', `${galleryControlsContainer.dataset.langstringLoad} ${(index + 1)} ${galleryControlsContainer.dataset.langstringOf} ${currentGalleryControls.length}`);
				galleryControl.addEventListener('click', this.updateActiveImage.bind(this));

				if (galleryControlsContainer.closest('.gallery-thumbnail-slider')) {
					let newThumbnailMedia = this.sliderItemsToShow[index].querySelector('img').src.replace('width=1500', 'width=50');
					galleryControl.querySelector('img').src = newThumbnailMedia;
				}

				if (galleryControlsContainer.closest('.progress-slider')) {
					this.pageTotalElement.innerText = `${currentGalleryControls.length}`;
					this.totalPages = currentGalleryControls.length;
					galleryControl.style.width = `${100 / currentGalleryControls.length}%`;
				}
			})

			this.galleryControlLinksArray = Array.from(currentGalleryControls);
			this.updateActiveGalleryControl();
		}
	}

	updateActiveGalleryControl() {
		this.currentPage = this.sliderLastItem ? Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1 : 1;

		if (!this.galleryControlLinksArray.length) return;

		this.galleryControlLinksArray.forEach(link => {
			link.classList.remove('gallery-counter__link--active');
			link.classList.remove('slider-counter__link--active');
			link.removeAttribute('aria-current');
		});

		this.galleryControlLinksArray[this.currentPage - 1].classList.add('gallery-counter__link--active');
		this.galleryControlLinksArray[this.currentPage - 1].setAttribute('aria-current', true);
	}

	updateActiveImage(event) {
		event.preventDefault();
		const slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.galleryControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
		this.slider.scrollTo({
			left: slideScrollPosition
		});
	}

	nextGalleryImage(){
		event.preventDefault();
		if(this.currentPage < this.sliderItemsToShow.length){
			event.currentTarget.removeAttribute('disabled');
			this.galleryPrevButton.removeAttribute('disabled');
			this.slider.scrollLeft = (this.slider.scrollLeft + this.slider.clientWidth);
			this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;
			this.currentPage == (this.sliderItemsToShow.length - 1) ? event.currentTarget.setAttribute('disabled', 'disabled') : event.currentTarget.removeAttribute('disabled');
		} else {
		}
	}

	previousGalleryImage(){
		event.preventDefault();
		if(this.slider.scrollLeft !== 0){
			this.galleryNextButton.removeAttribute('disabled');
			this.slider.scrollLeft = (this.slider.scrollLeft - this.slider.clientWidth);
			this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;
			this.currentPage == 2 ? event.currentTarget.setAttribute('disabled', 'disabled') : event.currentTarget.removeAttribute('disabled');
		} else {
		}
	}
}

customElements.define('gallery-component', GalleryComponent);

class SlideshowComponent extends SliderComponent {
	constructor() {
		super();

		this.sliderControlWrapper = this.querySelector('.slider-buttons');
		// back to this.enableSliderLooping = true - previously changed to
		// this.enableSliderLooping = this.querySelector('.slideshow__autoplay');
		// to allow for non looping slides when not autoplay but issues when no autoplay - slideshow still loops
		this.enableSliderLooping = true;
		
		if (!this.sliderControlWrapper) return;

		this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide');

		if (this.sliderItemsToShow.length > 0) this.currentPage = 1;

		this.sliderControlLinksArray = Array.from(this.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
		this.sliderControlLinksArray.forEach(link => link.addEventListener('click', this.linkToSlide.bind(this)));
		this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this));
		this.setSlideVisibility();

		if (this.slider.getAttribute('data-autoplay') === 'true') this.setAutoPlay();
	}

	setAutoPlay() {
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

	onButtonClick(event) {
		super.onButtonClick(event);

		const isFirstSlide = this.currentPage === 1;
		const isLastSlide = this.currentPage === this.sliderItemsToShow.length;

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

	update() {
		super.update();

		this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
		//previously commented out to allow for non looping slides when not autoplay - but interfers with looping slides - 
		this.prevButton.removeAttribute('disabled');


		if (!this.sliderControlButtons.length) return;

		this.sliderControlButtons.forEach(link => {
			link.classList.remove('slider-counter__link--active');
			link.removeAttribute('aria-current');
		});
		if(this.sliderControlButtons[this.currentPage - 1] != undefined){
			this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
			this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
		}
	}

	autoPlayToggle() {
		this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
		this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
		this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
	}

	focusOutHandling(event) {
		const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);

		if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
		this.play();
	}

	focusInHandling(event) {
		const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);

		if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
			this.play();
		} else if (this.autoplayButtonIsSetToPlay) {
			this.pause();
		}
	}

	play() {
		this.slider.setAttribute('aria-live', 'off');
		clearInterval(this.autoplay);
		this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
	}

	pause() {
		this.slider.setAttribute('aria-live', 'polite');
		clearInterval(this.autoplay);
	}

	togglePlayButtonState(pauseAutoplay) {
		if (pauseAutoplay) {
			this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
			this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
		} else {
			this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
			this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
		}
	}

	autoRotateSlides() {
		const slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
		this.slider.scrollTo({
			left: slideScrollPosition
		});
	}

	setSlideVisibility() {
		this.sliderItemsToShow.forEach((item, index) => {
			const button = item.querySelector('a');

			if (index === this.currentPage - 1) {
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

	linkToSlide(event) {
		event.preventDefault();
		const slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
		this.slider.scrollTo({
			left: slideScrollPosition
		});
	}
}

customElements.define('slideshow-component', SlideshowComponent);

class VariantPicker extends HTMLElement {
	constructor() {
		super();

		//base properties
		this.usage = this.dataset.usage;
		this.stickyAtcContainer = document.querySelector('sticky-atc');
		this.fieldsets = Array.from(this.querySelectorAll('fieldset'));
		this.options = this.getSelectedOptions();
		this.colourLangstring = this.dataset.colourLangstring;
		this.showMoreButton = this.querySelector('#product-form__show-more-label');
		this.showLessButton = this.querySelector('#product-form__show-less-label');

		//Set properties for associated components

		switch (this.usage) {
			case strings.usages.mainProduct:
				this.galleryComponent = document.querySelector('gallery-component');
				this.infoBadgesContainer = document.querySelectorAll('info-badges');
				break;
			case 'quick-view':
				this.galleryComponent = document.querySelector('quick-view gallery-component');

				break
		}

		//listeners
		this.addEventListener('change', this.onVariantChange);
		if (this.showMoreButton) this.showMoreButton.addEventListener('click', this.handleShowMoreClick.bind(this));
		if (this.showLessButton) this.showLessButton.addEventListener('click', this.handleShowLessClick.bind(this));

		//Method calls
		this.updateMasterId();
	}

	onVariantChange(event) {

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
					if (this.infoBadgesContainer) this.infoBadgesContainer.forEach(infoBadgeContainer => {
						infoBadgeContainer.dataset.variant = this.currentVariant.title;
						infoBadgeContainer.querySelectorAll('.badge').forEach((badge) => {
							badge.dataset.variant = this.currentVariant.title;
						})
						infoBadgeContainer.toggleBadge(this.currentVariant);
					});
					this.updateSizeGuide(this.currentVariant);
					break;
			}
		}
	}

	updateVariantAvailability(currentVariant) {
		if (currentVariant.available == true) {
			document.querySelector('.product .price__badge-sold-out').style.display = "none";
			document.querySelector('.product .price__badge-in-stock').style.display = "block";
		} else {
			document.querySelector('.product .price__badge-sold-out').style.display = "block";
			document.querySelector('.product .price__badge-in-stock').style.display = "none";
		}
	}
	updateSizeGuide(selectedVariant){
		let selectedSizeString = document.querySelector('.size-guide__selected-size');
		selectedSizeString.innerHTML = selectedVariant.option2;
	}

	updateVariantInput() { //Simplify with removal of addons. Unknown purpose of new dispatchEvent.
		if (this.usage === strings.usages.mainProduct) {
			let productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);

			productForms.forEach((productForm) => {
				// extra level of logic in place to ensure that addons ATCs within PDPs aren't changed (due to query selector all above when usage is main-product)
				let input = productForm.querySelector('input[name="id"]');
				if (this.currentVariant) input.value = this.currentVariant.id;
				//input.dispatchEvent(new Event('change', { bubbles: true }));
			});
		} else {
			//find my atc
			let targetContainer = this.closest(this.usage) || this.closest(`.${this.usage}`);
			let productForm = targetContainer.querySelector(`#product-form-${this.dataset.section}`);
			let input = productForm.querySelector('input[name="id"]');
			input.value = this.currentVariant.id;
			input.setAttribute('data-option-name', this.currentVariant.option1)
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}

	getSelectedOptions() {
		let options = this.fieldsets.map((fieldset) => {
			return Array.from(fieldset.querySelectorAll('.product-form__variant-input')).find((fieldsetChild) => fieldsetChild.selected || fieldsetChild.checked).value;
		});
		return options;
	}

	updateMasterId() {
		this.currentVariant = this.getVariantData().find((variant) => {
			return !variant.options.map((option, index) => {
				return this.options[index] === option;
			}).includes(false);
		});
	}

	getVariantData() { //Can this just be used to populate a prop in the constructor which is then referenced throughout class lifespan?
		this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
		return this.variantData;
	}

	updateOptionAvailability(event) {
		this.fieldsetsToUpdate = Array.from(this.querySelectorAll(`fieldset:not([id="${event.target.closest('fieldset').id}"])`));

		this.fieldsetsToUpdate.forEach(fieldset => {
			fieldset.querySelectorAll('label').forEach(label => {
				label.classList.remove('product-form__option--unavailable');
			});
		})
		
		this.regulateOosOptions(event);
		this.regulateUnavailableOptions(event);
	}

	regulateOosOptions(event) {
		this.variantData.forEach(variant => {
			if (!variant.available && variant.option1 === event.target.value) {
				variant.options.forEach(option => {
					this.fieldsetsToUpdate.forEach(fieldset => {
						if (fieldset.querySelector(`[value="${option}"]`)) {
							fieldset.querySelector(`[value="${option}"]`).nextElementSibling ? fieldset.querySelector(`[value="${option}"]`).nextElementSibling.classList.add('product-form__option--unavailable') : fieldset.querySelector(`[value="${option}"]`).classList.add('product-form__option--unavailable');
						}
					})
				})
			}
		})
	}

	regulateUnavailableOptions(event) {
		let currentVariants = this.variantData.filter(variant => variant.option1 === event.target.value);
		let currentAvailableOption2s = currentVariants.map(variant => variant.option2);
			
		this.fieldsetsToUpdate.forEach(fieldset => {
			Array.from(fieldset.querySelectorAll('.product-form__variant-input')).forEach(variantPickerOption => {
				if (!currentAvailableOption2s.includes(variantPickerOption.value)) {
					fieldset.querySelector(`[value="${variantPickerOption.value}"]`).nextElementSibling ? fieldset.querySelector(`[value="${variantPickerOption.value}"]`).nextElementSibling.classList.add('product-form__option--unavailable') : fieldset.querySelector(`[value="${variantPickerOption.value}"]`).classList.add('product-form__option--unavailable');
				}
			})
		})
	}

	updateColourLabel(event) {
		let fieldset = event.target.closest("fieldset");
		if (this.colourLangstring === fieldset.dataset.option) {
			let colourLabel = fieldset.querySelector('.form__label');
			colourLabel.querySelector('.form__label--value').innerText = `${this.options[0]}`;
		}
	}

	updateURL() {
		if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
		window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
	}

	updateShareUrl() {
		const shareButton = document.getElementById(`Share-${this.dataset.section}`);

		if (!shareButton) return;

		shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
	}

	updatePickupAvailability() {
		const pickUpAvailability = document.querySelector('pickup-availability');

		if (!pickUpAvailability) return;

		if (this.currentVariant && this.currentVariant.available) {
			pickUpAvailability.fetchAvailability(this.currentVariant.id);
		} else {
			pickUpAvailability.removeAttribute('available');
			pickUpAvailability.innerHTML = '';
		}
	}

	removeErrorMessage() {
		const section = this.closest('section');
		if (!section) return;
		const productForm = section.querySelector('product-form');
		if (productForm) productForm.handleErrorMessage();
	}

	renderProductInfo() {
		if (this.usage === strings.usages.mainProduct) {
			fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
				.then((response) => response.text())
				.then((responseText) => {
					const id = `price-${this.dataset.section}`;
					const html = new DOMParser().parseFromString(responseText, 'text/html');
					const destinations = Array.from(document.querySelectorAll(`#${id}`));
					const source = html.getElementById(id);

					destinations.forEach(destination => {
						if (source && destination) destination.innerHTML = source.innerHTML;
						if (destination) destination.classList.remove('visibility-hidden');
					})
				});
		}
	}

	toggleAddButton(disable = true, text, modifyClass = true) {
		let productForm;

		if (this.usage === strings.usages.mainProduct) {
			productForm = document.getElementById(`product-form-${this.dataset.section}`);
		} else {
			let targetContainer = this.closest(this.usage) || this.closest(`.${this.usage}`);
			productForm = targetContainer.querySelector('form');
		}

		if (!productForm) return;

		productForm.querySelectorAll('[name="add"]').forEach(addButton => {
			const addButtonText = addButton.querySelector('span');
			if (!addButton) return;

			if (disable) {
				addButton.setAttribute('disabled', 'disabled');
				if (text) addButtonText.textContent = text;
			} else {
				addButton.removeAttribute('disabled');
				addButtonText.textContent = window.variantStrings.addToCart;
			}

			if (!modifyClass) return;
		})
	}

	setUnavailable() {
		let button;

		if (this.usage === strings.usages.mainProduct) {
			button = document.getElementById(`product-form-${this.dataset.section}`);
			let prices = document.querySelectorAll(`#price-${this.dataset.section}`);
			if (prices) {
				prices.forEach(price => {
					price.classList.add('visibility-hidden');
				})
			}
		} else {
			let targetContainer = this.closest(this.usage) || this.closest(`.${this.usage}`);
			button = targetContainer.querySelector('form');
		}

		button.querySelectorAll('[name="add"]').forEach(addButton => {
			if (!addButton) return;
			const addButtonText = addButton.querySelector('[name="add"] > span');
			addButtonText.textContent = window.variantStrings.unavailable;
		})
	}

	handleShowMoreClick(event) {
		this.overThresholdInputs = Array.from(event.target.closest('fieldset').children).filter(elem => elem.classList.value.includes('hidden'));
		this.overThresholdInputs.forEach(input => input.classList.remove('hidden'));
		this.showMoreButton.classList.add('hidden');
	}

	handleShowLessClick(event) {
		this.showLessButton.classList.add('hidden');
		this.overThresholdInputs.forEach(input => input.classList.add('hidden'));
		this.showMoreButton.classList.remove('hidden');
	}
}

customElements.define('variant-picker', VariantPicker);

class FreeShipping extends HTMLElement {
	constructor() {
		super();

		this.remainder = this.getElementsByClassName('fsn__remainder')[0];
		this.threshold = parseInt(this.remainder.dataset.threshold);
		this.beforeThresholdMessage = this.children[0];
		this.afterThresholdMessage = this.children[1];
		this.progressBarMode = this.dataset.progress;
	}

	static get observedAttributes() { return ['data-cart-total']; }

	attributeChangedCallback(name, oldValue, newValue) {
		this.updateAmount(name, parseInt(oldValue), parseInt(newValue));
	}

	updateAmount(name, oldValue, newValue) {
		let newTotal = newValue;
		let newRemainder = (this.threshold - newTotal);
		this.remainder.innerText = Shopify.formatMoney(newRemainder, Shopify.moneyFormat);
		this.handleMessageFlip(newRemainder);
		if (this.progressBarMode) this.updateProgressBar(newRemainder);
	}

	updateProgressBar(newRemainder) {
		this.progressBar = this.querySelector(".fsn__progress-outer");
		let newProg = ((this.threshold - newRemainder) / this.threshold) * 100;
		this.progressBar.firstElementChild.style["width"] = `${newProg}%`;
	}

	handleMessageFlip(newRemainder) {
		if (newRemainder > 0 && !this.afterThresholdMessage.classList.contains("hidden")) {
			this.afterThresholdMessage.classList.add("hidden");
			this.beforeThresholdMessage.classList.remove("hidden");
		} else if (newRemainder <= 0 && !this.beforeThresholdMessage.classList.contains("hidden")) {
			this.beforeThresholdMessage.classList.add("hidden");
			this.afterThresholdMessage.classList.remove("hidden");
		}
	}
}
customElements.define('free-shipping-notice', FreeShipping);

class GridToggle extends HTMLElement {
	constructor() {
		super();

		this.toggle = this;
		this.increase = this.querySelectorAll('[data-action="increase"]')[0];
		this.decrease = this.querySelectorAll('[data-action="decrease"]')[0];
		this.buttons = Array.from(this.getElementsByClassName("grid__toggle-button"));
		this.breakpoints = Shopify.breakpoints;
		this.currentBreakpoint = this.identifyBreakpoint(this.breakpoints);
		this.currentProductPerRow = this.dataset[`${this.currentBreakpoint}Products`];
		this.setUpToggle();

		this.toggle.addEventListener('click', this.handleToggleClick.bind(this));

		window.addEventListener('resize', debounce(this.resetToggle.bind(this), 300));
	}

	handleToggleClick(event) {
		this.grid = document.getElementById('product-grid');
		let clicked = event.target;

		if (!clicked.classList.contains('grid__toggle-button--active') && clicked.classList.contains('grid__toggle-button')) {
			let bp = this.currentBreakpoint === "mobile" ? "" : `-${this.currentBreakpoint}`;
			let prevVal = this.getElementsByClassName('grid__toggle-button--active')[0].dataset.value.toString();
			let newVal = clicked.dataset.value.toString();
			this.buttons.forEach(button => button.classList.remove('grid__toggle-button--active'));
			clicked.classList.add('grid__toggle-button--active');
			this.grid.classList.replace(`grid--${prevVal}-col${bp}`, `grid--${newVal}-col${bp}`);
		}
	}

	identifyBreakpoint(breakpoints) {
		if (window.innerWidth <= breakpoints.mobile) {
			return "mobile";
		} else if (window.innerWidth > breakpoints.mobile && window.innerWidth <= breakpoints.tablet) {
			return "tablet";
		} else {
			return "desktop";
		}
	}

	setUpToggle() {
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

	setActive() {
		this.buttons.forEach(button => button.dataset.value === this.currentProductPerRow ? button.classList.add('grid__toggle-button--active') : null);
	}

	resetToggle(){
		this.currentBreakpoint = this.identifyBreakpoint(Shopify.breakpoints);
		this.setUpToggle();
	}

}
customElements.define('grid-toggle', GridToggle);

class ProductCard extends HTMLElement {
	constructor() {
		super();

		if (this.getElementsByClassName("card__product-json")[0]) {
			this.product = JSON.parse(this.getElementsByClassName("card__product-json")[0].innerText);
		}

		this.cardTitleLink = this.getElementsByClassName("card-information__text") ? this.getElementsByClassName("card-information__text")[0].firstElementChild : null;
		this.cardImageLink = this.getElementsByClassName("card__image-link") ? this.getElementsByClassName("card__image-link")[0] : null;
		this.image = this.querySelector(':scope .card__image');
		this.primaryImage = this.image?.src || null;
		this.secondImage = this.findSecondImage();
		this.image?.addEventListener('mouseenter', () => this.imageChangeOnHover());

		if (this.product) {
			if (this.dataset.hideSiblingSelector != "true") {
				this.loadSwatches(this.dataset.productTitle);
			}
			this.priceContainer = this.product.compare_at_price ? this.getElementsByClassName("price__sale")[0] : this.getElementsByClassName("price-item")[0];
		}

		this.infoBadges = this.querySelector('info-badges');
		this.swatchesHidden = true;
		this.quickViewButton = this.querySelector(':scope .quick-view__button');
		if(!this.closest('.shopify-section').parentElement.classList.contains('nosto_element')){
			this.cardTitleLink?.addEventListener('click', (event) => {
				event.preventDefault();
				this.handleSelectItemEvent(this.cardTitleLink, this.product)
			});
			this.cardImageLink?.addEventListener('click', (event) => {
				event.preventDefault();
				this.handleSelectItemEvent(this.cardTitleLink, this.product)
			});
		}
	}

	async handleSelectItemEvent(link, product){
		Shopify.analytics.publish("select_item", {
			"currency": `${Shopify.currency.active}`,
			"value": `${product.price / 100}`,
			"item_list_id": "",
			"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
			"affiliation": `${product.vendor}`,
			"items": [
				{
					"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
					"item_id": `${product.variants[0].sku}`,
					"item_name": `${product.title}`,
					"item_brand": `${product.vendor}`,
					"item_category": `${product.type}`,
					"item_variant": `${product.title} - ${product.variants[0].title}`,
					"affiliation": `${product.vendor}`,
					"price": `${product.price / 100}`,
					"currency": `${Shopify.currency.active}`,
					"quantity": 1,
					"discount": 0,
					"index": `${this.closest('li.grid__item').dataset.position}`
				}
			]
		})
		window.location.href = link;
	}

	async loadSwatches(productHandle){
		fetch(window.Shopify.routes.root + `products/${productHandle}?sections=product-card-sibling-selector-swatches`)
			.then(res => res.json())
			.then(response => {
				let parser = new DOMParser();
				let siblingSelector = parser.parseFromString(response['product-card-sibling-selector-swatches'], 'text/html');
				siblingSelector = siblingSelector.querySelector('.card__swatch--container');
				this.querySelector('.card-information__wrapper').appendChild(siblingSelector);
			})
			.then(() => {
				this.initSwatches();
			})
	}

	initSwatches(){
		this.swatchesContainer = this.querySelector(`.card__swatch--container`);
		this.swatches = Array.from(this.getElementsByClassName('card__swatch'));
		this.swatchesContainer?.addEventListener('click', this.onSwatchClick.bind(this));
		if(this.swatches.length > 2){
			this.querySelector(':scope .card__swatch--see-more')?.addEventListener('click', this.toggleSwatchList.bind(this));
		}
	}

	findSecondImage(){
		if(this.querySelector('.card__swatch--selected')){
			return this.querySelector('.card__swatch--selected').dataset.secondImage !== '' ? this.querySelector('.card__swatch--selected').dataset.secondImage : null;
		} else if(this.dataset.secondImage !== '') {
			return this.dataset.secondImage;
		} else {
			return this.image.src;
		}
	}

	imageChangeOnHover(){
		// setTimeout is present only as a debounce so as to prevent image.src & image.srcset updates too fast resulting in network request cancellations in chrome
		if(this.secondImage != null && window.innerWidth > 998){
			let itemImage = this.querySelector(':scope .media--hover-effect .card__image');
			setTimeout(() => {
				itemImage.src = this.secondImage;
				itemImage.srcset = this.secondImage;
			}, 100);
			this.querySelector('.media--hover-effect img')?.addEventListener('mouseout', () => {
				setTimeout(() => {
					itemImage.src = this.primaryImage;
					itemImage.srcset = this.primaryImage;
				}, 100)
			});
		}
	}

	async onSwatchClick(e) {
		if (e.target.classList.contains('card__swatch') && !e.target.classList.contains('card__swatch--see-more')) {
			this.swatches.forEach(swatch => swatch.classList.remove("card__swatch--selected"));
			e.target.classList.add("card__swatch--selected");
			this.swatches.forEach(swatch => swatch.classList.remove("swatch--selected"));
			e.target.classList.add("swatch--selected");
			let selectedSwatch = e.target;
			this.updateImage(selectedSwatch);
			this.secondImage = this.findSecondImage();
			this.updateLink(selectedSwatch);
			this.updateTitle(selectedSwatch);
			this.updatePrice(selectedSwatch);
			this.updateVariantId(selectedSwatch);
			this.quickViewButton ? this.quickViewButton.dataset.productHandle = selectedSwatch.dataset.handle: null;
			this.product = await this.fetchNewProductJson(selectedSwatch.dataset.handle);
			this.updateBadges(selectedSwatch);
		}
	}

	async updateBadges(){
		let variantAsInt = parseInt(this.dataset.variantId);
		let currentVariant = this.product.variants.find((variant) => variant.id == variantAsInt);
		this.infoBadges?.toggleBadge(currentVariant);
	}

	async fetchNewProductJson(handle){
		let productData = await fetch(`${window.Shopify.routes.root}products/${handle}.js`)
			.then(response => response.json())
			.then(data => { return data });
		this.swatch_click_event(this.product);
		return productData
	}

	swatch_click_event(product){
		Shopify.analytics.publish("colour_swatch_click", {
			"currency": `${Shopify.currency.active}`,
			"value": `${product.price / 100}`,
			"item_list_id": "",
			"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
			"affiliation": `${product.vendor}`,
			"items": [
				{
					"item_list_name": `${window.location.pathname.split('/collections/')[1]}`,
					"item_id": `${product.variants[0].sku}`,
					"item_name": `${product.title}`,
					"item_brand": `${product.vendor}`,
					"item_category": `${product.type}`,
					"item_variant": `${product.title} - ${product.variants[0].title}`,
					"affiliation": `${product.vendor}`,
					"price": `${product.price / 100}`,
					"currency": `${Shopify.currency.active}`,
					"quantity": 1,
					"discount": 0,
					"index": `${this.closest('li.grid__item')?.dataset?.position || 0}`
				}
			] 
		})
	}

	updateImage(swatch) {
		let newImg = swatch.dataset.mainImage;
		this.primaryImage = newImg;
		this.querySelector(':scope .card__image').src = this.primaryImage;
		this.querySelector(':scope .card__image').srcset = this.primaryImage;
	}

	updateSecondImage(swatch) {
		this.secondImage = swatch.dataset.secondImage;
	}

	updateTitle(swatch){
		const leadTitle = this.querySelector(':scope .card__title span.lead-title');
		const subTitle = this.querySelector(':scope .sub-title');
		if (leadTitle) {
			leadTitle.innerText = swatch.dataset.title;
		}
		if (subTitle) {
			subTitle.innerText = swatch.dataset.subtitle;
		}
	}

	updateVariantId(swatch) {
		let newId = swatch.dataset.variantId;
		let newHandle = swatch.dataset.handle;
		this.dataset.variantId = newId;
		this.dataset.productTitle = newHandle;
	}

	updatePrice(swatch){
		let universalPriceParent = this.querySelector(':scope .price');
		let salePriceParent = this.querySelector(':scope .price__sale');
		let mainPriceParent = this.querySelector(':scope .price .price__regular');
		let comparePrice = swatch.dataset.comparePrice ? swatch.dataset.comparePrice : null;
		if(comparePrice != null){
			universalPriceParent.classList.add('price--on-sale');
			salePriceParent.innerHTML = `<span class="price-item price-item--regular">${comparePrice}</span><span class="price-item--sale">${swatch.dataset.price}</span>`;
		} else {
			universalPriceParent.classList.remove('price--on-sale');
			mainPriceParent.innerHTML = `<span class="visually-hidden visually-hidden--inline">Regular price</span> <span class="price-item price-item--regular">${swatch.dataset.price}</span>`;
		}
	}

	updateLink(swatch) {
		let newLink;		
		newLink = swatch.dataset.url;
		this.cardTitleLink.href = newLink;
		this.cardImageLink.href = newLink;
	}

	toggleSwatchList(e){
		let seeMoreSwatch = this.querySelector(':scope .card__swatch--see-more');
		if(this.swatchesHidden){
			e.currentTarget.querySelectorAll(':scope span').forEach(spanElem => {
				spanElem.innerText = spanElem.innerText.replace('+', '-')
			});
			this.showSwatches();
			seeMoreSwatch.classList.toggle('active-position', this.swatchesHidden);
			this.swatchesHidden = false;
		} else {
			e.currentTarget.querySelectorAll(':scope span').forEach(spanElem => {
				spanElem.innerText = spanElem.innerText.replace('-', '+')
			});
			this.hideSwatches();
			seeMoreSwatch.classList.toggle('active-position', this.swatchesHidden);
			this.swatchesHidden = true;
		}
	}

	showSwatches(){
		let hiddenSwatches = window.innerWidth < 750 ? this.querySelectorAll(':scope .sibling-swatch:nth-child(n+3):not(.card__swatch--see-more') : this.querySelectorAll(':scope .sibling-swatch:nth-child(n+5):not(.card__swatch--see-more')
		hiddenSwatches.forEach(hiddenSwatch => {
				hiddenSwatch.classList.add('show');
		});
		let swatchContainer = this.querySelector(':scope .product-sibling-swatch-container');
		swatchContainer.classList.add('open-swatches');
	}

	hideSwatches(){
		let allSwatchesOnCard = this.querySelectorAll(':scope .card__swatch');
		let swatchTotal = allSwatchesOnCard.length;
		if(window.innerWidth > 750){
			for(let i = 4; i < swatchTotal; i++){
				if(!allSwatchesOnCard[i].classList.contains('card__swatch--see-more')){
					allSwatchesOnCard[i].classList.remove('show');
				}
			}
		} else {
			for(let i = 2; i < swatchTotal; i++){
				if(!allSwatchesOnCard[i].classList.contains('card__swatch--see-more')){
					allSwatchesOnCard[i].classList.remove('show');
				}
			}
		}
		let swatchContainer = this.querySelector(':scope .product-sibling-swatch-container');
		swatchContainer.classList.remove('open-swatches');
	}
}
customElements.define('product-card', ProductCard);

class InfoBadges extends HTMLElement {
	constructor() {
		super();
		this.badges = Array.from(this.querySelectorAll('.badge'));
		if(this.dataset.usage == 'product-card'){
			this.currentVariant = this.closest('product-card').product.variants.find((variant) => variant);
			this.toggleBadge(this.currentVariant);
		} else if(this.dataset.usage == 'main-product'){
			this.currentVariant = this.closest('.product-main').querySelector('variant-picker').currentVariant;
			this.toggleBadge(this.currentVariant, true);
		}
	}

	toggleBadge(currentVariant, firedOnPageLoad=false) {
		if(firedOnPageLoad == true){
			for(let i = 0; i < this.badges.length; i++){
				if(this.badges[i].dataset.variant != currentVariant.title){
					this.badges[i].remove();
				}
			}
		}
		this.badges.forEach((badge) => {
			if (badge.dataset.variant == currentVariant.title && badge.innerText != "" ){
				badge.classList.remove('hidden')
			} else {
				badge.classList.add('hidden')
			}
		});
	}
}

customElements.define('info-badges', InfoBadges);

class VideoBanner extends HTMLElement {
	constructor() {
		super();

		this.player = this.firstElementChild;
		this.wideBreakPoint = (Shopify.breakpoints.mobile + 1);
		this.wideViewPort = window.matchMedia(`(min-width: ${this.wideBreakPoint}px)`);
		this.resizeVideo(this.wideViewPort);
	}

	resizeVideo() {
		let src = this.dataset.mobileSrc;
		let poster = this.dataset.mobilePoster;

		if (this.wideViewPort.matches) {
			src = this.dataset.desktopSrc;
			poster = this.dataset.desktopPoster;
		}

		this.player.src = src;
		this.player.poster = poster;
	}
}
customElements.define('video-banner', VideoBanner);

class CartRemoveButton extends HTMLElement {
	constructor() {
		super();

		this.debouncedOnClick = debounce(() => {
			const container = this.closest('cart-modal') || this.closest('cart-items');
			container.updateQuantity(this.dataset.index, 0);
		}, 500);

		this.addEventListener('click', (event) => {
			event.preventDefault();
			this.debouncedOnClick();
		})
	}
}

customElements.define('cart-remove-button', CartRemoveButton);

class VideoControlButton extends HTMLElement {
	constructor() {
		super();

		this.controlButton = this.querySelector('button');
		this.playSVG = this.querySelector('.video-control-button__play');
		this.pauseSVG = this.querySelector('.video-control-button__pause');
		this.targetVideo = document.querySelector('.video-control-button--target');

		this.controlButton.addEventListener('click', () => {
			this.pauseSVG.classList.contains('hidden') ? this.playVideo() : this.pauseVideo();
		});

		window.addEventListener('DOMContentLoaded', () => {
			this.playVideo();
		})
	}

	pauseVideo() {
		this.targetVideo.pause();
		this.pauseSVG.classList.add('hidden');
		this.playSVG.classList.remove('hidden');
	}

	playVideo() {
		this.targetVideo.play();
		this.playSVG.classList.add('hidden');
		this.pauseSVG.classList.remove('hidden');
	}
}

customElements.define('video-control-button', VideoControlButton);

class CountdownTimer extends HTMLElement {
	constructor(){
		super();
		this.expirationDayAsString = this.dataset.expDate != null ? this.dataset.expDate : null;
		this.expirationTimeAsString = this.dataset.expTime != null ? this.dataset.expTime : null;
		let expirationAsString = this.formatDateString(this.expirationDayAsString, this.expirationTimeAsString);

		
		this.second = 1000;
		this.minute = this.second * 60;
		this.hour = this.minute * 60;
		this.day = this.hour * 24;
		
		this.countDownFire(expirationAsString);
	}

	/* This method takes the inputs from theme settings, validates and formats them for Date Objects them */
	formatDateString(expDate, expTime){
		/* RegEx to validate time format correctly in HH:MM, otherwise returns null */
		if(expTime.match(/^[0-2][0-9]:[0-5][0-9]/)){
			if(expTime[0] > 1){
				if(expTime[1] > 4){
					/* fallback fires if HH exceeds 23, also returns null */
					this.fireFallBack();
					return null
				}
			}			
		/* re-format date from UK DD/MM/YYYY to YYYY/MM/DD for Date String */
		let expDateArr = expDate.split('/');
		let formattedDate = `${expDateArr[2]}-${expDateArr[1]}-${expDateArr[0]}`;
		/* Construct Date String */
		let dateString = `${formattedDate}T${expTime}`;
		return dateString;
		} else {
			return null
		}
	}

	countDownFire(expirationAsString){
		/* providing formatDateString didn't return null, countdown interval is fired */
		if(expirationAsString != null){
			const countingInterval = setInterval(() => {
				let expObj = new Date(expirationAsString).getTime();
				let now = new Date().getTime();
				let timeDiff = expObj - now;
				expObj = expObj - 1000;
				if(timeDiff < 1){
					/* when countdown hits 0, kill interval, fire fallback method */
					clearInterval(countingInterval);
					this.fireFallBack();
				} else {
					this.calcAndPrintCount(timeDiff);
				}
			}, this.second)
		} else {
			this.fireFallBack();
		}
	}	

	calcAndPrintCount(timeDiff){
		/* method for updating countdown timer on the front end, hides zero'd denominations (i.e instead of "0 days 22 h 18m 10s" it will hide "0 days") */
		let daysLeft = Math.floor(timeDiff / this.day)
		this.querySelector(':scope .days-remaining').innerText = daysLeft;
		if(daysLeft == 1){
			this.querySelector(':scope .day-string').style.display = 'inline';
			this.querySelector(':scope .days-string').style.display = 'none';
		} else if(daysLeft < 1) {
			this.querySelector(':scope .days-remaining').style.display = 'none';
			this.querySelector(':scope .day-string').style.display = 'none';
			this.querySelector(':scope .days-string').style.display = 'none';
		} else if (daysLeft > 1){
			this.querySelector(':scope .days-string').style.display = 'inline';
			this.querySelector(':scope .day-string').style.display = 'none';
		}
		if(Math.floor((timeDiff % this.day) / this.hour) >= 1){
			this.querySelector(':scope .hours-remaining').innerText = Math.floor((timeDiff % this.day) / this.hour);
			this.querySelector(':scope .hours-wrapper').style.display = 'inline';
		} else {
			this.querySelector(':scope .hours-wrapper').style.display = 'none';
		}
		if(Math.floor((timeDiff % this.hour) / this.minute) >= 1){
			this.querySelector(':scope .minutes-remaining').innerText = Math.floor((timeDiff % this.hour) / this.minute);
			this.querySelector(':scope .mins-wrapper').style.display = 'inline';
		} else {
			this.querySelector(':scope .mins-wrapper').style.display = 'none';
		}
		if(Math.floor((timeDiff % this.minute) / this.second) >= 1){
			this.querySelector(':scope .seconds-remaining').innerText = Math.floor((timeDiff % this.minute) / this.second)
			this.querySelector(':scope .secs-wrapper').style.display = 'inline';
		} else {
			this.querySelector(':scope .secs-wrapper').style.display = 'none';
		}
	}

	fireFallBack(){
		/* swaps the displayed element for the fallback message instead of the timer */
		this.querySelector(':scope .active-timer').style.display = 'none';
		this.querySelector(':scope .inactive-timer').style.display = 'block';
	}
}
customElements.define('countdown-timer', CountdownTimer);



class SiblingSelector extends HTMLElement {
	constructor() {
		super();

		this.bikePDP = document.querySelector('.product-main-bike') ? true : false;

		// set local storage prop for variant option value if required 
		// set xScroll to stored value if referrer is another bike PDP
		if (!document.referrer.includes('products')) {
			localStorage.setItem('previousSelectedOptionValue', '')
		} else {
			if(this.bikePDP) this.setScrollHeight()
		}
		
		// if bike PDP, reset stored xScroll value and set event listener for swatch click
		if(this.bikePDP) {
			localStorage.setItem('previousPDPScrollHeight', '')
			this.addEventListener('click', this.storeScrollHeight.bind(this))
		}
		
		// props and listeners for variant selection persistence if products has variant options 
		this.productHasVariants = document.querySelector('.product__info-container').querySelector('variant-picker') ? true : false;

		if (this.productHasVariants) {
			this.variantFieldset = document.querySelector(`variant-picker[data-product-id="${this.dataset.prodId}"]`).querySelector(`[data-option="${this.dataset.variantOption}"]`);
		}

		this.selectedOptionValue = this.variantFieldset ? this.variantFieldset.querySelector('[checked]').value : null;

		if (this.variantFieldset) {
			this.variantFieldset.addEventListener('change', this.getSelectedOptionValue.bind(this));
			document.addEventListener('DOMContentLoaded', this.selectOptionValue.bind(this));
		}
	}

	selectOptionValue() {
		let storedValue = localStorage.getItem('previousSelectedOptionValue');
		setTimeout(() => {
			Array.from(this.variantFieldset.querySelectorAll('input')).forEach((elem) => {
				if (elem.value == storedValue) {
					elem.click();
				} else {
					null;
				}
			})
		}, 500);
	}

	getSelectedOptionValue(event) {
		if (event.target.classList.value.includes('product-form__variant-input')) {
			this.selectOptionValue = event.target.value;
			this.storeOption(this.selectedOptionValue);
		}
	}

	storeOption(optionValue) {
		localStorage.setItem('previousSelectedOptionValue', optionValue);
	}

	storeScrollHeight(e) {
		localStorage.setItem('previousPDPScrollHeight', window.scrollY);
	}

	setScrollHeight() {
		window.scrollTo(0, localStorage.getItem('previousPDPScrollHeight'));
	}
}

customElements.define('sibling-selector', SiblingSelector);

class DsHotspots extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback () {
        this.initDotInteractions();
        document.addEventListener('keydown', this.handleEscape);
        this.openFirstHotspot();
        let parentComponent = this.closest('slideshow-component');
        if (parentComponent) {
            parentComponent.addEventListener('click', this.handleClickOutsideHotspots);
        }
    }

    disconnectedCallback () {
        document.removeEventListener('keydown', this.handleEscape);
        let parentComponent = this.closest('slideshow-component');
        if (parentComponent) {
            parentComponent.removeEventListener('click', this.handleClickOutsideHotspots);
        }
    }

    handleEscape (event) {
        if (event.key === "Escape") {
            const openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
            const openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');
            openProducts.forEach(product => {
                product.removeAttribute('open');
            });
            openDots.forEach(dot => {
                dot.setAttribute('aria-expanded', 'false');
            });
        }
    }

    initDotInteractions () {
        const dots = this.querySelectorAll('.ds-hotspots__dot');
        const products = this.querySelectorAll('.ds-hotspots__product');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                products.forEach(product => {
                    if (product !== dot.parentNode.querySelector('.ds-hotspots__product')) {
                        product.removeAttribute('open');
                    }
                });

                dots.forEach(otherDot => {
                    if (otherDot !== dot) {
                        otherDot.setAttribute('aria-expanded', 'false');
                    }
                });

                const productInfo = dot.parentNode.querySelector('.ds-hotspots__product');
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

    openFirstHotspot () {
        const firstDot = this.querySelector('.ds-hotspots__dot');
        const firstProduct = firstDot ? firstDot.parentNode.querySelector('.ds-hotspots__product') : null;
        if (firstDot && firstProduct) {
            firstProduct.setAttribute('open', '');
            firstDot.setAttribute('aria-expanded', 'true');
        }
    }

    handleClickOutsideHotspots (event) {
        if (this.contains(event.target) && !event.target.closest('.ds-hotspots__dot, .ds-hotspots__product-wrapper, .slider-button')) {
            const openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
            const openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');
            openProducts.forEach(product => {
                product.removeAttribute('open');
            });
            openDots.forEach(dot => {
                dot.setAttribute('aria-expanded', 'false');
            });
            return;
        }
        if (event.target.closest('.slider-button')) {
            const openProducts = this.querySelectorAll('.ds-hotspots__product[open]');
            const openDots = this.querySelectorAll('.ds-hotspots__dot[aria-expanded="true"]');

            openProducts.forEach(product => {
                product.removeAttribute('open');
            });
            openDots.forEach(dot => {
                dot.setAttribute('aria-expanded', 'false');
            });

            setTimeout(() => {
                const parentComponent = this.closest('slideshow-component');
                const currentSlide = parentComponent.querySelector('.slideshow__slide[aria-hidden="false"]');

                let targetSlide;
                if (event.target.closest('.slider-button--next')) {
                    let nextSlide = currentSlide.nextElementSibling;
                    while (nextSlide && !nextSlide.classList.contains('slideshow__slide')) {
                        nextSlide = nextSlide.nextElementSibling;
                    }
                    targetSlide = nextSlide;
                } else if (event.target.closest('.slider-button--prev')) {
                    let prevSlide = currentSlide.previousElementSibling;
                    while (prevSlide && !prevSlide.classList.contains('slideshow__slide')) {
                        prevSlide = prevSlide.previousElementSibling;
                    }
                    targetSlide = prevSlide;
                }
                if (targetSlide) {
                    const firstDot = targetSlide.querySelector('.ds-hotspots__dot');
                    const firstProduct = firstDot ? firstDot.parentNode.querySelector('.ds-hotspots__product') : null;
                    if (firstDot && firstProduct) {
                        firstProduct.setAttribute('open', '');
                        firstDot.setAttribute('aria-expanded', 'true');
                    }
                }
            }, 300);
            return;
        }
    }
}

customElements.define('ds-hotspots', DsHotspots);

class ArticleProgressBar extends HTMLElement {
	constructor() {
		super();

		this.body = document.querySelector('body');
		this.progressBar = this.querySelector('.article__progress-bar');

		window.addEventListener('scroll', this.stretchBar.bind(this));
	}

	stretchBar() {
		let pixelsScrolled = window.scrollY;
		let viewportHeight = window.innerHeight;
		let totalHeight = this.body.scrollHeight;

		let percentageScrolled = (pixelsScrolled / (totalHeight - viewportHeight)) * 100;

		this.progressBar.style.width = Math.round(percentageScrolled) + "%";
	}
}

customElements.define('article-progress-bar', ArticleProgressBar);