import { translate } from './translate';
import { Validator, validators, addValidator, getValidators } from '../../server/src/utils/validator';

Validator.parseMessage = (message) => {
  return translate(message);
};

export { Validator, validators, addValidator, getValidators };
