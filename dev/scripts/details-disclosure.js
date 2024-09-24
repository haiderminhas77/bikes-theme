// DetailsDisclosure used in snippets/nav-desktop.liquid, flag-selector.liquid and sharebutton in share.js
class DetailsDisclosure extends HTMLElement {
	constructor() {
		super();

		this.mainDetailsToggle = this.querySelector('details');
		this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
		this.checkWindowWidth();

		window.addEventListener('resize', () => {
			this.checkWindowWidth();
		})
	}

	onFocusOut() {
		setTimeout(() => {
			if (!this.contains(document.activeElement)) this.close();
		})
	}

	onMouseOver(event) {
		this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', true);
		event.target.closest('details').setAttribute('open', true);
	}

	onMouseLeave() {
		this.mainDetailsToggle.removeAttribute('open');
		this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
	}

	close() {
		this.mainDetailsToggle.removeAttribute('open');
		this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
	}

	checkWindowWidth() {
		if (window.innerWidth > Shopify.breakpoints.tablet) {
			this.mainDetailsToggle.addEventListener('mouseover', this.onMouseOver.bind(this));
			this.mainDetailsToggle.addEventListener('mouseleave', this.onMouseLeave.bind(this));
		} else {
			this.mainDetailsToggle.removeEventListener('mouseover', this.onMouseOver.bind(this));
			this.mainDetailsToggle.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
		}
	}
}

customElements.define('details-disclosure', DetailsDisclosure);


class HeaderMenu extends DetailsDisclosure {
	constructor() {
		super();
		this.header = document.querySelector('header');
		let allMegaMenus = this.querySelectorAll(':scope .mega-menu');
		allMegaMenus.forEach(megaMenuParent => {
			megaMenuParent.addEventListener('mouseenter', () => {
				megaMenuParent.querySelector(':scope .mega-menu__content').animate(animateMenuOpen(), { duration: 500, fill: 'forwards' });
			})
		})
	}

	onToggle() {
			if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
			if (this.header) document.documentElement.style.setProperty('--header-bottom-position-desktop', `${Math.floor(this.header.getBoundingClientRect().bottom)}px`);
		}
	}

customElements.define('header-menu', HeaderMenu);