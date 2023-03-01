import ComponentDemo from './ComponentDemo';
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
import UsersList from './UsersList';
import RolesList from './RolesList';
import PageListing from './PageListing';

import templates from '../templates';

export {
  ComponentDemo,
  DynamicContent,
  PageBuilder,
  SiteMapBuilder,
  ContentWithSearch,
  MultiView,
  Documentation,
  LayoutContent,
  ContentWithLeftNavigation,
  Content,
  TocIndex,
  UsersList,
  PageListing,
};

export default {
  ComponentDemo,
  DynamicContent: DynamicContent.default,
  PageBuilder: PageBuilder.default,
  SiteMapBuilder: SiteMapBuilder.default,
  ContentWithSearch,
  MultiView,
  Documentation,
  LayoutContent,
  ContentWithLeftNavigation,
  Content,
  TocIndex,
  UsersList,
  PageListing,
  RolesList,
  ...templates,
};
