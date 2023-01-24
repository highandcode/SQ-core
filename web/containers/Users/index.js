import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Tabs,
  Form,
  Pagination,
  Link,
  Dialog,
  Actions,
} from '../../components/root';
import * as utils from '../../utils';
import { loadUsers } from '../../redux/user';
import accentColors from '../../utils/accent-colors';
import BaseContainer from '../BaseContainer';
import { GLOBAL_OPTIONS } from '../../globals';

import './_users.scss';

// const { Grid, Tabs, Form, Pagination, Link, Dialog, Actions } = root;
const { formatters } = utils.format;
const { translate } = utils.translate;

class Users extends BaseContainer {
  constructor() {
    super();
    this.state = {};
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onGridAction = this.onGridAction.bind(this);
  }

  async componentDidMount() {
    const params = utils.queryString.query.get();
    this.refreshUsers();
  }

  async refreshUsers({ pageNo, pageSize, sort, filter, source } = {}) {
    this.props.commonActions.startLoading();
    await this.props.raiseAction(loadUsers({}));
    this.props.commonActions.stopLoading();
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

  async onGridAction(row, value, column) {
    const { currentPage } = this.props.appStore.user?.usersPage;
    switch (value.action) {
      case 'edit':
        utils.redirect.redirectTo('editUser', {
          userId: row.emailId /* replace with data.uid */,
        });
        break;
      case 'activate':
        await this.props.userActions.reactivateUser(row);
        await this.refreshUsers({
          filter: { isActive: false, ...this.state.currentFilter },
          pageSize: 30,
        });
        break;
      case 'deactivate':
        await this.props.userActions.deactivateUser(row);
        await this.refreshUsers({
          filter: { isActive: true, ...this.state.currentFilter },
          pageSize: 30,
        });
        break;
      case 'reset-password':
        this.props.userActions.resetPassword(row);
        break;
    }
  }

  render() {
    const { store } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="sq-users sq-v-screen sq-v-screen--fixed">
        <div className="sq-v-screen__sub-header">
          <Actions
            actions={[
              {
                type: 'Button',
                iconName: 'add',
                size: 'small',
                to: 'addnewuser',
                buttonText: 'Add New',
              },
            ].filter((i) => i)}
          />
        </div>
        <div className="sq-v-screen__container">
          <div className="container-fluid mb-wide">
            {/* <h4 className="mt-3">{'Users'}</h4> */}
          </div>
          <div className={`sq-v-screen__body-container`}>
            <div className="sq-v-screen-grow">
              <div className="container-fluid">
                <Grid
                  className="sq-basic-grid sq-basic-grid--rounded sq-grid--fixed"
                  // loader={<Skeleton styleName={`grid-tran`} rows={8} />}
                  onAction={this.onGridAction}
                  columns={[
                    {
                      name: 'icon',
                      cmpType: 'Icon',
                      className: 'col-icon',
                      sort: false,
                      component: {
                        textIcon: (row) => row.firstName?.substr(0, 1),
                        iconClass: (row) => 'sq-icon--square',
                        variant: (row) => (row.active ? accentColors.getColorByChar(row.firstName?.substr(0, 1)) : 'default'),
                      },
                    },
                    {
                      name: 'firstName',
                      headerText: 'User',
                      className: 'sq-basic-grid--col-default',
                      render: (val, col, row) => `${row.firstName} ${row.lastName}`,
                      
                    },
                    {
                      name: 'email',
                      className: 'sq-basic-grid--col-title',
                      headerText: 'Email',
                      tooltip: {
                        title: (row) => row.email,
                        arrow: true,
                      },
                    },
                    {
                      name: 'roles',
                      className: 'sq-basic-grid--col-small',
                      headerText: 'Role',
                      render: (val, col, row) => `${val?.join(', ')}`,
                    },
                    {
                      name: 'loginDate',
                      className: 'sq-basic-grid--col-default',
                      headerText: 'Login Date',
                      render: (row) => {
                        return formatters.shortDate(
                          row,
                          GLOBAL_OPTIONS.defaultFormat
                        );
                      },
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
                            action: 'reset-password',
                            iconName: 'RestartAlt',
                            buttonText: translate('Reset Password'),
                          },
                          {
                            cmpType: 'LinkButton',
                            iconName: 'deactivate',
                            iconVariant: 'error',
                            action: 'deactivate',
                            buttonText: translate('Deactivate'),
                            render: (row) => {
                              return row.active;
                            },
                          },
                          {
                            cmpType: 'LinkButton',
                            iconName: 'active',
                            iconVariant: 'success',
                            action: 'activate',
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
                  data={store.user?.users}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  raiseAction: PropTypes.func,
  store: PropTypes.object,
  commonActions: PropTypes.object,
  appActions: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

export { Users };

export default Users;
