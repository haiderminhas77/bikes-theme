# vvastify

Vvastify if our base theme. Built using Shopify Dawn as a foundation, it serves as the starting point for all brand theme builds.

[Getting started - new brand builds](#getting-started) |
[Developer tools](#developer-tools) |
[Css rules](#css-rules)
[Theme scructure conventions](#theme-structure-conventions)

## Getting started - new brand builds

1. Push vvastify master to new brand buddy repo:
```
git push https://app.buddy.works/vvast/{new-brand-repo}
git clone https://app.buddy.works/vvast/{new-brand-repo}
cd {new-brand-project-folder}
```
2. Install node  modules:
```
npm install
```
3. Launch a development server in the `dist/` folder:
```
cd dist
shopify login {brand test store (or other environment)}
shopify theme serve 
```
4. Run gulp from project root:
```
gulp
```
5. Checkout a feature branch and start developing

## Getting started - vvastify-updates

1. Checkout a branch from master using appropite branch name  
>: [code convention docs](https://docs.google.com/document/d/1zNfXK6XDxl-Qm6fcv6yXKFexT98k6rHIKdaUTPiEqCU/edit)
```
git checkout -b {branch-type}/{branch-name}
```

2. Push up feature branch in time for scheduled merge party, or enter in pull request on buddy

>:information_source: You'll need access to a Shopify store in order to get started with theme development. If you don't already have one, you can set up a [development store](https://shopify.dev/themes/tools/development-stores).

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Dawn is already set up to work with these tools.

**Shopify CLI**

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://github.com/Shopify/shopify-cli#quick-start-guide-for-theme-developers) to get started.

Essential contents of .shopifyignore on root of project folder:
```
git/*
.gitignore
.idea
dev/*
```

**Theme Check**

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

**GIT**

Table of GIT branch and commit naming formats

|  commit/branch type | Description                                                                                         |   |   |
|---------------------|-----------------------------------------------------------------------------------------------------|---|---|
|  feat               | A new feature                                                                                       |   |   |
|  fix                |A bug Fix                                                                                            |   |   |
|  docs               |Documentation only changes                                                                           |   |   |
|  style              |Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons etc)|   |   |
|  refactor           |A code change that neither fixes a bug nor adds a feature                                            |   |   |
|  chore              |Other changes that don't modify src or test files                                                    |   |   |
|  revert             |Reverts a previous commit                                                                            |   |   |

Essential contents of .gitignore on root of project folder:
```
node_modules/
ehthumbs.db
Thumbs.db
```

**GULP**

GULP compiles and compresses the contents of /dev directory and pipes them into /assets. It also provides a watch command to compile any changes made to /dev during development.

When starting work run:
```
gulp
```
then
```
gulp watch
```

## Theme structure conventions

**Overview of theme structure**
Each page contains sections, customisable and powered by JSON in the template files
These section files contain liquid and can render smaller, more modular snippets inside of them
Section-specific JavaScript goes at the bottom of section files, other JavaScript modules live in /assets
Stylesheets live in /assets


Example of module info to be placed at top of a Liquid/JavaScript file (to be commented out in the correct way:


Section types:
**Fixed** - included in theme.liquid and rendered on all pages without exception. Includes sections/announcement-bar, sections/header, sections/footer
**Main** - Key sections for specific site areas, such sections/main-product and sections/main-collection-product-grid
Sections belong to a specific area or page
**PDP-specific** - a dynamic dynamic section that only renders on the pdp - usually have metafields linked into products e.g. product add ons
**Dynamic** - sections that start with a **ds-** and can be rendered anywhere - should work as a section on its own whether that is on a pdp, collection or page and make sure all CSS that is needed for that section is being rendered correctly.


## Css rules
CSS only - No more nesting (as previously used in sass)

**CSS variables**
use of var(--variable) instead of $, these are defined in theme.liquid and can be defined in section too
E.g. in theme.liquid
```css
    --header-nav-mob-background-color

    :root {
       --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};
    }

    .text-area {
        font-family: var(--font-body-family);
    }
```

**Media Queries and handy break point classes**
(we are no longer using SASS mixins)
Basic break points are as follows:

  	base.css used in layout/theme.liquid, password.liquid
	vvastify breakpoints:
 ```css
	@media screen and (max-width: 749px) {
		.small {
			//mobile;
		}
	}

	@media screen and (min-width: 750px) and (max-width: 989px) {
		.medium {
			//tablet;
		}
	}

	@media screen and (min-width: 990px) {
		.large {
			//desktop;
		}
	}
```
Some brands use different break points

**Fonts**

can be rendered using either shopify, adobe and with woff fonts as defined in theme settings
	Fonts CSS variables defined in theme.liquid:
```css
    font-family: var(--font-body-family);
    font-family: var(--font-heading-family);
```
Some brands have extra font variables such as Condensed header

	Fonts PX to REM:
	Converting px to rem: vvastify is using The 62.5% rule, 1 rem is 10px
```css
	font-size: 1rem;  10px
	font-size: 1.4rem;  14px
	font-size: 2.2rem;    22px;
```


**Handy CSS classes**
```css
    .hidden {
        display: none !important;
    }
```

**CSS continued**
Base.css is rendered in theme.liquid and contains general css needed for the theme, specific CSS style sheets are rendered in the relavent section
```liquid
{% style %} {% endstyle %}
```
In line liquid styling should only be used because a liquid variable is needed from the CMS
use of !important - should not be used unless a last resort
Comment in css with /* Scrollbar *

**Defering CSS**
There are 2 ways of rendering stylesheet within a section,

```liquid
<link rel="stylesheet" href="{{ 'component-mega-menu.css' | asset_url }}" media="print" onload="this.media='all'">

<noscript>{{ 'component-mega-menu.css' | asset_url | stylesheet_tag }}</noscript>
```

and
```liquid
{{ 'component-slider.css' | asset_url | stylesheet_tag }}
```

**CSS classes**
We try to use BEM as set out in dawn and in vvastify

BEM (block, element, modifier) methodology -
    block -> top level description of component e.g. button
    element -> elements situated inside block
    modifier -> indicates a styling modification of block/element
e.g. button__text, button--shadow, button__text--shadow


## Language strings
- Language strings are a very useful Shopify tool to regulate content across different language sites, and allow the correct language to be dynamically inserted into various areas of the site
- The language strings 'colour_lang_string' and 'size_lang_string' are also used within the code to determine which kind of variant picker needs to be rendered based on whether the input name matches the colour or size  language string, as the rendering will depend on this (i.e. the colour variant picker will have a specified hex code as a background, whereas the size variant picker will render the text). This allows this logic to work across multiple localised sites


## JavaScript

**General**
- JavaScript that is used across the theme usually either lives as a class inside global.js, and is activated by a custom element in the DOM, or will live inside its own file in assets and be included in various places
- In some situations, e.g. if the JavaScript is very specific to a certain area of the theme, it will be found within script tags in a section or snippet Liquid file
- A focus on granular and atomic methods and functions that operate in a cascade that can be easily maintained and edited

**Syntax**
- Use of camelCase throughout variables and functions
- Each word capitalised within class titles e.g. GiftWithPurchase
- Comment out with '//'
- Tab spacing

## HTML

**General**
- It's important to ensure that multiple input elements on the same page being created by separate loops have unique IDs and names, otherwise this can lead to very strange bugs where interactions with one element will affect a seemingly unrelated one
- vvastify 2.0 uses a lot of the native HTML feature custom elements (https://javascript.info/custom-elements). These are custom-named DOM elements that have a JavaScript class associated with them which is instantiated when the custom element is rendered

**Accessibility & SEO optimisation**
- Only one H1 should be present on each page
- Different heading elements e.g. H1, H2, H3 should appear in consecutive order down the page - levels should not be skipped
- Descriptive alt tags for images are important for accessibility and can be populated dynamically using Liquid e.g. on a product image, the alt tag could be 'alt="{{ product.title }}"'
- The use of descriptive link text is important to create a clear indication of where an anchor leads, instead of e.g. the link text being 'here'
- If a piece of text is to appear in capital letters on a site, the way to implement this would be to use CSS text transform, instead of editing the actual HTML in the Liquid. If the latter option is chosen, screenreaders will read out each letter individually and create an inaccessible experience
- Encourage brands not to embed text within images - use the CMS text overlay that is available to them. Google cannot read this text on these images and the text cannot be read by screen readers
- Aria labels are useful tools to provide more information about an element e.g. aria-expanded attributes within details/summary elements to indicate current state of dropdowns with hidden content, aria-label to create descriptive labels for links. More info here - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA


## Useful links
https://namastudio.it/en/blogs/blog/codice-dawn-shopify
https://ecommerce-platforms.com/ecommerce-resources/shopify-online-store-2-0
https://www.shopify.com/partners/blog/shopify-online-store
https://shopify.dev/themes/best-practices/performance
https://blog.logrocket.com/5-things-you-can-do-with-css-instead-of-javascript/


Copyright (c) 2021-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.


## fonts

**Heading**
```
font-family: var(--font-heading-family);
font-weight: var(--font-heading-weight);
font-style: var(--font-heading-style);
letter-spacing: var(--font-heading-letter-spacing);
letter-spacing: var(--font-heading-letter-spacing-wide); //-0.1em;
```

**caption font**
```
font-family: var(--font-caption-family);
font-weight: var(--font-caption-weight);
font-style: var(--font-caption-style);
letter-spacing: var(--font-caption-letter-spacing);
```

**Body font**
```
font-family: var(--font-body-family);
font-style: var(--font-body-style);
font-weight: var(--font-body-weight);
letter-spacing: var(--font-body-letter-spacing);
```

## z-index
```
#shopify-section-header (includes mob nav): 4
cart modal: 5
search modal: 4
zoom modal open: 101
product popup modal(size guide): 101
pdp sticky atc: 3

Rule: no higher than z-index of 3 to avoid conflicts

e.g. stacking order e.g. DS hero, DS promo blocks

--------- arrows (used in slider) z-index: 2
------- button z-index: 3
----- text/heading z-index: 2
---- full image link z-index: 2
--- gradient/overlay (:after) z-index: 1
-- image
```

## page-width

use of .page-width classes - comparable to .container on US site, for fixed max-width sections - this includes padding.
- max-width: 1440px - this is defined in theme settings

```
.page-width {
	max-width: var(--page-width);
	margin: 0 auto;
	padding: 0 0.8rem;
}


@media screen and (min-width: 750px) {
	.page-width {
		padding: 0 1.2rem;
	}
}
```

max width but no padding
```
.page-width .page-width_padding-0 {
	padding: 0;
}
```

There are also device specific page-width setting e.g. .page-width-desktop .page-width-mobile

Padding can be overridden when needed on a section e.g.
```
.footer .page-width {
	padding: 2rem;
}
```