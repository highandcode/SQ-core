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
      ...this.getDefaultConfig(),
      // Category axis
      "xAxes": [{
        "type": "CategoryAxis",
        "dataFields": {
          "category": config.xAxes.category
        },
        "numberFormatter": {
          "type": "NumberFormatter",
          "numberFormat": getSign() + "#,###.00"
        }
      }],
      "categoryAxesSettings": {
        "autoGridCount": false,
        "equalSpacing": true,
        "labelRotation": 90//recommended if you have a lot of labels
      },
      // Value axis
      "yAxes": [{
        "type": "ValueAxis"
      }],

      legend: {},

      // Series
      "series": config.series.map((item) => {
        const { bullet = false } = item;
        return {
          "type": item.seriesType || "LineSeries",
          "dataFields": {
            "categoryX": config.xAxes.category,
            "valueY": item.valueField
          },
          "fill": that.getColor(item.color),
          "stroke": that.getColor(item.color),
          "strokeWidth": item.strokeWidth !== undefined ? item.strokeWidth : 5,
          "name": item.name,
          "columns": {
            "tooltipText": `{categoryX}\n[bold]${getSign()}{valueY.formatNumber('#,###.00')}[/]`,
            "fillOpacity": .8
          },
          "bullets": bullet ? [{
            "children": [{
              "type": "CircleBullet",
              "width": 2,
              "height": 2,
              "tooltipText": `{categoryX}\n[bold]${getSign()}{valueY.formatNumber('##,###')}[/]`
            }]
          }] : [],
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