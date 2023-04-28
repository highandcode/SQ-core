import Form from '../../components/Form';
import Progress from '../../components/Progress';
import LaunchTimer from '../../components/LaunchTimer';
import Wrapper from '../../components/Wrapper';
import TextColumnWithLinks from '../../components/ui/TextColumnWithLinks';
import { getMap } from '../../components/ui';
import { ItemTypes } from './ItemTypes';

import HeaderEdit from './edits/Header';
import HeroContentEdit from './edits/HeroContent';
import ImageWithSlideEdit from './edits/ImageWithSlide';
import FeaturedContentEdit from './edits/FeaturedContent';
import TextColumnWithLinksEdit from './edits/TextColumnWithLinks';
import RichTextEdit from './edits/RichText';
import InputEdit from './edits/Input';
import ReCaptchaEdit from './edits/ReCaptcha';
import SelectEdit from './edits/Select';
import RadioEdit from './edits/Radio';
import FormEdit from './edits/Form';
import CheckboxEdit from './edits/CheckboxField';
import CheckboxListEdit from './edits/CheckboxList';
import WrapperEdit from './edits/Wrapper';
import ButtonEdit from './edits/Button';
import TextEdit from './edits/Text';
import TabsEdit from './edits/Tabs';
import TextareaEdit from './edits/Textarea';
import ProgressEdit from './edits/Progress';
import CustomEdit from './edits/Custom';
import HTMLEdit from './edits/HTML';
import ImageEdit from './edits/Image';
import DateSelectorEdit from './edits/DateSelector';
import AutocompleteEdit from './edits/Autocomplete';
import AlertEdit from './edits/Alert';
import { GLOBAL_OPTIONS } from '../../globals';

const compList = {
  Form: {
    Component: Form,
    group: 'Form',
    hasPlaceholder: true,
    type: ItemTypes.FORM,
    defaultComp: 'Input',
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
      label: 'Label',
    },
  },
  RichText: {
    Component: getMap().RichText,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: RichTextEdit,
    sampleData: {
      label: 'Rich Label',
    },
  },
  Text: {
    Component: getMap().Text,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: TextEdit,
    sampleData: {
      text: 'text goes here',
    },
  },
  LaunchTimer: {
    Component: LaunchTimer,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: TextEdit,
    sampleData: {},
  },
  FormText: {
    Component: getMap().Text,
    name: 'Text',
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: TextEdit,
    sampleData: {
      text: 'text goes here',
    },
  },
  FormHeader: {
    Component: getMap().Header,
    name: 'Header',
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: TextEdit,
    sampleData: {
      text: 'text goes here',
      tag: 'h1',
    },
  },
  Tabs: {
    Component: getMap().Tabs,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: TabsEdit,
    sampleData: {},
  },
  DateSelector: {
    Component: getMap().DateSelector,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: DateSelectorEdit,
    sampleData: {
      inputFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      mask: '____/__/__',
    },
  },
  Progress: {
    Component: Progress,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: ProgressEdit,
    sampleData: {
      className: 'tp-progress--active',
      overlay: true,
    },
  },
  Header: {
    Component: getMap().Header,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: TextEdit,
    sampleData: {
      text: 'text goes here',
      tag: 'h1',
    },
  },
  Image: {
    Component: getMap().Image,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: ImageEdit,
    sampleData: {},
  },
  Button: {
    Component: getMap().Button,
    group: 'Actions',
    type: ItemTypes.COMPONENT,
    editData: ButtonEdit,
    sampleData: {
      buttonText: 'Action',
    },
  },
  Link: {
    Component: getMap().Link,
    group: 'Actions',
    type: ItemTypes.COMPONENT,
    editData: ButtonEdit,
    sampleData: {
      buttonText: 'Action',
    },
  },
  LinkButton: {
    Component: getMap().LinkButton,
    group: 'Actions',
    type: ItemTypes.COMPONENT,
    editData: ButtonEdit,
    sampleData: {
      buttonText: 'Action',
    },
  },
  Input: {
    Component: getMap().Input,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: InputEdit,
    sampleData: {
      label: 'Label',
    },
  },
  Textarea: {
    Component: getMap().Textarea,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: TextareaEdit,
    sampleData: {
      label: 'Label',
      minRows: 3,
    },
  },
  Radio: {
    Component: getMap().Radio,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: RadioEdit,
    sampleData: {
      label: 'Radio Label',
    },
  },
  ReCaptcha: {
    Component: getMap().ReCaptcha,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: ReCaptchaEdit,
    sampleData: {},
  },
  Select: {
    Component: getMap().Select,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: SelectEdit,
    sampleData: {
      label: 'Select',
    },
  },
  Autocomplete: {
    Component: getMap().Autocomplete,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: AutocompleteEdit,
    sampleData: {
      label: 'Autocomplete',
    },
  },
  CheckboxField: {
    Component: getMap().CheckboxField,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: CheckboxEdit,
    sampleData: {
      label: 'Label',
    },
  },
  AlertElement: {
    Component: getMap().Alert,
    name: 'Alert',
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: AlertEdit,
    sampleData: {
      message: 'Sample message',
    },
  },
  Alert: {
    Component: getMap().Alert,
    group: 'Content',
    type: ItemTypes.COMPONENT,
    editData: AlertEdit,
    sampleData: {
      message: 'Sample message',
    },
  },
  CheckboxList: {
    Component: getMap().CheckboxList,
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: CheckboxListEdit,
    sampleData: {
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
    sampleData: {
      bodyClassName: 'row',
    },
  },
  '2-ColumnLayout': {
    Component: Wrapper,
    name: 'Wrapper',
    group: 'Layout',
    accept: [ItemTypes.COMPONENT, ItemTypes.FORM],
    hasPlaceholder: true,
    compTypeProp: 'component',
    editData: WrapperEdit,
    itemsPropName: 'items',
    hasItems: true,
    sampleData: {
      className: '',
      bodyClassName: 'row',
      items: [
        {
          component: 'Wrapper',
          name: 'wrapper1',
          className: 'col-xs-12 col-md-6',
        },
        {
          component: 'Wrapper',
          name: 'wrapper2',
          className: 'col-xs-12 col-md-6',
        },
      ],
    },
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
  Custom: {
    group: 'Content',
    type: ItemTypes.FORM,
    editData: CustomEdit,
    sampleData: {
      component: 'Custom',
    },
  },
  CustomElement: {
    group: 'Form Elements',
    type: ItemTypes.FORM_ELEMENT,
    editData: CustomEdit,
    sampleData: {
      cmpType: 'CustomElement',
    },
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
  ImageWithSlide: {
    group: 'Content',
    Component: getMap().ImageWithSlide,
    sampleData: {
      eyebrow: 'eybrow',
      header: 'Header',
    },
    editData: ImageWithSlideEdit,
  },
  FeaturedContent: {
    group: 'Content',
    Component: getMap().FeaturedContent,
    sampleData: {
    },
    editData: FeaturedContentEdit,
  },
  TextColumnWithLinks: {
    group: 'Content',
    Component: TextColumnWithLinks,
    sampleData: {
    },
    editData: TextColumnWithLinksEdit,
  },
  HTML: {
    group: 'Content',
    Component: getMap().HTML,
    sampleData: {},
    editData: HTMLEdit,
  },
};

export const getSupportedComps = () => compList;

export const addComponent = (name, comp) => (compList[name] = comp);
