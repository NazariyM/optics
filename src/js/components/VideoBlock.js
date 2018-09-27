import { css } from '../_helpers';

class VideoBlock {
  constructor() {
    this.$blocks = $('.js-video-block');

    if (this.$blocks.length) this.init();
  }

  init() {
    this.play();
  }

  play() {
    this.$blocks.each((i, $block) => {
      const $this = $($block);
      const $btn = $this.find('button');
      const $video = $this.find('video');

      $btn.on('click', () => {
        $video[0].play();
        $this.closest($block).addClass(css.active);
        $video.on('click', () => {
          $video[0].pause();
          $this.removeClass(css.active);
        });
      });
    });
  }
}

export const VideoBlockAPI = new VideoBlock();
