import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton';
import { DateTime } from '../../../utils/datetime';
import './date-navigator.scss';

const DateNavigator = ({
  minDate,
  maxDate,
  className = '',
  value = '',
  onChange,
  errorMessage,
  type = 'month',
  span = 1,
  onAnalytics,
  analytics = {}
}) => {
  const { next, prev } = analytics;
  const handleNext = () => {
    const newvalue = new DateTime(value).startOf('month').addMonths(span).toISO();
    const from = new DateTime(value).startOf('month').addMonths(span).toISO();
    const to = new DateTime(from).addMonths(span).addDays(-1).endOf('month').toISO();
    onChange &&
      onChange({
        value: newvalue,
        from,
        to
      });
  };
  const handlPrev = () => {
    const newvalue = new DateTime(value)
      .startOf('month')
      .addMonths(span * -1)
      .toISO();
    const from = new DateTime(value)
      .startOf('month')
      .addMonths(span * -1)
      .toISO();
    const to = new DateTime(from)
      .addMonths(span * -1)
      .endOf('month')
      .addDays(-1)
      .toISO();
    onChange &&
      onChange({
        value: newvalue,
        from,
        to
      });
  };

  const labelDisplay =
    type === 'range'
      ? `${new DateTime(value).startOf('month').toString('month')} - ${new DateTime(value)
          .startOf('month')
          .addMonths(span)
          .addDays(-1)
          .toString('month')}`
      : new DateTime(value).toString('month');
  const minDateDisabled = minDate ? new DateTime(minDate).date() >= new DateTime(value).startOf('month').date() : false;
  const maxDateDisabled = maxDate ? new DateTime(maxDate).date() <= new DateTime(value).startOf('month').addMonths(span).addDays(-1).date() : false;
  return (
    <div className={`sq-date-navigator ${className}`}>
      <div className="sq-date-navigator__container">
        <div className="sq-date-navigator__nav-left">
          <LinkButton analytics={prev} onAnalytics={onAnalytics} disabled={minDateDisabled} iconName="arrow-left" size="large" onClick={handlPrev} />
        </div>
        <div className="sq-date-navigator__content">{labelDisplay}</div>
        <div className="sq-date-navigator__nav-right">
          <LinkButton analytics={next} onAnalytics={onAnalytics} disabled={maxDateDisabled} iconName="arrow-right" size="large" onClick={handleNext} />
        </div>
      </div>
      {errorMessage && <div className="sq-error sq-date-navigator--error">{errorMessage}</div>}
    </div>
  );
};

DateNavigator.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default DateNavigator;
