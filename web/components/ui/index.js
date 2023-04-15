import Header from './Header';
import Button from './Button';
import Alert from '../Alert';
import LinkButton from './LinkButton';
import HeroContent from './HeroContent';
import FeaturedContent from './FeaturedContent';
import Input from './InputField';
import FileUploader from './FileUploader';
import Link from './Link';
import Text from './Text';
import HTML from './HTML';
import FieldText from './FieldText';
import Pagination from './Pagination';
import DataField from './DataField';
import LinkBlock from './LinkBlock';
import IconButton from './IconButton';
import LinkButtonList from './LinkButtonList';
import Select from './SelectField';
import Label from './Label';
import Switch from './Switch';
import TagLabel from './TagLabel';
import ReCaptcha from './ReCaptcha';
import Textarea from './Textarea';
import DatePicker from './DatePicker';
import ButtonSelection from './ButtonSelection';
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
import InputWithOptions from './InputWithOptions';
import BasicRTE from './BasicRTE';
import TextFields from './TextFields';
import ProgressIndicator from './ProgressIndicator';
import Image from './Image';
import ImageInfoSlider from './ImageInfoSlider';
import ImageOnDevice from './ImageOnDevice';
import ImageWithSlide from './ImageWithSlide';
import Separator from './Separator';
import Autocomplete from './Autocomplete';
import DataList from '../DataList';
import IconCalendar from '../IconCalendar';
import MoreContent from './MoreContent';
import DropZoneFile from './DropZoneFile';
import TagDropdown from './TagDropdown';
import Default from './Default';
import CustomButton from './CustomButton';
// import ColorPicker from './ColorPicker';

let comps = {
  Alert,
  Header,
  Default,
  Tabs,
  Text,
  DataField,
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
  Autocomplete,
  DataList,
  ImageOnDevice,
  ImageWithSlide,
  Image,
  SelectPopup,
  LinkBlock,
  DatePicker,
  Textarea,
  CardButton,
  CardButtonList,
  RichText,
  ProgressIndicator,
  Separator,
  LinkButtonList,
  ReCaptcha,
  ImageInfoSlider,
  IconCalendar,
  MoreContent,
  Pagination,
  FieldText,
  HTML,
  FileUploader,
  DropZoneFile,
  BasicRTE,
  ButtonSelection,
  TagDropdown,
  IconButton,
  InputWithOptions,
  CustomButton,
  // ColorPicker,
};

const getMap = () => {
  return comps;
};
const addComp = (newComps) => {
  comps = {
    ...comps,
    ...newComps,
  };
};
export { getMap, addComp };
