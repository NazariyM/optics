import 'slick-carousel';
import { svgIcon, Resp } from '../_helpers';

class Slider {
  constructor({ el= '.js-slider', showCount = 1, scrollCount = 1, ...opts } = {}) {
    this.$slider = $(el);
    this.showCount = showCount;
    this.scrollCount = scrollCount;
    this.responsive = opts.responsive;
    this.arrows = opts.arrows || false;
    this.infinite = opts.infinite || false;
    this.function = opts.function || false;
    this.dots = opts.dots || true;
    this.dotsClass = opts.dotsClass || 'slider-dots';
    this.appendArrows = opts.appendArrows;
    this.appendDots = opts.appendDots;
    this.transform = opts.transform || true;
    this.speed = opts.speed || 1000;
    this.ease = opts.ease;
    this.onInit = opts.onInit || false;

    const iconLeft = svgIcon('sld-arr-l');
    const iconRight = svgIcon('sld-arr-r');

    this.defaultOptions = {
      slidesToShow: this.showCount,
      slidesToScroll: this.scrollCount,
      infinite: this.infinite,
      speed: this.speed,
      useTransform: this.transform,
      adaptiveHeight: true,
      accessibility: false,
      swipe: true,
      arrows: this.arrows,
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${iconLeft}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${iconRight}</button>`,
      dots: this.dots,
      dotsClass: this.dotsClass,
      appendArrows: this.appendArrows,
      appendDots: this.appendDots,
      rows: 0,
      responsive: this.responsive,
      cssEase: this.ease
    };

    if (this.$slider.length) this.init();
  }

  init() {
    if (this.onInit) this.$slider.on('init afterChange reInit', (event, slick, currentSlide) => this.onInit(event, slick, currentSlide));

    this.initSlider();

    if (this.function) {
      if (typeof this.function !== 'function') return;
      this.function();
    }
  }

  initSlider() {
    this.$slider.slick($.extend({}, this.defaultOptions));
  }
}

export default new Slider();

const testimonialsSld = new Slider({
  el: '.js-testimonials-slider',
  showCount: 3,
  scrollCount: 3,
  dotsClass: 'testimonials__slider-dots slider-dots slider-dots_white',
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true
      }
    }
  ],
  function() {
    const _this = this;

    if (!Resp.isMobile) setTimeout(setContentHeight, 0);

    function setContentHeight() {
      const contentHeights = [];
      const $content = _this.$slider.find('.testimonials__item-content');

      $content
        .each((i, el) => {
          contentHeights.push($(el).outerHeight());
        })
        .css({ height: Math.max(...contentHeights) });
    }
  }
});

