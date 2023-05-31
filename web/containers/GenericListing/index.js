import React, { Component } from 'react';
import { getMap } from '../../components/ui';
import { postApi, processParams } from '../../redux/content';
import { getCurrentFilter, setCurrentFilter, getCurrentSort, setCurrentSort, getCustomKeyData, setCustomKeyData } from '../../redux/common';
import { Validator } from '../../utils/validator';
import { GLOBAL_OPTIONS } from '../../globals';

import './_generic-listing.scss';

const defaultPageSize = GLOBAL_OPTIONS.noOfResultsDropdown.toArray()[0].value;

class GenericListing extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      showEditColumns: false,
    };
    this.handleAction = this.handleAction.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onQuickFilterChange = this.onQuickFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleOnSortChange = this.handleOnSortChange.bind(this);
    this.onGridAction = this.onGridAction.bind(this);
    this.onEditColumnChange = this.onEditColumnChange.bind(this);
    this.onFilterAction = this.onFilterAction.bind(this);
  }

  getKey(name) {
    const { pageData } = this.props;
    return `${pageData.dataKey || window.location.pathname}_${name}`;
  }

  async componentDidUpdate(preProps) {
    const { pageData: prevPageData } = preProps;
    const { pageData } = this.props;
    if (prevPageData.dataKey !== pageData.dataKey) {
      this.componentDidMount();
    }
  }

  async componentDidMount() {
    const { pageData, userData, store } = this.props;
    if (pageData.defaultColumns) {
      this.setState({
        selectedColumns: pageData.defaultColumns,
      });
    }
    this.filterFields = pageData.filterFields?.map((field) => {
      return {
        ...field,
        beforeRender: (field, val, row) => {
          return {
            ...(field.componentProps ? processParams({ ...userData, ...row }, field.componentProps, undefined, store) : {}),
          };
        },
      };
    });
    this.quickFilterFields = pageData.quickFilterFields?.map((field) => {
      return {
        ...field,
        beforeRender: (field, val, row) => {
          return {
            ...(field.componentProps ? processParams({ ...userData, ...row }, field.componentProps, undefined, store) : {}),
          };
        },
      };
    });
    this.topActions = pageData.topActions?.map((action) => {
      return {
        ...action,
        beforeRender: (col, val, row) => {
          if (action?.renderMatch) {
            const valid = new Validator(action?.renderMatch);
            valid.setValues(userData);
            return valid.validateAll();
          }
          return true;
        },
      };
    });
    this.pageFields = this.columns = pageData.columns.map((item) => {
      return {
        ...item,
        beforeRender: (col, val, row) => {
          return {
            component: {
              ...(item.componentProps ? processParams({ ...userData, ...row }, item.componentProps, undefined, store) : {}),
              fields: item.fields
                ? item.fields.map((field) => {
                    return {
                      ...field,
                      beforeRender: (col, val, row) => {
                        return field.componentProps
                          ? {
                              component: processParams({ ...userData, ...row }, field.componentProps, undefined, store),
                            }
                          : {};
                      },
                    };
                  })
                : undefined,
              actions: item.actions
                ? item.actions.map((action) => {
                    return {
                      ...action,
                      ...processParams({ ...userData, ...row }, action, undefined, store),
                      render: (row) => {
                        if (action.renderMatch) {
                          const vald = new Validator(action.renderMatch);
                          vald.setValues(row);
                          if (!vald.validateAll()) {
                            return false;
                          }
                        }
                        return true;
                      },
                    };
                  })
                : undefined,
            },
          };
        },
      };
    });
    await this.setState({
      currentSort: { ...(pageData.currentSort || {}), ...getCurrentSort() },
      currentFilter: getCurrentFilter(),
      currentQuickFilter: getCustomKeyData('quickFilter'),
    });
    this.refreshData();
  }
  async onFilterChange(data, field) {
    this.setState({ __currentFilter: data.value });
  }
  async onQuickFilterChange(data, field) {
    await this.setState({ currentQuickFilter: data.value });
    this.refreshData({ pageNo: 1 });
    setCustomKeyData('quickFilter', data.value);
  }

  async refreshData({ filter, sort, pageSize, pageNo } = {}) {
    const { pageData, data, userData, store, raiseAction } = this.props;

    if (pageData.apiConfig?.search) {
      this.setState({
        isLoading: true,
      });
      const pagination = userData[this.getKey('pagination')] || {};
      pageSize = pageSize || pagination.pageSize || pageData.defaultPageSize || defaultPageSize;
      pageNo = pageNo || pagination?.currentPage || 1;
      const sortBy = (sort || this.state.currentSort).sortColumn;
      const sortDir = (sort || this.state.currentSort).sortOrder;
      await raiseAction(
        postApi(
          {
            ...pageData.apiConfig?.search,
            params: {
              ...processParams(userData, pageData.apiConfig?.search.params, undefined, store),
              ...(filter || this.state.currentFilter),
              ...(this.state.currentQuickFilter || {}),
            },
            query: pageData.apiConfig?.search.query
              ? processParams({ ...userData, sortBy: `${sortBy}|${sortDir}`, pageSize: pageSize, pageNo: pageNo }, pageData.apiConfig?.search.query)
              : {
                  sortBy: `${sortBy}|${sortDir}`,
                  pageSize: pageSize,
                  pageNo: pageNo,
                },
            dataKey: this.getKey('results'),
          },
          data
        )
      );
      this.setState({
        isLoading: false,
      });
    }
  }

  async handlePageChange(data) {
    const pageNo = data.value.currentPage,
      pageSize = data.value.pageSize;
    await this.refreshData({ pageNo, pageSize });
  }
  async handleAction(data, action) {
    const { onAction } = this.props;
    switch (action.actionType) {
      case 'edit-cols':
        this.setState({
          showEditColumns: true,
        });
        break;
      case 'edit-filter':
        this.setState({
          showFilter: true,
        });
        break;
      default:
        if (action.actionType) {
          onAction && onAction(data, action);
        }
    }
  }

  async onGridAction(row, action, _) {
    switch (action.actionType) {
      default:
        this.props.onAction && await this.props.onAction(row, action);
        if (action.refreshAfter) {
          await this.refreshData({ });
        }
    }
  }
  async onFilterAction(data, action) {
    switch (action.actionType) {
      case 'resetFilter':
        await this.setState({
          showFilter: !this.state.showFilter,
          currentFilter: {},
        });
        await this.refreshData({ filter: {}, pageNo: 1 });
        setCurrentFilter({});
        break;
      case 'applyFilter':
        await this.setState({
          showFilter: !this.state.showFilter,
          currentFilter: this.state.__currentFilter,
          __currentFilter: {},
        });
        setCurrentFilter(this.state.currentFilter);
        await this.refreshData({});
        break;
    }
  }
  async handleOnSortChange(data) {
    await this.setState({ currentSort: data });
    const { currentPage } = this.props.userData[this.getKey('results')] || {};
    setCurrentSort(data);
    await this.refreshData({ pageNo: currentPage, sort: data });
  }

  onEditColumnChange(data) {
    this.setState({
      selectedColumns: data.value,
      showEditColumns: !this.state.showEditColumns,
    });
  }

  render() {
    const { metaData = {}, pageData = {}, userData, store, ...rest } = this.props;
    const { className = '' } = pageData;
    const { Actions, ButtonSelection, Dialog, Form, Grid, Skeleton } = getMap();
    return (
      <div className={`sq-generic-listing sq-v-screen sq-v-screen--fixed ${className}`}>
        <div className="sq-v-screen__container">
          <div className="sq-v-screen__sub-header">
            <Actions
              className="w-auto"
              disabled={this.state.isLoading}
              onAction={this.handleAction}
              actions={[
                ...(this.topActions || []),
                {
                  buttonText: 'Edit Columns',
                  iconName: 'edit',
                  variant: 'outlined',
                  cmpType: 'Button',
                  actionType: 'edit-cols',
                },
                {
                  actionType: 'edit-filter',
                  iconName: 'filter-list',
                  variant: 'outlined',
                  cmpType: 'Button',
                  buttonText: 'Filters',
                },
              ]}
            />
          </div>
          <div className={`sq-v-screen__container`}>
            <div className="container-fluid">
              <div className="sq-v-screen__pagination-bar d-flex fl-a-items-center justify-content-between mb-2">
                <div className={'sq-generic-listing__quick'}>
                  <Form disabled={this.state.isLoading} onChange={this.onQuickFilterChange} className="sq-form--inline-auto p-0" value={this.state.currentQuickFilter} fields={this.quickFilterFields} />
                </div>
              </div>
            </div>
            <div className="sq-generic-listing__grid-wrapper sq-v-screen-grow">
              <Grid
                paginationProps={{
                  onChange: this.handlePageChange,
                  count: userData[this.getKey('results')]?.totalPages,
                  value: userData[this.getKey('results')],
                  enablePageSize: true,
                  defaultPageSize: pageData.defaultPageSize || defaultPageSize,
                  pageSizeOptions: GLOBAL_OPTIONS.noOfResultsDropdown.toArray(),
                }}
                isLoading={this.state.isLoading}
                className="sq-basic-grid sq-grid--fixed"
                loader={<Skeleton styleName={`grid-tran`} rows={4} />}
                // onChange={this.handleGridChange}
                onColFilterChange={this.onEditColumnChange}
                selectedColumns={this.state.selectedColumns}
                showColSelection={this.state.showEditColumns}
                onAction={this.onGridAction}
                sortColumn={this.state.currentSort?.sortColumn}
                sortOrder={this.state.currentSort?.sortOrder}
                enableSort={true}
                onSort={this.handleOnSortChange}
                columns={this.columns}
                showHeader={true}
                data={userData[this.getKey('results')]?.data}
              />
            </div>
          </div>
        </div>
        <>
          <Dialog
            open={this.state.showFilter}
            transitionDir="left"
            classes={{
              dialog: {
                root: 'sq-dialog--fixed-right',
              },
            }}
            onClose={() => this.setState({ showFilter: false })}
            onAction={this.onFilterAction}
            actions={[
              {
                actionType: 'applyFilter',
                buttonText: 'Apply',
              },
              {
                actionType: 'resetFilter',
                buttonText: 'Reset',
                variant: 'outlined',
              },
            ]}
            title={'Filters'}
          >
            <Form onChange={this.onFilterChange} className="mt-wide" value={this.state.currentFilter} fields={this.filterFields} />
          </Dialog>
        </>
      </div>
    );
  }
}

GenericListing.propTypes = {};

export default GenericListing;
