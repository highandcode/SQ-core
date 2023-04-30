import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ui } from '../../index';
import * as utils from '../../utils';
import BaseContainer from '../BaseContainer';
import { GLOBAL_OPTIONS } from '../../globals';
import { hasPermission } from '../../redux/authentication';
import { loadTemplates } from '../../redux/emailtemplate';
import './_email-template.scss';

const { formatters } = utils.format;
const { translate } = utils.translate;
const { DateTime } = utils.datetime;
const defaultPageSize = GLOBAL_OPTIONS.noOfResultsDropdown.toArray()[0]?.value;

class EmailTemplateList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTab: GLOBAL_OPTIONS.userTabs.keys.ACTIVE_USERS,
      showFilters: false,
      currentFilter: {},
      currentSort: {
        sortColumn: 'subject',
        sortOrder: 'asc',
        showEditColumns: false,
        gridColumnUI: [],
        initialColumns: [],
        selectedColumns: [],
        editColumnData: [
          {
            name: 'name',
            headerText: 'name',
            className: 'col-lg-fixed',
          },
          {
            name: 'emailId',
            className: 'col-lg-fixed',
            headerText: 'Email ID',
          },
          {
            name: 'roleName',
            className: 'col-lg-fixed',
            headerText: 'Role',
          },
          {
            name: 'contactNumber',
            className: 'col-lg-fixed',
            headerText: 'Primary Phone Number',
          },
          {
            name: 'loginDate',
            className: 'col-lg-fixed',
            headerText: 'Login Date',
          },
          {
            name: 'tickets',
            className: 'col-lg-fixed',
            headerText: translate('Service Requests'),
          },
        ],
      },
    };
    this.tabs = GLOBAL_OPTIONS.userTabs.toArray();
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterToggle = this.onFilterToggle.bind(this);
    this.onFilterAction = this.onFilterAction.bind(this);
    this.onGridAction = this.onGridAction.bind(this);
    this.users_OnSort = this.users_OnSort.bind(this);
    this.onEditColumnToggle = this.onEditColumnToggle.bind(this);
    this.onColFilterSelection = this.onColFilterSelection.bind(this);
  }

  async componentDidMount() {
    const params = utils.queryString.query.get();
    const { pageData } = this.props;
    if (params.status) {
      await this.setState({
        currentFilter: {
          ...this.state.currentFilter,
          status: params.status,
        },
      });
    }
    await this.refreshTemplates({ filter: { active: true } });
    await this.props.emailActions.loadRoles(
      { userType: 'INTERNAL' },
      pageData?.apiConfig?.getRoles
    );
  }

  async refreshTemplates({ pageNo, pageSize, sort, filter, source } = {}) {
    const { pageData } = this.props;
    pageSize =
      pageSize ||
      defaultPageSize ||
      this.props.store.emailtemplate?.templatesPagination.pageSize;
    pageNo =
      pageNo ||
      this.props.store.emailtemplate?.templatesPagination?.currentPage ||
      1;
    let sortBy = (sort || this.state.currentSort).sortColumn;
    let sortDir = (sort || this.state.currentSort).sortOrder;
    const extra = {};
    if (!source) {
      source = this.state.currentTab;
    }
    if (source === GLOBAL_OPTIONS.userTabs.keys.ALL_USERS) {
      extra.isActive = undefined;
    }
    this.props.commonActions.startLoading();
    await this.props.emailActions.loadTemplates(
      {
        body: { ...(filter || this.state.currentFilter), ...extra },
        source,
        query: {
          sortBy: sortBy,
          sortDir: sortDir?.toUpperCase(),
          pageSize: pageSize,
          pageNo: pageNo,
        },
      },
      pageData?.apiConfig?.getTemplates
    );
    this.props.commonActions.stopLoading();
  }

  onColFilterSelection(data) {
    this.setState({
      selectedColumns: data.value,
      showFilter: false,
      showEditColumns: !this.state.showEditColumns,
    });
  }

  async updateColumnUI() {
    const columnsUI = (this.state.editColumnData || []).map((col) => {
      if (col.name !== 'projectCode') {
        col.hide = !this.state.currentEditColumn[col.name];
      }
      return col;
    });
    const finalColumns = columnsUI.filter((i) => !i.hide).map((i) => i.name);
    this.setState({
      showFilter: false,
      showEditColumns: false,
      gridColumnUI: columnsUI,
      selectedColumns: finalColumns,
    });
  }
  onEditColumnToggle(data, field) {
    this.setState({
      showFilter: false,
      showEditColumns: !this.state.showEditColumns,
    });
  }

  handleTabChange(data) {
    this.setState({
      currentTab: data.value,
    });
    let source = data.value;
    if (data.value === 'ACTIVE_USERS') {
      this.refreshTemplates({
        filter: { isActive: true, ...this.state.currentFilter },
        source: source,
        pageNo: 1,
      });
    } else if (data.value === 'INACTIVE_USERS') {
      this.refreshTemplates({
        filter: { isActive: false, ...this.state.currentFilter },
        source: source,
        pageNo: 1,
      });
    } else {
      this.refreshTemplates({ source: source, pageNo: 1 });
    }
  }

  onFilterChange(data) {
    Object.keys(data.value).forEach(
      (key) =>
        (data.value[key] == null || data.value[key] == '') &&
        delete data.value[key]
    );
    this.setState({
      currentFilter: data.value,
    });
  }

  async handlePageChange(data) {
    const { currentPage } = this.props.store.emailtemplate?.templatesPagination;
    let pageNo = data.value.currentPage;
    if (this.state.currentTab === 'ACTIVE_USERS') {
      await this.refreshTemplates({
        pageNo: pageNo,
      });
    } else if (this.state.currentTab === 'INACTIVE_USERS') {
      await this.refreshTemplates({
        pageNo: pageNo,
      });
    } else {
      await this.refreshTemplates({
        pageNo: pageNo,
      });
    }
  }

  async onGridAction(row, value, column) {
    const { currentPage, pageSize } =
      this.props.store.emailtemplate?.templatesPagination;
    const { pageData } = this.props;
    switch (value.action) {
      case 'edit':
        utils.redirect.redirectTo('editEmailTemplate', {
          uid: row.uid /* replace with data.uid */,
        });
        break;
      case 'delete':
        await this.props.emailActions.deleteUser(
          row,
          pageData?.apiConfig?.deleteUser
        );
        await this.refreshTemplates({
          filter: { isActive: true, ...this.state.currentFilter },
          pageSize: pageSize,
        });
        break;
    }
  }

  onFilterToggle() {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }

  async onFilterAction(data, action) {
    this.setState({
      showFilter: false,
    });
    if (data.value) {
      return;
    }
    const { currentPage } = this.props.store.emailtemplate?.templatesPagination;
    switch (action.actionType) {
      case 'resetfilter':
        this.setState({
          currentFilter: {},
        });
        await this.refreshTemplates({
          filter: {},
          currentPage: currentPage,
        });
        break;
      case 'applyfilter':
        if (this.state.currentTab === 'ACTIVE_USERS') {
          await this.refreshTemplates({
            filter: { ...this.state.currentFilter, isActive: true },
            currentPage: currentPage,
          });
        } else if (this.state.currentTab === 'INACTIVE_USERS') {
          await this.refreshTemplates({
            filter: { ...this.state.currentFilter, isActive: false },
            currentPage: currentPage,
          });
        } else {
          await this.refreshTemplates({
            pageNo: pageNo,
          });
        }
        break;
    }
  }

  async users_OnSort(data, column) {
    await this.setState({
      currentSort: data,
    });
    if (this.state.currentTab === 'ACTIVE_USERS') {
      await this.refreshTemplates({
        filter: { ...this.state.currentFilter, isActive: true },
        sort: data,
      });
    } else if (this.state.currentTab === 'INACTIVE_USERS') {
      await this.refreshTemplates({
        filter: { ...this.state.currentFilter, isActive: false },
        sort: data,
      });
    } else {
      await this.refreshTemplates({
        sort: data,
      });
    }
  }

  render() {
    const { store, pageData } = this.props;
    const { isLoading } = this.state;
    const createUserPerm = hasPermission('emailTemplate', store);
    const editUserPerm = hasPermission('emailTemplate', store);
    const deleteUserPerm = hasPermission('emailTemplate', store);
    const { Grid, Tabs, Form, Pagination, Dialog, Actions, Skeleton } =
      ui.getMap();
    const { fieldMapping = {} } = pageData;
    // console.log('@@@@userstore', store);
    return (
      <div className="sq-auth-users sq-v-screen sq-v-screen--fixed">
        <div className="sq-v-screen__container">
          <div className="container-fluid">
            <div className="sq-v-screen__top-header mt-wide">
              <div>
                <h2 className="mt-3">
                  {'Email Templates'}
                  {!isLoading &&
                    store.emailtemplate?.templatesPagination &&
                    `(${store.emailtemplate.templatesPagination.total})`}
                </h2>
              </div>
              <Actions
                actions={[
                  createUserPerm && {
                    type: 'Button',
                    iconName: 'add',
                    size: 'medium',
                    to: 'createNewEmailTemplate',
                    buttonText: 'Add New',
                  },
                  {
                    type: 'Button',
                    variant: 'outlined',
                    onClick: this.onEditColumnToggle,
                    iconName: 'edit',
                    buttonText: 'Edit Columns',
                    color: this.state.showEditColumns ? 'secondary' : 'primary',
                  },
                  {
                    type: 'Button',
                    iconName: 'filter-list',
                    variant: 'outlined',
                    size: 'medium',
                    onClick: this.onFilterToggle,
                    buttonText: 'Filters',
                    color: this.state.showFilter ? 'secondary' : 'primary',
                  },
                ].filter((i) => i)}
              />
            </div>
          </div>
          <div
            className={`sq-v-screen__body-container ${
              this.state.showFilter ? 'sq-auth-users__container-filter' : ''
            }`}
          >
            <Dialog
              open={this.state.showFilter}
              classes={{
                dialog: {
                  root: 'sq-dialog--fixed-right',
                },
              }}
              onClose={this.onFilterAction}
              onAction={this.onFilterAction}
              actions={[
                {
                  actionType: 'applyfilter',
                  buttonText: 'Apply',
                },
                {
                  actionType: 'resetfilter',
                  buttonText: 'Reset',
                  variant: 'outlined',
                },
              ]}
              title={'Filters'}
            >
              <Form
                onChange={this.onFilterChange}
                value={this.state.currentFilter}
                onAction={this.onFilterAction}
                name={'userFilter'}
                fields={[
                  {
                    name: 'from',
                    label: translate('From'),
                    ...fieldMapping.from,
                    cmpType: 'Input',
                    // multiple: true,
                  },
                  {
                    name: 'name',
                    label: translate('Name'),
                    ...fieldMapping.name,
                    cmpType: 'Input',
                    // options: this.props.store.project?.projects.data,
                  },
                  {
                    name: 'status',
                    cmpType: 'Autocomplete',
                    label: translate('Status'),
                    ...fieldMapping.roleCode,
                    options: GLOBAL_OPTIONS.emailStatus.toArray(),
                  },
                ]}
              />
            </Dialog>
            <div className="mb-wide">
              {store.emailtemplate.templatesPagination?.total > 0 && (
                <Pagination
                  className="j-content-fl-end ml-3"
                  enablePageSize={true}
                  count={store.emailtemplate?.templatesPagination.totalPages}
                  disabled={isLoading}
                  pageSizeOptions={GLOBAL_OPTIONS.noOfResultsDropdown.toArray()}
                  value={store.emailtemplate?.templatesPagination}
                  onChange={(data) => {
                    let pageNo = data.value.currentPage;
                    let pageSize = data.value.pageSize;
                    if (!isLoading) {
                      this.refreshTemplates({ pageNo, pageSize });
                    }
                  }}
                />
              )}
            </div>
            <div className="sq-v-screen-grow">
              {
                <Grid
                  onColFilterChange={this.onColFilterSelection}
                  className="sq-basic-grid sq-grid--fixed sq-basic-grid--rounded"
                  sortColumn={this.state.currentSort.sortColumn}
                  sortOrder={this.state.currentSort.sortOrder}
                  enableSort={true}
                  onSort={this.users_OnSort}
                  loader={<Skeleton styleName={`grid-tran`} rows={8} />}
                  onAction={this.onGridAction}
                  selectedColumns={this.state.selectedColumns}
                  showColSelection={this.state.showEditColumns}
                  columns={[
                    {
                      name: 'icon',
                      cmpType: 'Icon',
                      className: 'col-icon',
                      sort: false,
                      component: {
                        textIcon: (row) => row.name?.substr(0, 1),
                        iconClass: (row) => 'sq-icon--square',
                        variant: (row) =>
                          row.active
                            ? utils.accentColors.getColorByChar(
                                row.name?.substr(0, 1)
                              )
                            : 'default',
                      },
                      ...fieldMapping.icon,
                    },
                    {
                      name: 'name',
                      cmpType: 'TextFields',
                      headerText: 'Template Name',
                      className: 'sq-auth-users-screen--col-default',
                      component: {
                        fields: [
                          {
                            name: 'name',
                            className: '',
                          },
                          {
                            name: 'type',
                            className: 'sub-header',
                          },
                        ],
                      },
                      ...fieldMapping.firstName,
                    },
                    {
                      name: 'subject',
                      className: 'sq-auth-users-screen--col-small',
                      headerText: 'Subject',
                      ...fieldMapping.subject,
                    },
                    {
                      name: 'from',
                      className: 'sq-auth-users-screen--col-title',
                      headerText: 'From Email ID',
                      tooltip: {
                        title: (row) => row.from,
                        arrow: true,
                      },
                      ...fieldMapping.from,
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
                            disabled: !editUserPerm,
                            iconName: 'edit',
                            buttonText: translate('Edit'),
                          },

                          {
                            cmpType: 'LinkButton',
                            iconName: 'Delete',
                            confirm: {
                              title: translate('Confirm'),
                              content: translate(
                                'Are you sure you want to delete this user?'
                              ),
                            },
                            iconVariant: 'error',
                            action: 'delete',
                            disabled: !deleteUserPerm,
                            buttonText: translate('Delete'),
                            render: (row) => {
                              return row.active && deleteUserPerm;
                            },
                          },
                          {
                            cmpType: 'LinkButton',
                            iconName: 'active',
                            iconVariant: 'success',
                            action: 'activate',
                            disabled: !createUserPerm,
                            buttonText: translate('Re-Activate'),
                            render: (row) => {
                              return !row.active;
                            },
                          },
                        ],
                      },
                    },
                  ]}
                  showHeader={true}
                  data={store?.emailtemplate?.templates || []}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: {
      ...state,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emailActions: {
      loadTemplates: (data, config) => dispatch(loadTemplates(data, config)),
    },
  };
};

EmailTemplateList.propTypes = {
  raiseAction: PropTypes.func,
  store: PropTypes.object,
  commonActions: PropTypes.object,
  appActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export { EmailTemplateList as Users };

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplateList);
