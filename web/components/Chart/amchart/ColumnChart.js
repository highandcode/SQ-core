import BaseChart from './Base';
import { getSign } from '../../../utils/currency';

class LineChart extends BaseChart {
  constructor(options = {}) {
    super({
      chart: options,
      chartType: 'XYChart'
    }, {

    });
  }

  getConfig() {
    const data = this.data;
    const config = this.config;
    const that = this;
    return {

      // Category axis
      "xAxes": [{
        "type": "CategoryAxis",
        "dataFields": {
          "category": config.xAxes.category
        }
      }],
      "categoryAxesSettings": {
        "autoGridCount": false,
        "equalSpacing": true,
        "labelRotation": 90//recommended if you have a lot of labels
      },
      // Value axis
      "yAxes": [{
        "type": "ValueAxis",
        "numberFormatter": {
          "type": "NumberFormatter",
          "numberFormat": getSign() + "#,###.00"
        }
      }],

      legend: {},

      // Series
      "series": config.series.map((item) => {
        return {
          "type": "ColumnSeries",
          "dataFields": {
            "categoryX": config.xAxes.category,
            "valueY": item.valueField
          },
          "fill": that.getColor(item.color),
          "stroke": that.getColor(item.color),
          "name": item.name,
          "columns": {
            "tooltipText": "{categoryX}\n[bold]{valueY}[/]",
            "fillOpacity": .6
          },
          "tooltip": {
            "getFillFromObject": false,
            "background": {
              "fill": that.getColor(item.color).lighten(.3)
            }
          },
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


export default LineChart;