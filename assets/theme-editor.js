"use strict";

document.addEventListener('shopify:block:select', function (event) {
  var blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;
  var parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();
  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft
    });
  }, 200);
});
document.addEventListener('shopify:block:deselect', function (event) {
  var blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  var parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});