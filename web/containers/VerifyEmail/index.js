import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';
import { query } from '../../utils/query-string';
import { translate } from '../../utils/translate';
import { CONSTANTS } from '../../globals';

@inject('commonStore', 'userStore')
@observer
class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const params = query.get();
    this.props.commonStore.startLoading();
    if (!params.token) {
      redirectTo('badrequest');
      return;
    }
    const resp = await this.props.userStore.verifyEmail(params.token);
    if (resp.status === CONSTANTS.STATUS.SUCCESS) {
      redirectTo('emailverified');
    } else {
      redirectTo('badrequest');
    }
  }

  render() {
    return (
      <div className="verify-email">
        <h2>{translate('Verifing Email')}</h2>
      </div>
    );
  }
}

Login.propTypes = {
  commonStore: PropTypes.object,
  userStore: PropTypes.object
};

export default Login;
