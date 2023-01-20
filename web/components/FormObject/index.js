import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import IconButton from '../ui/IconButton';
import './_form-object.scss';

class FormObject extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.addNew = this.addNew.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.valueOnChange = this.valueOnChange.bind(this);
  }
  valueOnChange(data, key) {
    const { onChange, value = {} } = this.props;
    const objVal = {...value};
    delete objVal[key];
    onChange &&
      onChange({
        value: { ...objVal, [data.value.key]: data.value.value},
      });
  }

  removeItem(key) {
    const { onChange, value = {} } = this.props;
    const objVal = {...value};
    delete objVal[key];
    onChange &&
      onChange({
        value: objVal,
      });
  }

  addNew() {
    const { onChange, value = {} } = this.props;

    onChange &&
      onChange({
        value: { ...value, key: undefined },
      });
  }

  render() {
    const { className = '', label, fields, value = {}, formClassName = 'sq-form--2-cols' } = this.props;
    return (
      <div className={`sq-form-list ${className}`}>
        <div className="sq-form-list__label mb-wide">{label}</div>
        {Object.keys(value).map((itemKey, idx) => {
          const itemVal = { key: itemKey, value: value[itemKey] };
          return (
            <div className="sq-form-list__item" key={idx}>
              <div className="sq-form-list__item-wrap">
                <Form
                  className={`pb-none ${formClassName}`}
                  fields={fields || [
                    {
                      cmpType: 'Input',
                      name: 'key',
                      label: 'Key',
                    },
                    {
                      cmpType: 'Input',
                      name: 'value',
                      label: 'Value',
                    },
                  ]}
                  value={itemVal}
                  onChange={(data) => this.valueOnChange(data, itemKey)}
                />
                <IconButton iconName="Delete" color="error" size="small" onClick={() => this.removeItem(itemKey)} />
              </div>
            </div>
          );
        })}
        <IconButton iconName="add" onClick={this.addNew} />
      </div>
    );
  }
}

FormObject.propTypes = {
  value: PropTypes.object,
};

export default FormObject;
