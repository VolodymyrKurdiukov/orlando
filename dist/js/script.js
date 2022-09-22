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

$(document).ready(function () {
	$('.header-bottom__link-arrow').click(function (event) {
		$(this).toggleClass('active').next().toggleClass('active');
	});
});