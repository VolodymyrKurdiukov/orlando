var $ = jQuery.noConflict();

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	this.nodes = document.querySelectorAll("[data-da]");
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);


	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});


	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];


		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};


DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}


DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};


DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

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
	$('.menu__icon').click(function (event) {
		$('.menu__icon,.menu__body').toggleClass('active');
		$('body').toggleClass('lock');
	});


	$('.faq__label').click(function (event) {
		$(this).toggleClass('active').next().slideToggle(300);
	});


	$('.item-faq-general__label').click(function (event) {
		$(this).toggleClass('active').next().slideToggle(300);
	});


	$(".faq-general__tab-item").not(":first").hide();
	$(".faq-general__wrapper .faq-general__tab").click(function () {
		$(".faq-general__wrapper .faq-general__tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".faq-general__tab-item").hide().eq($(this).index()).fadeIn();
	}).eq(0).addClass("active");

});


jQuery(($) => {
	if ($(window).width() < 991.98) {
		$('.header-bottom__link-arrow').click(function (event) {
			$(this).toggleClass('active').next().slideToggle(300);
		});
	}
});

let textPath = document.querySelector('#text-path');

let textContainer = document.querySelector('#text-container');


window.onload = function () {
	let path = document.querySelector(textPath.getAttribute('href'));
}

let pathLength = path.getTotalLength();

function updateTextPathOffset(offset) {
	textPath.setAttribute('startOffset', offset);
}
updateTextPathOffset(pathLength);

function onScroll() {
	requestAnimationFrame(function () {
		let rect = textContainer.getBoundingClientRect();
		let scrollPercent = rect.y / window.innerHeight;
		updateTextPathOffset(scrollPercent * pathLength);
	});
}

window.addEventListener('scroll', onScroll);