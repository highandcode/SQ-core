import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import IconButton from '../ui/IconButton';
import './_form-list.scss';

class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.addNew = this.addNew.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.valueOnChange = this.valueOnChange.bind(this);
  }
  valueOnChange(data, idx) {
    const { onChange, value = [] } = this.props;
    const itemArr = [...value];
    itemArr[idx] = { ...data.value };
    onChange &&
      onChange({
        value: [...itemArr],
      });
  }

  removeItem(idx) {
    const { onChange, value = [] } = this.props;
    const itemArr = [...value];
    itemArr.splice(idx, 1);
    onChange &&
      onChange({
        value: [...itemArr],
      });
  }

  addNew() {
    const { onChange, value = [] } = this.props;

    onChange &&
      onChange({
        value: [...value, {}],
      });
  }

  render() {
    const {
      className = '',
      label,
      fields = [],
      value = [],
      formClassName,
    } = this.props;
    return (
      <div className={`sq-form-list ${className}`}>
        <div className="sq-form-list__label mb-wide">{label}</div>
        {value.map((itemVal, idx) => {
          return (
            <div className="sq-form-list__item">
              <div className="sq-form-list__item-wrap">
                <Form
                  className={`pb-none ${formClassName}`}
                  fields={fields}
                  value={itemVal}
                  onChange={(data) => this.valueOnChange(data, idx)}
                />
                <IconButton
                  iconName="Delete"
                  color="error"
                  size="small"
                  onClick={() => this.removeItem(idx)}
                />
              </div>
            </div>
          );
        })}
        <IconButton iconName="add" onClick={this.addNew} />
      </div>
    );
  }
}

FormList.propTypes = {
  fields: PropTypes.array,
  value: PropTypes.array,
};

export default FormList;
