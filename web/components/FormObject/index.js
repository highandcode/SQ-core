import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import IconButton from '../ui/IconButton';
import './_form-object.scss';

class FormObject extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], objMap: {} };
    this.addNew = this.addNew.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.convertToObj = this.convertToObj.bind(this);
    this.valueOnChange = this.valueOnChange.bind(this);
  }
  valueOnChange(data, key) {
    const { onChange, value = {} } = this.props;
    const objVal = { ...value };
    let oldValue;
    if (key !== data.value.key) {
      oldValue = objVal[key];
      delete objVal[key];
    }
    objVal[data.value.key] = oldValue || data.value.value;
    onChange &&
      onChange({
        value: objVal,
      });
  }

  removeItem(key) {
    const { onChange, value = {} } = this.props;
    const objVal = { ...value };
    delete objVal[key];
    onChange &&
      onChange({
        value: objVal,
      });
  }

  convertToObj(key) {
    const { value = {} } = this.props;
    this.setState({
      objMap: {
        ...this.state.objMap,
        [key]: true,
      },
    });
    onChange &&
      onChange({
        value,
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
    const {
      className = '',
      label,
      fields,
      value = {},
      formClassName = 'sq-form--2-cols',
      ...rest
    } = this.props;
    return (
      <div className={`sq-form-object ${className}`}>
        <div className="sq-form-object__label mb-wide">{label}</div>
        {Object.keys(value).map((itemKey, idx) => {
          const itemVal = { key: itemKey, value: value[itemKey] };
          const notObject =
            this.state.objMap[idx] || typeof itemVal.value !== 'object';
          const finalClassName = notObject
            ? formClassName
            : 'sq-form--object-mode';
          return (
            <div className="sq-form-object__item" key={itemVal.key}>
              <div className="sq-form-object__item-wrap">
                <Form
                  {...rest}
                  className={`pb-none ${finalClassName}`}
                  fields={
                    fields || [
                      {
                        cmpType: 'Input',
                        name: 'key',
                        label: 'Key',
                      },
                      {
                        cmpType:
                          this.state.objMap[idx] ||
                          typeof itemVal.value === 'object'
                            ? 'FormObject'
                            : 'Input',
                        name: 'value',
                        label: 'Value',
                      },
                    ]
                  }
                  value={itemVal}
                  onChange={(data) => this.valueOnChange(data, itemKey)}
                />
                <IconButton
                  iconName="Delete"
                  color="error"
                  size="small"
                  onClick={() => this.removeItem(itemKey)}
                />
                {notObject && (
                  <IconButton
                    title={'Convert to object'}
                    iconName="Object"
                    color="success"
                    size="small"
                    onClick={() => this.convertToObj(idx)}
                  />
                )}
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
