import BaseChart from './Base';

class ColumnChart extends BaseChart {
  constructor(el, options = {}) {
    super(
      el,
      {
        chart: options,
        chartType: 'ColumnChart'
      },
      {
        margin: {
          top: 20,
          bottom: 90,
          left: 60,
          right: 20
        }
      }
    );
  }

  getConfig() {}

  init() {}

  refresh() {
    this.update();
  }

  update() {
    const d3 = this.d3;

    const element = this.element;
    const { colorSet, xAxis = {}, yAxis, tooltip = {}, legend = {} } = this.config;
    const { labelWidth: legendLabelWidth = 80 } = legend;
    const { format, ticks = 5 } = yAxis || {};
    const { labelWidth = 44 } = xAxis;
    const { formatter: formatTooltip = (d) => d[xValue] } = tooltip;
    const colorSetDefault = this.getColorSet(colorSet);
    var { xValue, series = [] } = this.config;
    const columnSeries = series.filter((t) => !t.type || t.type === 'Column');
    const lineSeries = series.filter((t) => t.type === 'Line');
    var { width, height, innerWidth, innerHeight } = this.getWidth();
    d3.select(element).select('svg').attr('width', width).attr('height', height);
    if (!this.data) {
      return;
    }
    const data = this.data;
    
    let allValues = this.getValuesFromSeries(this.data);

    const x = d3
      .scaleBand()
      .range([0, innerWidth])
      .domain(data.map((d) => d[xValue]))
      .paddingInner(0.2)
      .paddingOuter(0.1);
    this.x = x;
    let minAll = d3.min(allValues, (d) => d);
    if (minAll > 0) {
      minAll = 0;
    }
    const y = d3
      .scaleLinear()
      .domain([minAll * 1.005, (d3.max(allValues, (d) => d) || 100) * 1.005])
      .range([innerHeight, 0]);
    this.y = y;

    const g = this.gContainer;
    this.tooltip.html(formatTooltip);

    const xAxisCall = d3.axisBottom(x);
    this.xAxisGroup
      .call(xAxisCall)
      .selectAll('text')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('text-achor', 'end')
      .attr('transform', 'rotate(0)')
      .style('display', function (d, i) {
        const everyItem = Math.ceil(data.length / parseInt(innerWidth / (labelWidth + 20)));
        return i % everyItem ? 'none' : 'initial';
      });
    const yAxisCall = d3
      .axisLeft(y)
      .ticks(ticks)
      .tickFormat((d) => (format ? format(d) : d));
    this.yAxisGroup.call(yAxisCall);
    let slice = this.columnArea.selectAll('.group').data(data, (d) => d[xValue]);
    slice.exit().remove();
    // slice.attr('transform', function (d) {
    //   return 'translate(' + x(d[xValue]) + ',0)';
    // });
    slice = slice.enter().append('g').merge(slice).attr('class', 'group').on('mouseover', this.tooltip.show).on('mouseout', this.tooltip.hide);
    // .attr('width', (d) => x.bandwidth(d[xValue]))
    // .attr('transform', function (d) {
    //   return 'translate(' + x.bandwidth(d[xValue]) + ',0)';
    // });

    const rects = slice.selectAll('rect').data((d) => {
      return columnSeries.map((ser, idx) => {
        return {
          orig: ser,
          x: d[ser.xValue],
          y: d[ser.yValue],
          color: ser.color || colorSetDefault[idx]
        };
      });
    });
    function getX(d, idx) {
      return x(d.x) + (x.bandwidth(d.x) / columnSeries.length) * idx;
    }
    function getWidth(d) {
      return x.bandwidth(d.x) / columnSeries.length;
    }
    lineSeries.forEach((item) => {
      const line = d3
        .line()
        .x((d) => {
          return x(d[item.xValue]) + x.bandwidth(d.x) / columnSeries.length;
        })
        .y((d) => {
          return y(d[item.yValue]);
        });
      g.selectAll(`.${item.name}`).transition(d3.transition().duration(750)).attr('d', line(data));
    });
    // const rects = g.selectAll('rect').data(data);
    rects.exit().remove();
    // rects
    //   .transition(d3.transition().duration(750))
    //   .attr('y', (d) => y(d.y))
    //   .attr('x', getX)
    //   .attr('width', getWidth)
    //   .attr('height', (d) => innerHeight - y(d.y));
    const legRects = this.legend.selectAll('rect').data(series);
    const totalSeries = series.length;

    legRects
      .enter()
      .append('rect')
      .merge(legRects)
      .attr('x', function (d, i) {
        return innerWidth - (totalSeries - (i)) * legendLabelWidth;
      })
      .attr('y', function (d, i) {
        return height - 70;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function (d) {
        var color = d.color;
        return color;
      });
    const legTexts = this.legend.selectAll('text').data(series);

    legTexts
      .enter()
      .append('text')
      .merge(legTexts)
      .attr('x', function (d, i) {
        return innerWidth - (totalSeries - (i)) * legendLabelWidth + 16;
      })
      .attr('y', function (d, i) {
        return height - 70;
      })
      .attr('alignment-baseline', 'hanging')
      .text(function (d) {
        var text = d.label || d.name;
        return text;
      });
    rects
      .enter()
      .append('rect')
      .attr('fill', (d) => d.color)
      .attr('y', (d) => y(0))
      .attr('height', (d) => 0)
      .attr('width', getWidth)
      .merge(rects)
      .attr('x', getX)
      .transition(d3.transition().duration(750))
      .attr('width', getWidth)
      .attr('y', (d) => y(d.y))
      .attr('height', (d) => y(0) - y(d.y));
  }
  mousemoveTooltip(e) {
    const x0 = this.x.invert(d3.mouse(e)[0]);
    console.log(x0);
  }

  draw() {
    const that = this;
    const element = this.element;
    const d3 = this.d3;
    var { yValue, xValue, margin, yAxisLabel, xAxisLabel, series = [] } = this.config;
    var lineSeries = series.filter((item) => item.type === 'Line');
    var { width, height, innerWidth, innerHeight } = this.getWidth();
    const svg = d3.select(element).append('svg').attr('class', 'chart-svg').attr('width', width).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.gContainer = g;
    this.xAxisGroup = g.append('g').attr('class', 'x axis').attr('transform', `translate(0, ${innerHeight})`);
    this.yAxisGroup = g.append('g').attr('class', 'y axis');
    this.columnArea = g.append('g').attr('class', 'column');
    this.lineArea = g.append('g').attr('class', 'line');
    lineSeries.forEach((item) => {
      this.lineArea.append('path').attr('class', item.name).attr('fill', 'none').attr('stroke', item.color).attr('stroke-width', '3px');
    });

    this.legend = g.append('g').attr('class', 'sq-chart-legend');
    // .attr('x', 0)
    // .attr('y', innerHeight - 50)
    // .attr('height', 25)
    // .attr('width', width)
    // .attr('transform', 'translate(0,innerHeight - 50)');

    // this.focus = g.append('g').attr('class', 'focus').style('display', 'none');
    // this.focus.append('line').attr('class', 'y-hover-line hover-line').attr('y1', 0).attr('y2', innerHeight);
    // this.focus.append('line').attr('class', 'y-hover-line hover-line').attr('x1', 0).attr('x2', innerWidth);
    // this.focus.append('circle').attr('r', 7.5);
    // this.focus.append('text').attr('x', 15).attr('dy', '.31em');
    // g.append('rect')
    //   .attr('class', 'sq-chart-overlay')
    //   .attr('width', innerWidth)
    //   .attr('height', innerHeight)
    //   .on('mouseover', () => {
    //     this.focus.style('display', null);
    //   })
    //   .on('mouseout', () => {
    //     this.focus.style('display', 'none');
    //   })
    //   .on('mousemove', function () {
    //     that.mousemoveTooltip.call(that, this);
    //   });

    this.tooltip = d3.tip().attr('class', 'sq-chart-tooltip');
    g.call(this.tooltip);
    //   this.tooltip = d3.create('div').attr('class', 'xp-tooltip').html(`
    //   <div class="xp-tooltip__data">
    //     Hello
    //   </div>
    // `);
    //   element.appendChild(this.tooltip.node());
    if (!this.data) {
      return;
    }
    this.update();
  }

  dispose() {
    this.tooltip && this.tooltip.destroy();
    this.element.innerHTML = '';
  }
}

export default ColumnChart;
