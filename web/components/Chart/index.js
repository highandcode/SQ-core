import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './chart.scss';
import ChartFactory from './ChartFactory';

const ChartTypesMap = new ChartFactory().get();

class CustomChart extends Component {
  state = {};
  constructor() {
    super();
    this.resizeChart = this.resizeChart.bind(this);
  }
  componentWillUnmount() {
    this.chart && this.chart.dispose();
    window.removeEventListener('resize', this.resizeChart);
  }
  componentDidMount() {
    this.renderChart();
    window.addEventListener('resize', this.resizeChart);
  }
  resizeChart() {
    if (this.resizing) {
      return;
    }
    this.resizing = window.setTimeout(() => {
      this.chart && this.chart.update();
      this.resizing = undefined;
    }, 500);
  }
  renderChart() {
    const { data, chartConfig = {}, type, colorsSet = 'default' } = this.props;
    const ChartTypeRender = ChartTypesMap[type] || ChartTypesMap.Pie;
    this.chart = new ChartTypeRender(this.chartContainer, {
      ...chartConfig,
      colorsSet
    });

    this.chart.data = data;
    this.chart.draw();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data || this.props.type !== prevProps.type) {
      if (!this.chart) {
        this.renderChart();
      } else {
        const { data, chartConfig = {}, colorsSet = 'default' } = this.props;
        this.chart.setConfig({
          ...chartConfig,
          colorsSet
        });
        this.chart.data = data;
        this.chart.update();
      }
    }
  }
  render() {
    const { className = '', data = [], noDataMessage = 'No data found' } = this.props;
    return (
      <div className={`sq-chart ${className}`}>
        {data.length === 0 && <div className="sq-chart--no-data">{noDataMessage}</div>}
        <div ref={(div) => (this.chartContainer = div)}></div>
      </div>
    );
  }
}

CustomChart.propTypes = {
  type: PropTypes.string,
  colorsSet: PropTypes.string,
  chartConfig: PropTypes.object,
  data: PropTypes.array
};
export default CustomChart;
