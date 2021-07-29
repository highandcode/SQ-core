import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '../Icon';

import './tabs.scss';

class SQTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      value: undefined
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  }
  handleChange(evt, newValue) {
    const { onChange, valueField = 'value', options = [] } = this.props;
    const item = _.filter(options, { [valueField]: newValue });
    onChange &&
      onChange({
        value: newValue,
        data: item[0]
      });
    this.setState({
      value: newValue,
      data: item[0]
    });
  }

  render() {
    const { options = [], className = '', textField = 'text', valueField = 'value', iconOnly = false } = this.props;
    return (
      <div className={`sq-tabs ${className}`}>
        <Tabs
          indicatorColor="primary"
          value={this.state.value || (options[0] && options[0].value)}
          onChange={this.handleChange}
          className={'sq-tabs__root'}
        >
          {options.map((tab, idx) => {
            const { [textField]: text, [valueField]: value, className, iconName, icon: iconConfig = {}, ...rest } = tab;
            const { ...icon } = iconConfig;
            const IconToRender = iconName && <Icon name={iconName} variant="normal" {...icon} />;
            return <Tab key={'tab' + idx} value={value} arial-label={text} label={!iconOnly ? text : ''} icon={IconToRender} className={className} />;
          })}
        </Tabs>
      </div>
    );
  }
}

SQTabs.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default SQTabs;
