import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { cordova } from '../../../utils';

function Default({data}) {
  return (
    <Paper>
      <div className="sq-carousel__image">
        <img src={cordova.resolveImageUrl(data.imgUrl)} />
      </div>
      <div className="sq-carousel__content">
        <h2 className="sq-carousel__header">{data.name}</h2>
        <div className="sq-carousel__sub-header">{data.description}</div>
      </div>
    </Paper>
  );
}

Default.propTypes = {
  data: PropTypes.object
};

export default Default;