import CallToAction from './CallToAction';
import Header from './ui/Header';
import Alert from './Alert';
import LinkButton from './ui/LinkButton';
import HeroContent from './ui/HeroContent';
import FeaturedContent from './ui/FeaturedContent';
import Dialog from './Dialog';
import Pricing from './ui/Pricing';
import Icon from './Icon';
import List from './ui/List';
import Button from './ui/Button';
import TextWithImageTiles from './TextWithImageTiles';
import HeaderWithTiles from './HeaderWithTiles';
import Grouper from './Grouper';
import Wrapper from './Wrapper';
import Skeleton from './Skeleton';
import CodeHighlight from './ui/CodeHighlight';
import ImageCardList from './ImageCardList';
import ImageCard from './ImageCard';
import Progress from './Progress';
import InlineProgress from './InlineProgress';
import Form from './Form';
import FormList from './FormList';
import FormObject from './FormObject';
import Grid from './Grid';
import LinkBlock from './ui/LinkBlock';
import Repeater from './ui/Repeater';
import CompRenderer from './ui/CompRenderer';
import Separator from './ui/Separator';
import LinkButtonList from './ui/LinkButtonList';
import ImageInfoSlider from './ui/ImageInfoSlider';
import TextColumnWithLinks from './ui/TextColumnWithLinks';
import MagicHeroContent from './ui/MagicHeroContent';
import Image from './ui/Image';
import ImageOnDevice from './ui/ImageOnDevice';
import ImageWithSlide from './ui/ImageWithSlide';
import ImageWithSlideList from './ui/ImageWithSlideList';
import LaunchTimer from './LaunchTimer';
import Carousel from './Carousel';
import ImageWithSpotlight from './ImageWithSpotlight';
import PropsTable from './PropsTable';
import NavTabs from './NavTabs';
import ReCaptcha from './ui/ReCaptcha';

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
  Image,
  Grouper,
  Wrapper,
  CodeHighlight,
  ImageInfoSlider,
  LinkButton,
  TextColumnWithLinks,
  CompRenderer,
  ReCaptcha,
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
  Form,
  Grid,
  InlineProgress,
  ImageWithSpotlight,
  FormList,
  FormObject,
  Skeleton,
  NavTabs,
  TextWithImageTiles,
  HeaderWithTiles,
  ImageCard,
  ImageCardList,
  Dialog,
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
