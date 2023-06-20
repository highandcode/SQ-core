import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Actions } from '../../components/root';
import * as utils from '../../utils';
import { loadPageTree, loadPagesByPath, deletePage, clonePage } from '../../redux/admin';
import { updateUserData } from '../../redux/content';
import BaseContainer from '../BaseContainer';
import Dialog from '../../components/Dialog';
import clonePageConfig from './ClonePage';
import { GLOBAL_OPTIONS } from '../../globals';

import PathTree from './PathTree';
import DynamicContent from '../DynamicContent';

// const { Grid, Tabs, Form, Pagination, Link, Dialog, Actions } = root;
// const { formatters } = utils.format;
const { translate } = utils.translate;

class PageListing extends BaseContainer {
  constructor() {
    super();
    this.state = {};
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onGridAction = this.onGridAction.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.onCloneFormSubmit = this.onCloneFormSubmit.bind(this);
    this.onTreeSelect = this.onTreeSelect.bind(this);
  }

  async componentDidMount() {
    const { pageData, store } = this.props;
    this.props.commonActions.startLoading();
    if (pageData.enableTree !== false) {
      await this.props.raiseAction(loadPageTree({}, pageData.getPageTreeConfig));
      await this.setState({
        parentPath: store.admin.contentTree?.path,
      });
    }
    this.refreshPages();
  }

  async refreshPages(options = {}) {
    const { parentPath = this.state.parentPath, pageNo = 1, pageSize = GLOBAL_OPTIONS.noOfResultsDropdown.toArray()[0].value } = options;
    const { pageData } = this.props;
    this.props.commonActions.startLoading();
    await this.props.raiseAction(loadPagesByPath({ parentPath }, pageData.getPagesConfig, { pageNo, pageSize }));
    this.props.commonActions.stopLoading();
  }

  onFilterChange(data) {
    Object.keys(data.value).forEach((key) => (data.value[key] == null || data.value[key] == '') && delete data.value[key]);
    this.setState({
      currentFilter: data.value,
    });
  }

  componentDidUpdate(prevProps) {
    const { pageData } = this.props;
    const { pageData: prevPageData } = prevProps;
    if (pageData.id !== prevPageData.id) {
      this.refreshPages();
    }
  }

  getCurrentPage() {
    const { store } = this.props;
    return {
      pageNo: store.admin?.contentPagesPagination.currentPage,
      pageSize: store.admin?.contentPagesPagination.pageSize,
    };
  }

  async onGridAction(row, value, column) {
    const { pageData, store } = this.props;
    switch (value.action) {
      case 'clone':
        this.setState({
          openClone: true,
          cloneFrom: row,
        });
        break;
      case 'delete':
        this.props.commonActions.startLoading();
        await this.props.raiseAction(deletePage(row, pageData.contentPageConfig));
        const currentPage = this.getCurrentPage();
        this.refreshPages({ ...currentPage });
        break;
      case 'edit':
        utils.redirect.redirectTo(
          row.type === 'SITE_MAP' ? pageData.editSiteMap || 'editSiteMap' : pageData.editPage || 'editPage',
          {
            path: row.path,
            pageId: row.pageId /* replace with data.uid */,
          },
          { target: '_blank' }
        );
        break;
      case 'preview':
        utils.redirect.redirectTo(row.path, {}, { target: '_blank' });
        break;
    }
  }
  async onCloneFormSubmit(data) {
    const { pageData } = this.props;
    this.props.commonActions.startLoading();
    await this.props.raiseAction(
      clonePage(data, pageData.clonePageConfig, {
        success: () => {
          const currentPage = this.getCurrentPage();
          this.refreshPages({...currentPage});
          this.setState({
            openClone: false,
          });
        },
        error: (resp) => {
          this.props.commonActions.stopLoading();
          if (resp.error?.errors) {
            this.props.raiseAction(
              updateUserData({
                formData_errors: resp.error.errors,
              })
            );
          }
        },
      })
    );
  }
  async toggleEditForm() {
    this.setState({
      openClone: false,
    });
  }

  async onTreeSelect(data) {
    const { pageData } = this.props;
    this.props.commonActions.startLoading();
    this.setState({
      parentPath: data.value,
    });
    await this.props.raiseAction(loadPagesByPath({ parentPath: data.value }, pageData.getPagesConfig));
    this.props.commonActions.stopLoading();
  }

  render() {
    const { store, pageData = {} } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="sq-page-listing sq-v-screen sq-v-screen--fixed">
        <div className="sq-v-screen__container">
          <div className="container-fluid mt-wide mb-wide">
            <Dialog open={this.state.openClone} onClose={this.toggleEditForm} title={`Clone page`}>
              <div className="mt-wide">
                <DynamicContent
                  className={`sq-page-listing__clone`}
                  onSubmit={this.onCloneFormSubmit}
                  pageConfig={clonePageConfig({
                    formData: this.state.cloneFrom,
                    ...pageData.cloneConfig,
                  })}
                ></DynamicContent>
              </div>
            </Dialog>
            <Actions
              actions={[
                {
                  type: 'Button',
                  iconName: 'add',
                  size: 'small',
                  to: pageData.addNewPage || 'addNewPage',
                  buttonText: 'Add New',
                },
              ].filter((i) => i)}
            />
          </div>
          <div className={`container-fluid  sq-v-screen__body-container`}>
            <div className="sq-v-screen-grow mb-wide sq-page-listing__container">
              {pageData.enableTree !== false && (
                <div className="sq-page-listing__left">
                  <PathTree data={store.admin.contentTree} onChange={this.onTreeSelect} value={this.state.parentPath} />
                </div>
              )}
              <Grid
                className="sq-basic-grid sq-page-listing__right sq-basic-grid--rounded sq-grid--fixed"
                paginationProps={{
                  disabled: isLoading,
                  count: store.admin?.contentPagesPagination?.totalPages,
                  value: store.admin?.contentPagesPagination,
                  onChange: (data) =>
                    this.refreshPages({
                      pageNo: data?.value?.currentPage,
                      pageSize: data?.value?.pageSize,
                    }),
                  enablePageSize: true,
                  pageSizeOptions: GLOBAL_OPTIONS.noOfResultsDropdown.toArray(),
                }}
                // loader={<Skeleton styleName={`grid-tran`} rows={8} />}
                onAction={this.onGridAction}
                columns={[
                  {
                    name: 'icon',
                    cmpType: 'Icon',
                    className: 'col-icon',
                    sort: false,
                    component: {
                      name: (row) => {
                        return row.type === 'SITE_MAP' ? 'AccountTree' : 'Description';
                      },
                    },
                  },
                  {
                    name: 'title',
                    headerText: 'Page Title',
                    className: 'col-large',
                    render: (val, col, row) => row.pageName || (row.type === 'SITE_MAP' ? `${row.pageData?.siteMap?.title}` : `${row.pageData?.title}`),
                  },
                  {
                    name: 'path',
                    headerText: 'Path',
                    className: 'col-large-grow',
                  },

                  {
                    name: 'actions',
                    headerText: 'Actions',
                    className: 'col-actions',
                    cmpType: 'MoreActions',
                    sort: false,
                    component: {
                      actions: [
                        {
                          cmpType: 'LinkButton',
                          action: 'edit',
                          iconName: 'edit',
                          buttonText: translate('Edit'),
                        },
                        {
                          cmpType: 'LinkButton',
                          action: 'preview',
                          iconName: 'RestartAlt',
                          buttonText: translate('Preview'),
                          render: (row) => row.type === 'PAGE',
                        },
                        {
                          cmpType: 'LinkButton',
                          iconName: 'deactivate',
                          iconColor: 'error',
                          action: 'unpublish',
                          buttonText: translate('UnPublish'),
                          render: (row) => {
                            return row.status === 'PUBLISHED';
                          },
                        },
                        {
                          cmpType: 'LinkButton',
                          iconName: 'active',
                          iconColor: 'success',
                          action: 'publish',
                          buttonText: translate('Publish'),
                          render: (row) => {
                            return row.status === 'DRAFT';
                          },
                        },
                        {
                          cmpType: 'LinkButton',
                          iconName: 'ContentCopy',
                          iconColor: 'info',
                          action: 'clone',
                          buttonText: translate('Clone'),
                        },
                        {
                          cmpType: 'LinkButton',
                          iconName: 'Delete',
                          iconColor: 'error',
                          action: 'delete',
                          buttonText: translate('Delete'),
                          confirm: {
                            title: 'Confirm?',
                            content: 'Are you sure you want to delete this page?',
                          },
                        },
                      ],
                    },
                  },
                ]}
                showHeader={true}
                data={store.admin?.contentPages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageListing.propTypes = {
  raiseAction: PropTypes.func,
  store: PropTypes.object,
  commonActions: PropTypes.object,
  appActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export { PageListing };

export default PageListing;
