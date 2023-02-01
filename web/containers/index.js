import ComponentDemo from './ComponentDemo';
import Contact from './Contact';
import Content from './Content';
import ContentWithLeftNavigation from './ContentWithLeftNavigation';
import ContentWithSearch from './ContentWithSearch';
import Documentation from './Documentation';
import * as DynamicContent from './DynamicContent';
import * as PageBuilder from './PageBuilder';
import * as SiteMapBuilder from './SiteMapBuilder';
import LayoutContent from './LayoutContent';
import MultiView from './MultiView';
import TocIndex from './TocIndex';
import Users from './Users';
import PageListing from './PageListing';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import templates from '../templates';

export {
  ComponentDemo,
  DynamicContent,
  PageBuilder,
  SiteMapBuilder,
  ContentWithSearch,
  MultiView,
  ForgotPassword,
  ResetPassword,
  Documentation,
  LayoutContent,
  ContentWithLeftNavigation,
  Contact,
  Content,
  TocIndex,
  Login,
  Register,
  Users,
  PageListing,
};

export default {
  ComponentDemo,
  DynamicContent: DynamicContent.default,
  PageBuilder: PageBuilder.default,
  SiteMapBuilder: SiteMapBuilder.default,
  ContentWithSearch,
  MultiView,
  ForgotPassword,
  ResetPassword,
  Documentation,
  LayoutContent,
  ContentWithLeftNavigation,
  Contact,
  Content,
  TocIndex,
  Login,
  Register,
  Users,
  PageListing,
  ...templates,
};
