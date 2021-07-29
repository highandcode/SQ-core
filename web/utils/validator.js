import { translate } from './translate';
import { Validator, validators } from '../../server/src/utils/validator';

Validator.parseMessage = (message) => {
  return translate(message);
};

export { Validator, validators };
