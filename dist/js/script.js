"use strict";

function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

let Slider = new Swiper('.testimonials__wrapper', {
	wrapperClass: "testimonials__body",
	slideClass: "testimonials__item",
	slidesPerView: 'auto',
	watchOverFlow: true,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	speed: 1000,
	centeredSlides: true,
	spaceBetween: 300,
	loop: true,
	navigation: {
		nextEl: ".testimonials__next",
		prevEl: ".testimonials__prev",
	}
});


$(document).ready(function () {
	$('.faq__label').click(function (event) {
		$(this).toggleClass('active').next().slideToggle(300);
	});
});