if (!customElements.get('product-form')) {
		customElements.define('product-form', class ProductForm extends HTMLElement {
		constructor() {
			super();

			this.form = this.querySelector('form');
			this.form.querySelector('[name=id]').disabled = false;

			this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
			this.cartModal = document.querySelector('cart-modal');
			this.freeShippingNotices = document.getElementsByClassName('fsn');
		}

		onSubmitHandler(evt) {
			evt.preventDefault();

			const submitButton = this.querySelector('[type="submit"]');

			if (submitButton.classList.contains('loading')) return;

			this.handleErrorMessage();
			this.cartModal.setActiveElement(document.activeElement);

			submitButton.setAttribute('aria-disabled', true);
			submitButton.classList.add('loading');
			this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			const formData = new FormData(this.form);
			formData.append('sections', this.cartModal.getSectionsToRender().map((section) => section.id));
			formData.append('sections_url', window.location.pathname);

			config.body = formData;

			fetch(`${routes.cart_add_url}`, config)
				.then((response) => response.json())
				.then((response) => {
					if (response.status) {
						this.handleErrorMessage(response.description);
						return;
					}
					this.cartModal.renderContents(response);
					
					this.updateFreeShippingNotices();
					const addedToCartEvent = new Event('added_to_cart');
					this.dispatchEvent(addedToCartEvent);
				})
				.catch((e) => {
					console.error(e);
				})
				.finally(() => {
					submitButton.classList.remove('loading');
					submitButton.removeAttribute('aria-disabled');
					this.querySelector('.loading-overlay__spinner').classList.add('hidden');
				}
			);
		}

		updateFreeShippingNotices() {
			fetch("/cart", {method: "GET", headers: {Accept: 'application/json'}})
			.then((response) => response.json())
			.then((response) => {
				Array.from(this.freeShippingNotices).forEach(notice => notice.setAttribute("data-cart-total", response.total_price));
			})		
		}

		handleErrorMessage(errorMessage = false) {
			this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
			this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

			this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

			if (errorMessage) {
				this.errorMessage.textContent = errorMessage;
			}
		}
	});
}