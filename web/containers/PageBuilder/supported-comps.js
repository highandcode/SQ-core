import Form from '../../components/Form';
import Wrapper from '../../components/Wrapper';
import { getMap } from '../../components/ui';
import { ItemTypes } from './ItemTypes';

import HeaderEdit from './edits/Header';
import HeroContentEdit from './edits/HeroContent';
import InputEdit from './edits/Input';
import ReCaptchaEdit from './edits/ReCaptcha';
import SelectEdit from './edits/Select';
import FormEdit from './edits/Form';
import CheckboxEdit from './edits/CheckboxField';
import WrapperEdit from './edits/Wrapper';
import { GLOBAL_OPTIONS } from '../../globals';

const compList = {
  Form: {
    Component: Form,
    group: 'Form',
    hasPlaceholder: true,
    type: ItemTypes.FORM,
    itemsPropName: 'fields',
    accept: [ItemTypes.FORM_ELEMENT, ItemTypes.FORM],
    compTypeProp: 'cmpType',
    hasItems: true,
    editData: FormEdit,
    sampleData: {},
  },
  Address: {
    Component: Form,
    name: 'Form',
    group: 'Pre-defined Elements',
    hasPlaceholder: true,
    type: ItemTypes.FORM,
    itemsPropName: 'fields',
    accept: [ItemTypes.FORM_ELEMENT, ItemTypes.FORM],
    compTypeProp: 'cmpType',
    hasItems: false,
    editData: FormEdit,
    sampleData: {
      className: 'sq-form--2-cols',
      fields: [
        {
          cmpType: 'Input',
          label: 'Address Line 1',
          name: 'addressLine1',
        },
        {
          cmpType: 'Input',
          label: 'Address Line 2',
          name: 'addressLine2',
        },
        {
          cmpType: 'Input',
          label: 'City',
          name: 'city',
        },
        {
          cmpType: 'Input',
          label: 'State',
          name: 'state',
        },
        {
          cmpType: 'Input',
          label: 'Postal Code',
          name: 'postalCode',
        },
      ],
    },
  },
  Name: {
    Component: Form,
    name: 'Form',
    group: 'Pre-defined Elements',
    hasPlaceholder: true,
    type: ItemTypes.FORM,
    itemsPropName: 'fields',
    accept: [ItemTypes.FORM_ELEMENT, ItemTypes.FORM],
    compTypeProp: 'cmpType',
    hasItems: false,
    editData: FormEdit,
    sampleData: {
      className: 'sq-form--3-cols',
      fields: [
        {
          cmpType: 'Select',
          label: 'Salutation',
          name: 'salutation',
          options: GLOBAL_OPTIONS.salutation.toArray(),
        },
        {
          cmpType: 'Input',
          label: 'First Name',
          name: 'firstName',
        },
        {
          cmpType: 'Input',
          label: 'Last Name',
          name: 'lastName',
        },
      ],
    },
  },
  Input: {
    Component: getMap().Input,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: InputEdit,
    sampleData: {
      name: 'fieldname',
      label: 'Label',
    },
  },
  ReCaptcha: {
    Component: getMap().ReCaptcha,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: ReCaptchaEdit,
    sampleData: {
    
    },
  },
  Select: {
    Component: getMap().Select,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: SelectEdit,
    sampleData: {
      name: 'fieldname',
      label: 'Select',
    },
  },
  CheckboxField: {
    Component: getMap().CheckboxField,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: CheckboxEdit,
    sampleData: {
      name: 'fieldname',
      label: 'Label',
    },
  },
  Wrapper: {
    Component: Wrapper,
    group: 'Layout',
    accept: [ItemTypes.COMPONENT, ItemTypes.FORM],
    hasPlaceholder: true,
    compTypeProp: 'component',
    editData: WrapperEdit,
    itemsPropName: 'items',
    hasItems: true,
  },
  Header: {
    Component: getMap().Header,
    group: 'Content',
    sampleData: {
      header: 'Header',
      subHeader: 'Sub header',
    },
    editData: HeaderEdit,
  },
  HeroContent: {
    group: 'Content',
    Component: getMap().HeroContent,
    sampleData: {
      header: 'Hero header',
      subHeader: 'sub header goes here',
    },
    editData: HeroContentEdit,
  },
};

export const getSupportedComps = () => compList;

export const addComponent = (name, comp) => (compList[name] = comp);
