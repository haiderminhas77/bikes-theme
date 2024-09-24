class CartModal extends HTMLElement {
    constructor() {
        super();
        
        this.modal = document.getElementById('cart-modal');

        this.header = document.querySelector('header');
        this.querySelector('#CartModal-Overlay').addEventListener('click', this.close.bind(this));
        this.quantityInput = document.querySelector('.quantity__input');
        this.freeShippingNotices = document.getElementsByClassName('fsn');
        this.cartLink = document.getElementById('cart-icon-bubble');
        this.cartLink.href = "";
        this.cartLink.addEventListener('click', this.handleCartLinkClick.bind(this));
        this.checkoutContainer = this.querySelector('#cart-modal__checkout');

        this.modal.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
        this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
            closeButton.addEventListener('click', this.close.bind(this))
        );

        this.debouncedOnChange = debounce((event) => {
            this.onChange(event);
        }, 300);
        this.addEventListener('change', this.debouncedOnChange.bind(this));
    }

    open() {
        document.querySelectorAll('modal-dialog').forEach(modal => {
            modal.hide()
        });
        // here the animation doesn't seem to always get triggered. A timeout seem to help
        setTimeout(() => {this.classList.add('animate', 'active')});
        document.body.classList.add('overflow-hidden');
        this.querySelector('.cart-modal__contents-inner').classList.remove('hidden');

        this.modal.addEventListener('transitionend', () => {
            this.modal.focus();
            trapFocus(this.modal);
        }, {
            once: true
        });

        if(this.dataset.nostoEnabled == true) {
            Nosto.reloadCart()
        };
    }

    close() {
        document.body.classList.remove('overflow-hidden');
        this.classList.remove('active');
        this.querySelector('.cart-modal__contents-inner').classList.add('hidden');

        // if (this.isHeaderSticky === true) {
        //     this.shopifySectionHeader.style.position = 'sticky';
        // }

        // document.body.removeEventListener('click', this.onBodyClick);
        removeTrapFocus(this.activeElement);
    }

    renderContents(parsedState) {
        this.productId = parsedState.id;

        this.updateCartModal(parsedState);

        // if (this.fullBleedHeader) this.fullBleedHeader.reveal();

        // if (window.getComputedStyle(this.shopifySectionHeader).position === 'sticky') {
        //     this.isHeaderSticky = true;
        // }

        this.open();
        this.view_cart_event();

        setTimeout(() => {
            this.querySelector('#CartModal-Overlay').addEventListener('click', this.close.bind(this));
            this.open();
        });
    }

    getSectionsToRender() {
        return [{
            id: 'cart-icon-bubble'
        }, {
            id: 'cart-modal-button'
        }, {
            id: 'cart-modal-items'
        }, {
            id: 'cart-modal-subtotal'
        } ];
    }

    onChange(event) {
        this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
    }

    handleCartLinkClick(e) {
        e.preventDefault();

        let sections = `${window.location.pathname}?sections=${this.getSectionsToRender().map((section) => section.id)}`;

        fetch(sections)
        .then(response => response.text())
        .then((responseText) => {
            const parsedState = JSON.parse(responseText);
            this.renderContents(parsedState);
        }).finally(() => {
            this.open();
        })
    }

    async updateQuantity(line, quantity, name) {
        this.remove_cart_event(line, quantity);
        const body = JSON.stringify({
            line,
            quantity,
            sections: ["cart-modal-items", "cart-modal-button", "cart-modal-subtotal", "cart-icon-bubble"],
            sections_url: window.location.pathname
        });

        fetch(`${routes.cart_change_url}`, {
            ...fetchConfig(),
            ... {
                body
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.text();
            } else {
                this.handleErrorMessage(response, line);
            }
        })
        .then((state) => {
            const parsedState = JSON.parse(state);

            this.classList.toggle('is-empty', parsedState.item_count === 0);
            const cartFooter = document.getElementById('main-cart-footer');

            if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);


            this.updateCartModal(parsedState);

            const lineItem = this.querySelector(`[data-cart-item-index="${line}"]`);
            if (lineItem && lineItem.querySelector(`[name="${name}"]`)) lineItem.querySelector(`[name="${name}"]`).focus();
        }).catch(() => {
            this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        }).finally(() => {
            this.updateFreeShippingNotices();
        });
    }

    async remove_cart_event(line, newQuantity){
        if(newQuantity == 0){
            let itemData = await this.gatherLineItemData(line);
            Shopify.analytics.publish("remove_cart", {
                "event": "remove_cart",
                "value": `${itemData.productData.price / 100}`,
                "affiliation": `${itemData.productData.vendor}`,
                "page_type": `${window.location.href.split('.com/')[1].split('/')[0]}`,
                "currency": `${Shopify.currency.active}`,
                "items": [
                    {
                        "item_id": `${itemData.productData.variants.find(variant => variant.option2 == itemData.sizeVariant).sku}`,
                        "item_name": `${itemData.productData.title}`,
                        "item_brand": `${itemData.productData.vendor}`,
                        "item_category": `${itemData.productData.type}`,
                        "item_variant": `${itemData.productData.variants.find(variant => variant.option2 == itemData.sizeVariant).name}`,
                        "item_size": `${itemData.productData.variants.find(variant => variant.option2 == itemData.sizeVariant).option2}`,
                        "price": `${itemData.productData.variants.find(variant => variant.option2 == itemData.sizeVariant).price / 100}`,
                        "currency": `${Shopify.currency.active}`,
                        "quantity": `0`
                    }
                ]
            })
        } else {
            return
        }
    }

    async gatherLineItemData(line){
        let itemRemoved = this.querySelectorAll('.cart-item')[line - 1];
        let itemHandle = itemRemoved.dataset.handle;
        let sizeVariant = itemRemoved.querySelector('[data-option-name="size"] dd') ? itemRemoved.querySelector('[data-option-name="size"] dd').innerText : null;
        let colourVariant = itemRemoved.querySelector('[data-option-name="colour"] dd') ? itemRemoved.querySelector('[data-option-name="colour"] dd').innerText : null;
        let productData = await fetch(`${window.Shopify.routes.root}products/${itemHandle}.js`)
        .then((response) => response.json())
        .then((data) => data);
        return {
            "itemHandle": itemHandle,
            "line": line,
            "sizeVariant": sizeVariant,
            "colourVariant": colourVariant,
            "productData": productData
        }
    }

    handleErrorMessage(response, line){
        let errorMessage = this.querySelectorAll(':scope .product-form__error-message-wrapper')[line - 1];
        errorMessage.querySelector('span').innerText = window.cartStrings.quantityError;
        errorMessage.classList.toggle('hidden', response.status === 200);
    }

    updateFreeShippingNotices() {
        fetch("/cart", {
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            Array.from(this.freeShippingNotices).forEach(notice => notice.setAttribute("data-cart-total", response.total_price));
        })
    }

    updateCartModal(parsedState) {
        this.getSectionsToRender().forEach((section => {
            let parsedStateSections = parsedState.sections || parsedState;
            document.getElementById(section.id).innerHTML = parsedStateSections[section.id];
            
            //Adding event listener to cart-modal-button
            if (section.id === 'cart-modal-button') {this.manageCartModalButton();}

            //Identifying which elements need to be hidden depending on if the cart is empty or not
            if (section.id === 'cart-modal-items') {this.controlCartModalContentsReveal(parsedStateSections, section.id);}
        }));
    }

    manageCartModalButton() {
        this.checkout = document.getElementById('checkout');
        if (this.checkout) this.checkout.addEventListener('click', this.checkoutLoading.bind(this));
    }

    controlCartModalContentsReveal(parsedStateSections, id) {
        let cartItemLength = Array.from(new DOMParser().parseFromString(parsedStateSections[id], 'text/html').querySelectorAll(".cart-item")).length;
        if (cartItemLength > 0){
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
        }
        else {
            //Adding class from cart-modal__contents-inner styling when cart is empty
            document.querySelector('.cart-modal__contents-inner').classList.add('cart-modal__empty-wrapper');
            //Adding hidden class to the checkoutContainer when the cart is empty
            this.checkoutContainer.classList.add('hidden');
        }
    }

    checkoutLoading(e) {
        const button = e.target;
        button.firstElementChild.innerText = "";
        button.style.backgroundColor = 'dimgrey';
        button.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
    }

    setActiveElement(element) {
        this.activeElement = element;
    }

    async view_cart_event(){
        let cartData = await fetch("/cart", {
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => { return data });
        function cartArray(cartData){
            let productsAsArray = Array.isArray(cartData.items) ? cartData.items : new Array(cartData.items);
            let items = [];
            let itemToAdd = {};
                productsAsArray.forEach(product => {
                    itemToAdd = {
                        "affiliation": cartData.items[0].vendor,
                        "item_id": product.sku,
                        "item_name": product.product_title,
                        "item_brand": product.vendor,
                        "item_category": product.product_type,
                        "item_variant": product.variant_title,
                        "item_size": product.variant_title,
                        "price": (product.price / 100),
                        "discount": product.line_level_discount_allocations.amount,
                        "coupon": product.line_level_discount_allocations.title,
                        "currency": Shopify.currency.active,
                        "quantity": product.quantity,
                        "index": (items.length)
                    }
                    items.push(itemToAdd);
                })
            return items
        }
        Shopify.analytics.publish("view_cart", {
			"currency": `${Shopify.currency.active}`,
			"value": `${cartData.total_price / 100}`,
			"items": cartArray(cartData)
		})
    }
}

customElements.define('cart-modal', CartModal);