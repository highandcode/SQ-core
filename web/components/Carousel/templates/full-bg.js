import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import MagicHeroContent from '../../ui/MagicHeroContent';

function FullBg({ data }) {
  return (
    <Paper>
      <MagicHeroContent {...data} />
    </Paper>
  );
}

FullBg.propTypes = {
  data: PropTypes.object
};

export default FullBg;
