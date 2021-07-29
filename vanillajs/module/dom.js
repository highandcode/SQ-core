import $ from '../$';

class DOM {
  constructor() {
    this.$ = $;
  }

  boundry(el) {
    return this.$(el)[0].getBoundingClientRect();
  }

  offset(el) {
    el = this.$(el);
    return {
      left: el[0].offsetLeft,
      top: el[0].offsetTop,
    };
  }
}

export default DOM;
