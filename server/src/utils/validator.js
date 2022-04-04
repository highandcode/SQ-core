const commons = require('./common');
const _ = require('lodash');

const _validators = {
  required: (value, { required }, fields) => {
    if (required && required(fields) === false) {
      return true;
    }
    return !commons.isNullOrUndefined(value) && !!String(value).trim();
  },
  email: (value) => {
    return value ? _validators.regex(value, {
      regex:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }) : true;
  },
  and: (value, { validations = [], ...options }) => {
    let returnToVal = true;
    validations.forEach((item) => {
      if (_validators[item.type] && _validators[item.type](value, { ...options, ...item }) === false) {
        returnToVal = false;
      }
    });
    return returnToVal;
  },
  or: (value, { validations = [], ...options }) => {
    let returnToVal = false;
    validations.forEach((item) => {
      if (_validators[item.type] && !returnToVal && _validators[item.type](value, { ...options, ...item }) === true) {
        returnToVal = true;
      }
    });
    return returnToVal;
  },
  equals: (value, { subType = '=', matchValue }) => {
    if (subType === '=') {
      return value === matchValue;
    } else if (subType === '!=') {
      return value !== matchValue;
    }
  },
  digits: (value, { length }) => {
    if (length) {
      if (value.toString().length > length) {
        return false;
      }
    }
    return new RegExp(`^[0-9]+$`, 'g').test(value);
  },
  decimals: (value, { length, negative = false, decimals = 2 }) => {
    if (length) {
      if (value.length > length) {
        return false;
      }
    }
    if (decimals > 0) {
      return new RegExp(`^${negative ? '\\s*[+-]?' : ''}(\\d+|\\.\\d+|\\d+\\.\\d{1,${decimals}}|\\d+\\.)?$`, 'g').test(value);
    } else {
      return new RegExp(`^${negative ? '\\s*[+-]?' : ''}(\\d+)?$`, 'g').test(value);
    }
  },
  compareField: (value, { fieldName, compare = '=', trim = false }, otherFields) => {
    let val1 = commons.isNullOrUndefined(value) ? '' : value;
    let val2 = commons.isNullOrUndefined(otherFields[fieldName]) ? '' : otherFields[fieldName];
    if (trim) {
      val1 = val1.trim();
      val2 = val2.trim();
    }
    if (compare === '=') {
      return val1 === val2;
    } else if (compare === '!=') {
      return val1 !== val2;
    }
    return true;
  },
  number: (value, options = {}) => {
    if (commons.isNullOrUndefinedBlank(value) && options.optional === true) {
      return true;
    }
    let isValid = new RegExp(`^\\s*[+-]?(\\d+|\\.\\d+|\\d+\\.\\d+|\\d+\\.)$`, 'g').test(value);
    if (!commons.isNullOrUndefined(options.min) && isValid) {
      isValid = value * 1 >= options.min;
    }
    if (!commons.isNullOrUndefined(options.max) && isValid) {
      isValid = value * 1 <= options.max;
    }
    return isValid;
  },
  custom: (value, options = {}, ...params) => {
    const { validator = () => true, ...restOpts } = options;
    if (validator && validator(value, restOpts, ...params)) {
      return true;
    }
    return false;
  },
  phone: (value, {optional = false}={}) => {
    return value ? _validators.number(value) && _validators.length(value, { exact: 10 }) : optional ? true : false;
  },
  internationalphone: (value) => {
    return !commons.isNullOrUndefined(value) && _validators.regex(value, { regex: /^\+[1-9]{1}[0-9]{10,14}$/ });
  },
  regex: (value, options) => {
    return !commons.isNullOrUndefined(options.regex) && options.regex.test(value);
  },
  length: (value, options) => {
    let isValid = true;
    if (!commons.isNullOrUndefined(options.exact) && String(value).trim().length !== options.exact) {
      isValid = false;
    }
    if (!commons.isNullOrUndefined(options.min) && String(value).trim().length < options.min) {
      isValid = false;
    }
    if (!commons.isNullOrUndefined(options.max) && String(value).trim().length > options.max) {
      isValid = false;
    }
    return isValid;
  },
  emailphone: (value) => {
    return _validators.email(value) || _validators.phone(value);
  },
  emailinternationalphone: (value) => {
    return _validators.email(value) || _validators.internationalphone(value);
  },
  date: (value) => {
    return value ? new Date(value).toString() !== 'Invalid Date' : true;
  },
  password: (value) => {
    return _validators.length(value, {
      min: 6
    });
  },
  options: (value, config = {}, values) => {
    const { subType = 'array', options = [], fieldName = 'value', optional = false } = config;
    const finalOptions = commons.getValue(this, options, config, values);
    if (optional && !value) {
      return true;
    }
    switch (subType) {
      case 'array':
        const item = _.filter(finalOptions, (item) => {
          if (typeof item === 'object' && item[fieldName] === value) {
            return true;
          } else if (typeof item === 'string' && item === value) {
            return true;
          }
          return false;
        });
        return item.length > 0;
    }
    return false;
  },
  array: (value, config = {}) => {
    if (config.valueType === 'string') {
      return Array.isArray(value) && value.map((i) => typeof i).filter((s) => s !== 'string').length === 0;
    }
    return Array.isArray(value);
  }
};

const _messages = {
  options: () => `Please select a valid option`,
  required: () => `This field is required`,
  compareField: () => `This field should match compare criteria`,
  emailphone: () => `Enter a valid email or phone`,
  emailinternationalphone: () => `Enter a valid email or phone with international code e.g +91`,
  email: () => `Enter a valid email`,
  array: () => `Array does not match schema`,
  length: ({ exact, min, max }) => {
    if (exact) {
      return `Length should be ${exact} chars`;
    }
    if (min && max) {
      return `Length should be between ${min} chars and ${max} chars`;
    }
    if (min) {
      return `Length should be mininum ${min} chars`;
    }
    if (max) {
      return `Length should be less than ${max} chars`;
    }
  },
  phone: () => `Enter a valid phone number`,
  internationalphone: () => `Enter a valid phone number with country code e.g. +91 910 989 9887`,
  password: () => `Password should be 6 characters long`
};

class Validator {
  constructor(validators = {}, options = {}) {
    this.validators = validators;
    this.options = Object.assign(
      {
        emptyObject: true,
        keys: {}
      },
      options
    );
    this.errors = {};
    this.values = {};
  }

  setValue(field, value) {
    this.values = {
      ...this.values,
      [field]: value
    };
  }

  setValues(values) {
    this.values = {
      ...this.values,
      ...values
    };
    return this;
  }

  validate(field, nested) {
    let isValid = true;
    let errorKey = '';
    let errorMessage = '';
    if (this.validators[field] && this.validators[field].validators) {
      Array.isArray(this.validators[field].validators) &&
        this.validators[field].validators.forEach(({ type, message, ...rest }) => {
          if (_validators[type] && (!this.validators[field].optional || this.values[field])) {
            if (isValid && !_validators[type](this.values[field], rest, this.values)) {
              isValid = false;
              errorMessage = message || (_messages[type] && _messages[type](rest, this.values));
              errorKey = this.options.keys[type] || '';
              return false;
            }
          }
        });
    } else if (this.validators[field] && this.validators[field].validator) {
      const { type, message, ...rest } = this.validators[field].validator;
      if ((!this.validators[field].optional || this.values[field]) && isValid && !_validators[type](this.values[field], rest, this.values)) {
        isValid = false;
        errorMessage = message || (_messages[type] && _messages[type](rest, this.values));
        errorKey = this.options.keys[type] || '';
      }
    }
    if (isValid) {
      if (this.options.emptyObject) {
        this.errors[field] = {};
      } else {
        delete this.errors[field];
      }
    } else {
      this.errors[field] = {
        error: true,
        errorMessage: Validator.parseMessage(errorMessage) || Validator.parseMessage(this.validators[field].errorMessage)
      };
      if (errorKey) {
        this.errors[field].key = errorKey;
      }
    }
    if (this.validators[field] && this.validators[field].impactOn && !nested) {
      this.validators[field].impactOn.forEach((fName) => {
        if (this.values[fName]) {
          this.validate(fName, true);
        }
      });
    }
    return isValid;
  }

  validateAll() {
    this.errors = {};
    let isValid = true;
    Object.keys(this.validators).forEach((fieldName) => {
      if (!this.validate(fieldName)) {
        isValid = false;
      }
    });
    return isValid;
  }
}
Validator.parseMessage = function (message) {
  return message;
};

const addValidator = (name, fn) => {
  if (name && typeof fn === 'function') {
    _validators[name] = fn;
  }
};

module.exports = {
  Validator,
  validators: _validators,
  addValidator,
  getValidators: () => _validators
};
