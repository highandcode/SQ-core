import * as _d3 from 'd3';
import d3_tip from 'd3-tip';
window.d3 = _d3;

const colorsMap = {
  default: d3.schemeBlues.slice().pop().slice(1),
  expense: d3.schemeRdPu.slice().pop().slice(1),
  income: d3.schemeGreens.slice().pop().slice(1)
};

class Base {
  constructor(element, { d3 = _d3, chart = {}, chartType } = {}, defaults = {}) {
    this.chartType = chartType;
    this.config = Object.assign(
      {
        minWidth: 320,
        minHeight: 200,
        width: 'auto',
        height: 300,
        xValue: 'x',
        yValue: 'y',
        margin: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      defaults,
      chart
    );
    this.d3 = _d3;
    this.d3.tip = d3_tip;
    this.element = element;
  }

  getColorSet(setName) {
    return colorsMap[setName] || colorsMap.default;
  }
  setConfig(config) {
    this.config = {
      ...this.config,
      ...config
    };
  }
  init() {}
  update() {}
  draw() {}

  getValuesFromSeries(data) {
    const { series } = this.config;
    const allData = data.map((item) => {
      return series.map((ser) => {
        return item[ser.yValue] || 0;
      });
    });
    let allValues = [];
    if (allData.length > 0) {
      allValues = allData.reduce((a, b) => a.concat(b));
    }
    return allValues;
  }

  getWidth() {
    const element = this.element;
    var { width, height, minWidth, maxWidth, margin } = this.config;
    if (width === 'auto') {
      width = element.offsetWidth >= minWidth ? element.offsetWidth : minWidth;
    } else if (element.offsetWidth < width) {
      width = element.offsetWidth;
    }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return {
      width,
      height,
      minWidth,
      maxWidth,
      innerWidth,
      innerHeight,
      margin
    };
  }

  dispose() {
    this.element.innerHTML = '';
  }
}

export default Base;
