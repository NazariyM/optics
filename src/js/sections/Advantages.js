import { TweenMax, TimelineMax } from 'gsap';
import '../lib/DrawSVGPlugin';
import { Resp } from '../_helpers';

class Advantages {
  constructor() {
    this.container = document.querySelector('.advantages');

    if (!this.container) return;

    this.block = this.container.querySelector('.advantages__block');
    this.listItems = [...this.block.querySelector('.advantages__list').children];
    this.pluses = [...this.block.querySelectorAll('.advantages__view-plus')];

    if (Resp.isDesk) this.init();
  }

  init() {
    this.mouseHandler();
  }

  mouseHandler() {
    for (const [idx, item] of this.listItems.entries()) {
      const line = item.querySelector('.js-adv-line') || [];
      this.prepareLineAnim(line);

      item.addEventListener('mouseleave', (e) => this.animReverse(e, item));
      item.addEventListener('mouseenter', (e) => this.anim(e, item, idx));
    }
  }

  prepareLineAnim(line) {
    TweenMax.set(line, { drawSVG: '0%' });
  }

  anim(e, item, idx) {
    item.animation = new TimelineMax({ paused: true });
    const line = item.querySelector('.js-adv-line') || [];

    item.animation
      .to(line, .5, { drawSVG: '100%', ease: Power2.easeInOut })
      .to(this.pluses[idx], .3, { ease: Power2.easeInOut }, -.01)
      .to(this.pluses[idx].querySelector('span'), .3, { autoAlpha: 1, ease: Power2.easeInOut, delay: .4 }, -0.1);
    item.animation.play();
  }

  animReverse(e, item) {
    item.animation.reverse();
  }
}

export default new Advantages();
