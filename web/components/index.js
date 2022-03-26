import CallToAction from './CallToAction';
import Header from './ui/Header';
import Alert from './Alert';
import LinkButton from './ui/LinkButton';
import HeroContent from './ui/HeroContent';
import FeaturedContent from './ui/FeaturedContent';
import Pricing from './ui/Pricing';
import Icon from './Icon';
import List from './ui/List';
import Button from './ui/Button';
import CodeHighlight from './ui/CodeHighlight';
import Progress from './Progress';
import Form from './Form';
import LinkBlock from './ui/LinkBlock';
import Repeater from './ui/Repeater';
import CompRenderer from './ui/CompRenderer';
import Separator from './ui/Separator';
import LinkButtonList from './ui/LinkButtonList';
import ImageInfoSlider from './ui/ImageInfoSlider';
import TextColumnWithLinks from './ui/TextColumnWithLinks';
import MagicHeroContent from './ui/MagicHeroContent';
import ImageOnDevice from './ui/ImageOnDevice';
import ImageWithSlide from './ui/ImageWithSlide';
import ImageWithSlideList from './ui/ImageWithSlideList';
import LaunchTimer from './LaunchTimer';
import Carousel from './Carousel';
import PropsTable from './PropsTable';

let comps = {
  Alert,
  Button,
  PropsTable,
  Icon,
  CallToAction,
  Header,
  HeroContent,
  FeaturedContent,
  Pricing,
  LinkBlock,
  List,
  CodeHighlight,
  ImageInfoSlider,
  LinkButton,
  TextColumnWithLinks,
  CompRenderer,
  Repeater,
  Separator,
  LinkButtonList,
  MagicHeroContent,
  ImageOnDevice,
  ImageWithSlide,
  ImageWithSlideList,
  LaunchTimer,
  Carousel,
  Progress,
  Form
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
