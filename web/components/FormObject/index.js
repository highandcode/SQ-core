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
    const newMap = { ...this.state.objMap };
    delete newMap[key];
    this.setState({
      objMap: newMap,
    });
    onChange &&
      onChange({
        value: objVal,
      });
  }

  convertToObj(key) {
    const { value = {}, onChange } = this.props;
    this.setState({
      objMap: {
        ...this.state.objMap,
        [key]: true,
      },
    });
    onChange &&
      onChange({
        value: {
          ...value,
          [key]: {
            child: value[key],
          },
        },
      });
  }

  addNew() {
    const { onChange, value = {}, keyName = 'key' } = this.props;
    let idx = 0;
    while (value[keyName + idx] || value[keyName + idx] === '') {
      idx++;
    }
    onChange &&
      onChange({
        value: { ...value, [keyName + idx]: '' },
      });
  }

  render() {
    const {
      className = '',
      label,
      fields,
      value = {},
      formClassName = 'sq-form--keyval-mode',
      ...rest
    } = this.props;
    return (
      <div className={`sq-form-object ${className}`}>
        {label && <div className="sq-form-object__label mb-wide">{label}</div>}
        {Object.keys(value).map((itemKey, idx) => {
          const itemVal = { key: itemKey, value: value[itemKey] };
          const isObject =
            this.state.objMap[itemKey] || typeof itemVal.value === 'object';
          const finalClassName = !isObject
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
                        cmpType: 'EditableField',
                        name: 'key',
                        editProps: {
                          label: 'Key',
                        },
                      },
                      {
                        cmpType: isObject ? 'FormObject' : 'EditableField',
                        name: 'value',
                        label: isObject ? '' : 'Value',
                        editProps: {
                          label: 'Value',
                        },
                      },
                    ]
                  }
                  value={itemVal}
                  onChange={(data) => this.valueOnChange(data, itemKey)}
                />
                {!isObject && (
                  <IconButton
                    title={'Convert to object'}
                    iconName="DataObject"
                    color="success"
                    size="small"
                    onClick={() => this.convertToObj(itemKey)}
                  />
                )}
                <IconButton
                  iconName="Delete"
                  title="Delete"
                  color="error"
                  size="small"
                  onClick={() => this.removeItem(itemKey)}
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

FormObject.propTypes = {
  value: PropTypes.object,
};

export default FormObject;
