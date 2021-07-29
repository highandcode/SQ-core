import { Validator } from "../../utils/validator";

class Entity {

  hasChanged = false;
  hasValidated = false;

  constructor({ raw = {}, entityType }, options = {}) {
    const { ref, repo, snapshot, validators = {} } = options;
    this.entityType = entityType;
    this.repo = repo;
    this.uid = raw.uid;
    this.rawData = raw;
    this.setDefaults();
    this.setData(raw);
    this.isSystem = !!raw.isSystem;
    this.setDerivedFields();
    this.validators = new Validator({ ...validators });
  }

  updateField(name, value) {
    this[name] = this.entityType.fields[name] ? this.entityType.fields[name](value) : value;
    this.onUpdateFields && this.onUpdateFields({ [name]: value });
  }
  updateFields(fields) {
    Object.keys(fields).forEach((fieldKey) => {
      if (this.entityType.fields[fieldKey] != undefined) {
        this[fieldKey] = this.entityType.fields[fieldKey](fields[fieldKey]);
      }
    });
    this.onUpdateFields && this.onUpdateFields(fields);
  }

  setDefaults() {
    this.entityType.fields = Object.assign({}, this.entityType.fields);
  }

  validateAll() {
    this.validators.setValues(this.toJson());
    this._isValid = this.validators.validateAll();
    return this._isValid;
  }
  validate(field) {
    this.validators.setValues(this.toJson());
    return this.validators.validate(field);
  }

  setData(raw) {
    Object.keys(this.entityType.fields).forEach((fieldKey) => {
      this[fieldKey] = this.entityType.fields[fieldKey](raw[fieldKey]);
    });
    this.entityType.infoFields && Object.keys(this.entityType.infoFields).forEach((fieldKey) => {
      this[fieldKey] = this.entityType.infoFields[fieldKey](raw[fieldKey]);
    });
  }
  setDerivedFields() {
    if (this.entityType.derivedFields) {
      Object.keys(this.entityType.derivedFields).forEach((fieldKey) => {
        this[fieldKey] = this.entityType.derivedFields[fieldKey](this);
      });
    }
  }

  updateRaw() {
    Object.keys(this.entityType.fields).forEach((fieldKey) => {
      this.rawData[fieldKey] = this.entityType.fields[fieldKey](this[fieldKey]);
    });
    return this;
  }

  toJson() {
    const objToReturn = {};
    if (this.uid) {
      objToReturn.uid = this.uid;
    }

    Object.keys(this.entityType.fields).forEach((fieldKey) => {
      objToReturn[fieldKey] = this[fieldKey];
    });
    let overrides;
    if (typeof (this.onBeforeJSON) === 'function') {
      overrides = this.onBeforeJSON(objToReturn);
    }
    return {
      ...objToReturn,
      ...overrides
    };
  }
}

export default Entity;