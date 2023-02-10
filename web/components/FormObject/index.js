import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import IconButton from '../ui/IconButton';
// import Actions from '../Actions';

class FormObject extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], objMap: {}, objArray: {} };
    this.addNew = this.addNew.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.convertToObj = this.convertToObj.bind(this);
    this.convertToArr = this.convertToArr.bind(this);
    this.valueOnChange = this.valueOnChange.bind(this);
    this.formOnAction = this.formOnAction.bind(this);
  }
  valueOnChange(data, key, isArray) {
    const { onChange, value = {} } = this.props;
    const objVal = isArray ? [...value] : { ...value };
    let oldValue;
    if (!isArray && key !== data.value.key) {
      oldValue = objVal[key];
      delete objVal[key];
    }
    if (!isArray) {
      objVal[data.value.key] = oldValue || data.value.value;
    } else {
      objVal[data.value.key * 1] = oldValue || data.value.value;
    }

    console.log(objVal);
    onChange &&
      onChange({
        value: objVal,
      });
  }

  isObject(val) {
    return typeof val === 'object';
  }
  isArray(val) {
    return Array.isArray(val) && typeof val === 'object';
  }

  formOnAction(action, key, isArray) {
    switch (action.actionType) {
      case 'object':
        this.convertToObj(key, isArray);
        break;
      case 'array':
        this.convertToArr(key, isArray);
        break;
      case 'bool':
        this.convertToBool(key, isArray);
        break;
    }
  }

  removeItem(key, isArray) {
    const { onChange, value = {} } = this.props;
    const objVal = isArray ? [...value] : { ...value };
    !isArray && delete objVal[key];
    isArray && objVal.splice(key * 1, 1);
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

  convertToObj(key, isArray) {
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
          [key]: isArray
            ? [value[key]]
            : {
                child: value[key],
              },
        },
      });
  }
  convertToBool(key, isArray) {
    const { value = {}, onChange } = this.props;
    this.setState({
      objMap: {
        ...this.state.objMap,
        [key]: false,
      },
      objArray: {
        ...this.state.objArray,
        [key]: false,
      },
    });
    onChange &&
      onChange({
        value: {
          ...value,
          [key]: Boolean(value[key].toString()),
        },
      });
  }

  convertToArr(key, isArray) {
    const { value = {}, onChange } = this.props;
    this.setState({
      objArray: {
        ...this.state.objArray,
        [key]: true,
      },
    });
    onChange &&
      onChange({
        value: {
          ...value,
          [key]: [
            {
              child: value[key],
            },
          ],
        },
      });
  }

  addNew(isArray) {
    const { onChange, value = {}, keyName = 'key' } = this.props;
    let idx = 0;
    if (!isArray) {
      while (value[keyName + idx] || value[keyName + idx] === '') {
        idx++;
      }
    }
    onChange &&
      onChange({
        value: isArray ? [...value, {}] : { ...value, [keyName + idx]: '' },
      });
  }

  render() {
    const { className = '', label, fields, value = {}, formClassName = 'sq-form--keyval-mode', ...rest } = this.props;
    const isArray = this.isArray(value);
    return (
      <div className={`sq-form-object ${className}`}>
        {label && <div className="sq-form-object__label mb-wide">{label}</div>}
        {value &&
          Object.keys(value).map((itemKey, idx) => {
            const itemVal = { key: itemKey, value: value[itemKey] };
            const isObject = this.state.objMap[itemKey] || this.isObject(itemVal.value);
            const isInternalArray = this.state.objArray[itemKey] || this.isArray(itemVal.value);
            const finalClassName = !isObject ? formClassName : 'sq-form--object-mode';
            return (
              <div className="sq-form-object__item" key={itemVal.key}>
                <div className="sq-form-object__item-wrap">
                  <Form
                    onAnalytics={rest.onAnalytics}
                    userData={rest.userData}
                    className={`pb-0 ${finalClassName}`}
                    fields={
                      fields || [
                        {
                          cmpType: isArray ? 'Text' : 'EditableField',
                          name: 'key',

                          editProps: {
                            label: 'Key',
                            disabled: isArray,
                          },
                        },
                        {
                          cmpType: isObject ? 'FormObject' : 'EditableField',
                          name: 'value',
                          editType: typeof itemVal.value === 'boolean' ? 'Switch' : 'Input',
                          label: isObject ? '' : 'Value',
                          editProps: {
                            label: 'Value',
                          },
                        },
                      ]
                    }
                    value={itemVal}
                    onChange={(data) => this.valueOnChange(data, itemKey, isArray)}
                  />
                  {/* {!fields && !isObject && !isInternalArray && <Actions
                    onAction={(data, action) =>
                      this.formOnAction(action, itemKey, isArray)
                    }
                    actions={[
                      {
                        iconName: 'DataObject',
                        iconColor: 'primary',
                        // buttonText: 'Convert to object',
                        iconVariant: 'success',
                        actionType: 'object',
                      },
                      {
                        iconName: 'Code',
                        iconColor: 'primary',
                        // buttonText: 'Convert to bool',
                        iconVariant: 'success',
                        actionType: 'bool',
                      },
                      {
                        iconName: 'DataArray',
                        // buttonText: 'Convert to array',
                        iconVariant: 'info',
                        actionType: 'array',
                      },
                    ]}
                  />} */}
                  {!fields && !isObject && !isInternalArray && <IconButton title={'Convert to object'} iconName="DataObject" color="success" size="small" onClick={() => this.convertToObj(itemKey, isArray)} />}
                  {!fields && !isObject && !isInternalArray && <IconButton title={'Convert to array'} iconName="DataArray" color="success" size="small" onClick={() => this.convertToArr(itemKey, isArray)} />}
                  {!fields && !isObject && !isInternalArray && <IconButton title={'Convert to bool'} iconName="Code" color="info" size="small" onClick={() => this.convertToBool(itemKey, isArray)} />}
                  <IconButton iconName="Delete" title="Delete" color="error" size="small" onClick={() => this.removeItem(itemKey, isArray)} />

                </div>
              </div>
            );
          })}
        <IconButton iconName="add" onClick={() => this.addNew(isArray)} />
      </div>
    );
  }
}

FormObject.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormObject;
