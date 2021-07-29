import * as _am4core from "@amcharts/amcharts4/core";
import * as _am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_dark from "@amcharts/amcharts4/themes/amchartsdark";
let colors = {};
_am4core.useTheme(am4themes_animated);
// _am4core.useTheme(am4themes_dark);

export const setColors = (ncolors) => {
  colors = {
    ...colors,
    ...ncolors
  }
}


const colorsMap = () => {
  return {
    default: {
      list: [
        _am4core.color('red'),
        _am4core.color("#D65DB1"),
        _am4core.color("#FF6F91"),
        _am4core.color("#FF9671"),
        _am4core.color("#FFC75F"),
        _am4core.color("#F9F871")
      ]
    },
    expense: {
      list: [
        _am4core.color(colors.error),
        _am4core.color(colors.error).lighten(.1),
        _am4core.color(colors.error).lighten(.2),
        _am4core.color(colors.error).lighten(.25),
        _am4core.color(colors.error).lighten(.35),
        _am4core.color(colors.error).lighten(.45)
      ]
    },
    income: {
      list: [
        _am4core.color(colors.successDarker),
        _am4core.color(colors.successDarker).lighten(.1),
        _am4core.color(colors.successDarker).lighten(.15),
        _am4core.color(colors.successDarker).lighten(.25),
        _am4core.color(colors.successDarker).lighten(.35),
        _am4core.color(colors.successDarker).lighten(.45)
      ]
    }
  };
};

class BaseChart {
  constructor({
    am4core = _am4core,
    am4charts = _am4charts,
    chart = {},
    chartType
  } = {}, defaults = {}) {
    this.am4core = am4core;
    this.am4charts = am4charts;
    this.chartType = chartType;
    this.config = Object.assign({}, defaults, chart);
  }

  updateConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    };
  }

  getDefaultConfig() {
    return {
     
    };
  }
  getColorSet(setName) {
    return colorsMap()[setName] || colorsMap().default;
  }

  getColor(color) {
    return colors[color] ? this.am4core.color(colors[color]) : this.am4core.color(color);
  }

  getConfig() {
    return this.config;
  }

  dispose() {
    this._chart && this._chart.dispose();
  }

  draw(container) {
    this._chart = this.am4core.createFromConfig(this.getConfig(), container, this.am4charts[this.chartType]);
  }
}

export default BaseChart;