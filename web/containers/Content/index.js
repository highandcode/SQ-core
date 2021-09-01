import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { getMap } from '../../components';
import { Validator } from '../../utils/validator';
import './_content.scss';

@inject('commonStore', 'contentStore')
@observer
class Content extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { pageData = {}, location, ...rest } = this.props;
    const { userData = {} } = rest;
    const { pathname } = location;
    const { className = '' } = pageData;
    const compMap = getMap();

    return (
      <div className={`sq-content-page__body ${className}`}>
        {pageData.items &&
          pageData.items.map((block, idx) => {
            let validator;
            let isValid = true;
            if (block.match) {
              validator = new Validator({
                ...block.match
              });
              console.log('@@@', block);
              validator.setValues(userData);
              isValid = validator.validateAll();
              console.log('@@@', block, isValid, validator)
            }
            const Comp = compMap[block.component];
            return Comp && isValid ? <Comp key={pathname + idx} {...rest} {...block} /> : undefined;
          })}
      </div>
    );
  }
}

Content.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default Content;
