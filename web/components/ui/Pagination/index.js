import React from 'react';
import PropTypes from 'prop-types';
import SelectField from '../SelectField';
import Pagination from '@mui/material/Pagination';
import './_pagination.scss';

function SQPagination({ className = '', disabled = false, defaultPage, count, onChange, value = {}, color = 'primary', defaultPageSize = 30, pageSizeLabel = 'Page size', pageSizeOptions = [], enablePageSize = false }) {
  console.log(value);
  const handleChange = (event, inputValue) => {
    onChange &&
      onChange({
        value: {
          pageSize: defaultPageSize,
          ...value,
          currentPage: inputValue,
        },
      });
  };
  const handlePageSizeChange = (inputValue) => {
    onChange &&
      onChange({
        value: {
          pageSize: defaultPageSize,
          ...value,
          pageSize: inputValue,
        },
      });
  };

  return (
    <div className={`sq-pagination ${className}`}>
      {enablePageSize && (
        <SelectField
          className="sq-pagination__page-size"
          label={pageSizeLabel}
          value={String(value.pageSize)}
          disabled={disabled}
          options={pageSizeOptions}
          onChange={({ value }) => {
            handlePageSizeChange(value);
          }}
        />
      )}
      <Pagination disabled={disabled} count={count} page={value.currentPage} defaultPage={defaultPage} color={color} onChange={handleChange} />
    </div>
  );
}

SQPagination.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'error']),
};

export default SQPagination;
