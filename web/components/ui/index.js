import Header from './Header';
import Button from './Button';
import LinkButton from './LinkButton';
import HeroContent from './HeroContent';
import FeaturedContent from './FeaturedContent';
import Input from './InputField';
import Link from './Link';
import Text from './Text';
import LinkBlock from './LinkBlock';
import Select from './SelectField';
import Label from './Label';
import Switch from './Switch';
import TagLabel from './TagLabel';
import Textarea from './Textarea';
import DatePicker from './DatePicker';
import DateSelector from './DateSelector';
import SelectPopup from './SelectPopup';
import Tabs from '../Tabs';
import IconSelector from '../IconSelector';
import Slider from '../Slider';
import CheckboxList, { CheckboxField } from './Checkbox';
import CardButton from '../CardButton';
import CardButtonList from '../CardButtonList';
import Radio from './Radio';
import RichText from './RichText';
import TextFields from './TextFields';
import ProgressIndicator from './ProgressIndicator';
import ImageInfoSlider from './ImageInfoSlider';
import Separator from './Separator';
import DataList from '../DataList';

let comps = {
  Header,
  Tabs,
  Text,
  Switch,
  TagLabel,
  Slider,
  CheckboxField,
  CheckboxList,
  IconSelector,
  Label,
  TextFields,
  Radio,
  HeroContent,
  FeaturedContent,
  Link,
  Button,
  DateSelector,
  LinkButton,
  Input,
  Select,
  DataList,
  SelectPopup,
  LinkBlock,
  DatePicker,
  Textarea,
  CardButton,
  CardButtonList,
  RichText,
  ProgressIndicator,
  Separator,
  ImageInfoSlider
};

const getMap = () => {
  return comps;
};
const addComp = (newComps) => {
  comps = {
    ...comps,
    ...newComps
  };
};
export { getMap, addComp };
