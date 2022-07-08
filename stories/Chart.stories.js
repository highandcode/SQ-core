import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Chart from '../web/components/Chart';
import { DateTime } from '../web/utils/datetime';
import { formatters } from '../web/utils/format';
export default {
  title: 'Example/Chart',
  component: Chart,
  argTypes: {},
};

const Template = (args) => <Chart {...args} />;

export const PieChart = Template.bind({});
PieChart.args = {
  type: 'Pie',
  data: [
    {
      x: 10,
    },
    {
      y: 80,
    },
  ],
};
export const LineChart = Template.bind({});
LineChart.args = {
  type: 'Column',
  chartConfig: {
    xValue: 'month',
    width: 'auto',
    tooltip: {
      formatter: (e, d) => `
        <div class="sq-dashboard-stats__month-tooltip">
          <div class="tooltip-header">${d.month}</div>
          <div class="tooltip-data dr">
            <div class="tooltip-label"><div class="tooltip-dot"></div></div> <div class="tooltip-value">${formatters.currency(
              d.dr
            )}</div>
          </div>
          <div class="tooltip-data cr">
            <div class="tooltip-label"><div class="tooltip-dot"></div></div> <div class="tooltip-value">${formatters.currency(
              d.cr
            )}</div>
          </div>
        </div>
      `,
    },
    yAxis: {
      format: (val) => {
        return val;
      },
    },
    series: [
      {
        name: 'expense',
        label: 'Expense',
        xValue: 'month',
        yValue: 'dr',
        color: 'red',
      },
      {
        name: 'income',
        label: 'Income',
        xValue: 'month',
        yValue: 'cr',
        color: 'green',
      },
      {
        name: 'open',
        label: 'open',
        xValue: 'month',
        yValue: 'open',
        color: 'orange',
        type: 'Line',
      },
    ],
  },
  data: [
    {
      month: new DateTime().addMinutes(-180).toString('hh:mm A'),
      dr: 300,
      cr: 13500,
      open: 300,
      closed: 400,
    },
    {
      month: new DateTime().addMinutes(-120).toString('hh:mm A'),
      dr: 3400,
      closed: 200,
      cr: 3500,
      open: 400,
    },
    {
      month: new DateTime().addMinutes(-60).toString('hh:mm A'),
      dr: 300,
      closed: 1100,
      cr: 3500,
      open: 1400,
    },
  ],
};

export const AreaChart = Template.bind({});
AreaChart.args = {
  type: 'Area',
  chartConfig: {
    xValue: 'month',
    width: 'auto',
    tooltip: {
      formatter: (e, d) => `
        <div class="sq-dashboard-stats__month-tooltip">
          <div class="tooltip-header">${formatters.shortDate(d.month)}</div>
          <div class="tooltip-data open">
            <div class="tooltip-label"><div class="tooltip-dot"></div></div> <div class="tooltip-value">${formatters.number(
              d.open
            )}</div>
          </div>
          <div class="tooltip-data closed">
            <div class="tooltip-label"><div class="tooltip-dot"></div></div> <div class="tooltip-value">${formatters.number(
              d.closed
            )}</div>
          </div>
        </div>
      `,
    },
    yAxis: {
      format: (val) => {
        return formatters.currencyAbr(val, { setName: 'lowest' });
      },
    },
    yValue: 'open',
    series: [
      {
        name: 'tickets',
        label: 'Tickets',
        xValue: 'month',
        yValue: 'open',
        color: 'red',
        type: 'Area',
      },

      {
        name: 'closed',
        label: 'closed',
        xValue: 'month',
        yValue: 'closed',
        color: 'green',
        type: 'Line',
      },
    ],
  },
  data: [
    {
      month: new Date(new DateTime().addDays(1).toStringDefault()),
      open: 1,
      closed: 100
    },
    {
      month: new Date(new DateTime().addDays(2).toStringDefault()),
      open: 456,
      closed: 140
    },
    {
      month: new Date(new DateTime().addDays(3).toStringDefault()),
      open: 45,
      closed: 3100
    },
    {
      month: new Date(new DateTime().addDays(4).toStringDefault()),
      open: 400,
      closed: 4100
    },
    {
      month: new Date(new DateTime().addDays(5).toStringDefault()),
      open: 1400,
      closed: 1100
    },
  ],
};
