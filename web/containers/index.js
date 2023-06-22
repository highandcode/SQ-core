import SiteMapBuilder from './SiteMapBuilder';
import PageBuilder from './PageBuilder';
import DynamicContent from './DynamicContent';
import LayoutContent from './LayoutContent';
import ComponentDemo from './ComponentDemo';
import Content from './Content';
import ContentWithLeftNavigation from './ContentWithLeftNavigation';
import ContentWithSearch from './ContentWithSearch';
import Documentation from './Documentation';
import MultiView from './MultiView';
import TocIndex from './TocIndex';
import UsersList from './UsersList';
import GenericListing from './GenericListing';
import RolesList from './RolesList';
import RoleDetails from './RoleDetails';
import PageListing from './PageListing';
import MediaGallery from './MediaGallery';
import EmailTemplateList from './EmailTemplateList';

import templates from '../templates';

export { ComponentDemo, GenericListing, DynamicContent, PageBuilder, SiteMapBuilder, ContentWithSearch, MultiView, Documentation, LayoutContent, ContentWithLeftNavigation, Content, TocIndex, UsersList, PageListing, MediaGallery, EmailTemplateList };

export default {
  ComponentDemo,
  DynamicContent,
  PageBuilder,
  SiteMapBuilder,
  ContentWithSearch,
  MultiView,
  GenericListing,
  Documentation,
  LayoutContent,
  ContentWithLeftNavigation,
  Content,
  TocIndex,
  UsersList,
  PageListing,
  RolesList,
  RoleDetails,
  EmailTemplateList,
  MediaGallery,
  ...templates,
};
