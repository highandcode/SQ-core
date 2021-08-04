import CallToAction from './CallToAction';
import Header from './ui/Header';
import LinkButton from './ui/LinkButton';
import HeroContent from './ui/HeroContent';
import FeaturedContent from './ui/FeaturedContent';
import Pricing from './ui/Pricing';
import CodeHighlight from './ui/CodeHighlight';
import LinkBlock from './ui/LinkBlock';
import Repeater from './ui/Repeater';
import CompRenderer from './ui/CompRenderer';
import Separator from './ui/Separator';
import LinkButtonList from './ui/LinkButtonList';
import ImageInfoSlider from './ui/ImageInfoSlider';
import TextColumnWithLinks from './ui/TextColumnWithLinks';

let comps = {
  CallToAction,
  Header,
  HeroContent,
  FeaturedContent,
  Pricing,
  LinkBlock,
  CodeHighlight,
  ImageInfoSlider,
  LinkButton,
  TextColumnWithLinks,
  CompRenderer,
  Repeater,
  Separator,
  LinkButtonList
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
