import BaseChart from './Base';

class PieChart extends BaseChart {
  constructor(options = {}) {
    super({
      chart: options,
      chartType: 'PieChart'
    }, {

    });
  }

  getConfig() {
    const data = this.data;
    const config = this.config;
    const that = this;
    return {

      legend: {},

      // Series
      "series": config.series.map((item) => {
        return {
          "type": "PieSeries",
          "dataFields": {
            "category": item.categoryField,
            "value": item.valueField
          },
          colors: that.getColorSet(config.colorsSet),
          ...item.overrides
        };
      }),


      tooltip: {},
      ...config.overrides,
      // Data
      "data": data

    };
  }

}


export default PieChart;