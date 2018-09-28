import Popup from 'vintage-popup';
import Inputmask from 'inputmask';
import { css } from '../_helpers';

class Form {
  constructor(formEl) {
    this.$form = $(formEl);
    this.$input = this.$form.find('.js-input');
    this.$formSubmit = this.$form.find('button[type="submit"]');

    this.init();
  }

  init() {
    this.maskInput();
    this.removeError();
    this.validate();
    this.initThanksNewsPop();
    this.initThanksPop();
  }

  maskInput() {
    const $input = $('.js-tel-input');
    const im = new Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true
    });
    im.mask($input);
  }

  validate() {
    const _this = this;
    this.$formSubmit.on('click', function (e) {
      _this.$input.each(function (i, $el) {
        if ($($el).val() === '') {
          $($el).closest('.form-field').addClass(css.error);
        }
      });
    });
  }

  initThanksPop() {
    const _this = this;

    this.$form.on('submit', function (e) {
      e.preventDefault();
      const $this = $(this);

      Popup.closeAllPopups();
      const thanskPopInstance = $('.thanks-popup__btn').popup();
      thanskPopInstance.open();

      setTimeout(() => {
        thanskPopInstance.close();
      }, 2000);

      $this[0].reset();
      _this.checkFill();
    });
  }

  initThanksNewsPop() {
    const _this = this;

    $('.js-news-form').on('submit', function (e) {
      e.preventDefault();
      const $this = $(this);

      Popup.closeAllPopups();
      const thanskPopInstance = $('[data-popup-target="thanks-news-popup" ]').popup();
      thanskPopInstance.open();

      setTimeout(() => {
        // thanskPopInstance.close();
      }, 2000);

      $this[0].reset();
      _this.checkFill();
    });
  }

  checkFill() {
    this.$input.each(function () {
      checkInput($(this));
    });
    this.$input.blur(function () {
      checkInput($(this));
    });

    function checkInput(el) {
      if (el.val() === '') {
        el.addClass(css.error);
      } else {
        el.removeClass(css.error);
      }
    }
  }

  removeError() {
    this.$input.on('click focus', (ev) => {
      $(ev.currentTarget).closest('.form-field').removeClass(css.error);
    });
  }
}

const $form = $('.js-form');
$form.each(function (i, el) {
  new Form(el);
});
