import {
  throttle,
	detectIE,
  css,
  Resp, $header, $scrolledElements
} from '../_helpers';

class Header {
	constructor() {
		this.body = document.querySelector('body');
		this.header = document.querySelector('.header');
		this.nav = this.header.querySelector('.nav');
		this.navBtn = this.header.querySelector('.nav-btn');
		this.scrollTop = 0;

		this.init();
	}

	init() {
		this.initScroll();
		this.bindEvents();
	}

	bindEvents() {
		this.navBtn.addEventListener('click', () => {
			this.toggleMenu();
			this.toggleBodyLock();
    });
		 this.onResize();
	}

  toggleBodyLock() {
    this.body.classList.contains(css.locked) ? this.body.classList.remove(css.locked) : this.body.classList.add(css.locked);
  }

	onResize() {
    window.onresize = () => {
      this.navBtn.classList.remove(css.active);
      this.nav.classList.remove(css.active);
    };
  }

	toggleMenu() {
			this.navBtn.classList.toggle(css.active);
			this.nav.classList.toggle(css.active);
	}

  initScroll() {
		const _this = this;
    const $link = $header.find('.nav').find('a');

    $link.on('click', function (e) {
      e.preventDefault();

      if (!Resp.isDesk) _this.toggleBodyLock();
      const el = $(this).attr('href');
      $scrolledElements.animate({scrollTop: $(el).offset().top}, 1500);
      _this.nav.classList.remove(css.active);
      _this.navBtn.classList.remove(css.active);
      return false;
    });
  }
}

export const HeaderAPI = new Header();
