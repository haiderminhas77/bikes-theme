class StickyAtc extends HTMLElement {
    constructor() {
        super();

        if (this.classList.contains('sticky-atc__top')){
            this.setUpObserver();
        }
    }

    setUpObserver() {
        let regularAtcContainer = document.querySelector('.product__quantity-buy-buttons');
        let header = document.querySelector('#header-wrapper');

        if (header.parentNode.localName !== 'sticky-header') {
            this.style.top = `-${header.clientHeight}px`;
        } else {
            this.style.paddingTop = '2rem';
        }

        let options = {
            rootMargin: `-3px 0px 0px 0px`
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    let regularAtcContainerPosition = regularAtcContainer.getBoundingClientRect();
                    if (regularAtcContainerPosition.top <= header.clientHeight) {
                        this.classList.add('active');
                    }
                } else {
                    this.classList.remove('active');
                }
            });
        }.bind(this), options);
        
        observer.observe(regularAtcContainer);
    }

    updateOptionsAndPrice(currentVariant) {
        let currentOptionsContainer = this.querySelector('.sticky-atc__options');
        let currentPriceContainer = this.querySelector('.sticky-atc__price');
        if (currentVariant === undefined) {
            currentOptionsContainer.innerText = '';
            currentPriceContainer.innerText = '';
        } else {
            currentOptionsContainer.innerText = currentVariant.title;
            currentPriceContainer.innerText = Shopify.formatMoney(currentVariant.price, Shopify.moneyFormat);
        }
    }
}

customElements.define('sticky-atc', StickyAtc);