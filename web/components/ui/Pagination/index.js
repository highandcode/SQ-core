import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';

function SQPagination({
  className = '',
  defaultPage,
  count,
  onChange,
  value = {},
  color = 'primary',
}) {
  const handleChange = (event, value) => {
    onChange &&
      onChange({
        value: {
          currentPage: value,
        },
      });
  };

  return (
    <div className={`sq-pagination ${className}`}>
      <Pagination
        count={count}
        page={value.currentPage}
        defaultPage={defaultPage}
        color={color}
        onChange={handleChange}
      />
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
