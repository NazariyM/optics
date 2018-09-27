import objectFitImages from 'object-fit-images';
import objectFitVideos from 'object-fit-videos';
import { $body, detectIE } from './_helpers';

import './components/Header';
import './components/Popups';
import './components/Form';
import './components/Sliders';
import './components/VideoBlock';
import './sections/Advantages';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    objectFitVideos();
    this.addClassIE();
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }
}

export default new Common();
