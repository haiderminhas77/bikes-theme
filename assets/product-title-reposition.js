"use strict";

//Function to reposition the PDP title element on desktop & mobile. 

function repositionTitlePDP() {
  var element = document.querySelector('#product__title-price-stars-badges');
  var mobileContainer = document.querySelector('#product__title-wrapper-mobile');
  var desktopContainer = document.querySelector('#product__title-wrapper-desktop');
  if (window.innerWidth > Shopify.breakpoints.mobile) {
    if (desktopContainer.children.length == 0) {
      desktopContainer.appendChild(element);
      mobileContainer.innerHTML = '';
    }
  } else if (window.innerWidth <= Shopify.breakpoints.mobile) {
    if (mobileContainer.children.length == 0) {
      mobileContainer.appendChild(element);
      desktopContainer.innerHTML = '';
    }
  }
}
repositionTitlePDP();
addEventListener("resize", function (event) {
  debounce(repositionTitlePDP(), 500);
});