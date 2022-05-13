import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer } from '../../utils/timer';
import Progress from '../../components/Progress';
import Snackbar from '../../components/Snackbar';
import DefaultContent from '../Content';
import Default from './Default';
import LayoutContent from '../LayoutContent';
import Documentation from '../Documentation';
import ContentWithLeftNavigation from '../ContentWithLeftNavigation';
import TocIndex from '../TocIndex';
import ComponentDemo from '../ComponentDemo';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import {
  fetchContentPage,
  postApi,
  updateUserData,
  mergeUserData,
  updateErrorData,
  resetUserData,
  customHooks,
  sendContact,
} from '../../redux/content';

import {
  startLoading,
  showNotificationMessage,
  closeNotification,
  stopLoading,
  showPopupScreen,
  showPopup,
  setError,
  clearError,
} from '../../redux/common';

import './_dynamic-content.scss';

const _window = window;

let containers = {
  Default,
  LayoutContent,
  Documentation,
  ContentWithLeftNavigation,
  TocIndex,
  ComponentDemo,
};

export const registerContainers = (newContainers) => {
  containers = {
    ...containers,
    ...newContainers,
  };
};

class DynamicContent extends Component {
  constructor() {
    super();
    this.state = {
      pageData: {},
      page: {
        pageYOffset: _window.pageYOffset,
        innerHeight: _window.innerHeight,
      },
    };
    this.handlePageScroll = this.handlePageScroll.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  handlePageScroll(e) {
    if (this.scrollExecuting) {
      return;
    }
    this.scrollExecuting = _window.setTimeout(() => {
      this.setState(
        {
          page: {
            ...this.state.page,
            pageYOffset: _window.pageYOffset,
            innerHeight: _window.innerHeight,
          },
        },
        () => {
          this.scrollExecuting = null;
        }
      );
    }, 300);
  }

  async componentDidMount() {
    const { location = {}, url: overrideUrl } = this.props;
    this.setState(
      {
        url: overrideUrl || location.pathname,
      },
      () => {
        this.fetchPage(true);
      }
    );
    window.addEventListener('scroll', this.handlePageScroll);
    window.addEventListener('resize', this.handlePageScroll);
  }

  async processHook(hook) {
    const arr = [];
    if (hook) {
      if (Array.isArray(hook)) {
        hook.forEach((item) => {
          arr.push(this.postApi(item));
        });
      } else {
        arr.push(this.postApi(hook));
      }
    }
    return Promise.all(arr);
  }

  checkAndPostApi(data) {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.postApi(item);
      });
    } else {
      this.postApi(data);
    }
  }

  postApi(data) {
    return this.props.contentActions.postApi(data);
  }

  async fetchPage(firstTime) {
    const { onAnalytics, transitionSpeed = 300 } = this.props;
    if (!firstTime) {
      this.setState({
        isOut: true,
      });
      await timer.delay(transitionSpeed);
    }
    const interval = window.setTimeout(() => {
      this.setState({
        isLoading: true,
      });
    }, 300);
    const resp = await this.props.contentActions
      .fetchContentPage(this.state.url)
      .unwrap();
    const pageResponse = resp.data;
    if (pageResponse.pageData.reset) {
      await this.props.contentActions.resetUserData(pageResponse.pageData.reset);
    }
    await this.props.contentActions.updateUserData(
      pageResponse.metaData?.userData
    );
    await this.props.contentActions.updateUserData(pageResponse.pageData.init);
    await this.props.contentActions.mergeUserData(pageResponse.pageData.merge);
    await this.processHook(pageResponse.pageData.hook?.load);
    await this.props.contentActions.mergeUserData(pageResponse.pageData.merge);
    window.clearTimeout(interval);
    const { analytics = {} } = pageResponse;
    this.setState({
      isLoading: false,
      pageData: pageResponse,
    });
    onAnalytics &&
      onAnalytics({
        type: 'pageview',
        page_title: pageResponse.pageData.title,
        ...analytics.load,
      });
    this.setState({
      isOut: false,
      isIn: true,
    });
    await timer.delay(transitionSpeed);
    this.setState({
      isOut: false,
      isIn: false,
    });
    await this.processHook(pageResponse.pageData.hook?.afterLoad);
  }

  async componentDidUpdate() {
    const { location = {}, url: overrideUrl } = this.props;
    if (this.state.url != (overrideUrl || location.pathname)) {
      this.setState(
        {
          url: overrideUrl || location.pathname,
        },
        () => {
          this.fetchPage();
        }
      );
    }
  }

  getUpdatedUserData() {
    const { userData } = this.props.store.content;
    return {
      ...userData,
    };
  }

  onChange(value, field, block) {
    let obj = {};
    block = field.block ? field.block : block;
    if (block && block.name) {
      obj[block.name] = value.value;
    } else {
      obj = value.value;
    }
    if (field.validators) {
      const validations = new Validator({
        [field.name]: {
          validators: field.validators,
        },
      });
      validations.setValues({ ...this.getUpdatedUserData(), ...value.value });
      validations.validate(field.name);
      let errors;

      this.props.contentActions.updateUserData({
        [block.name + '_errors']: {
          ...this.props.store.content.userData[block.name + '_errors'],
          ...validations.errors,
        },
      });
    }

    this.props.contentActions.updateUserData(obj);
    this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
  }

  hasMatchingGroup(form, group) {
    if (!group) {
      return true;
    }
    if (typeof form.group === 'string') {
      return form.group === group;
    } else if (Array.isArray(form.group)) {
      return form.group.indexOf(group) > -1;
    }
    return false;
  }

  validateForms(forms, group) {
    let isValid = true;
    forms.forEach((form) => {
      if (this.hasMatchingGroup(form, group) && !this.validateForm(form)) {
        isValid = false;
      }
    });
    return isValid;
  }

  validateForm(block) {
    let validators = {};
    block.fields?.forEach((item) => {
      let hasMatch = true;
      if (item.match) {
        const valid = new Validator(item.match);
        valid.setValues({
          ...this.getUpdatedUserData(),
          ...this.getUpdatedUserData()[block.name],
        });
        hasMatch = valid.validateAll();
      }
      if (hasMatch && item.validators) {
        validators[item.name] = {
          validators: item.validators,
        };
      }
    });
    const validObj = new Validator(validators);
    validObj.setValues(this.getUpdatedUserData()[block.name]);
    const isValid = validObj.validateAll();
    this.props.contentActions.updateUserData({
      [block.name + '_errors']: {
        ...this.props.store.content.userData[block.name + '_errors'],
        ...validObj.errors,
      },
    });
    return isValid;
  }

  async onAction(value, action, block) {
    let isValid;
    switch (action.actionType) {
      case 'api':
        await this.props.contentActions.updateUserData({
          isSubmitting: true,
        });
        const result = await this.props.contentActions.postApi(action);
        await this.props.contentActions.mergeUserData(
          this.state.pageData.pageData.merge
        );
        await this.props.contentActions.updateUserData({
          isSubmitting: false,
        });
        this.checkForInlineErrors(result);
        this.validateResults(result);
        break;
      case 'submit-form':
        isValid = this.validateForm(block);
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          const result = await this.props.contentActions.postApi(action);
          await this.props.contentActions.mergeUserData(
            this.state.pageData.pageData.merge
          );
          await this.props.contentActions.updateUserData({
            isSubmitting: false,
          });
          this.checkForInlineErrors(result);
          this.validateResults(result);
        }
        break;
      case 'submit':
        isValid = this.validateForms(block.forms, action.validateGroup);
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          const result = await this.props.contentActions.postApi(action);
          await this.props.contentActions.mergeUserData(
            this.state.pageData.pageData.merge
          );
          await this.props.contentActions.updateUserData({
            isSubmitting: false,
          });
          this.checkForInlineErrors(result);
          this.validateResults(result);
        }
      case 'user-store':
        await this.props.contentActions.mergeUserData({
          ...action.params,
        });
        break;
      case 'notify-message':
        await this.props.commonActions.showNotificationMessage({
          ...action.params,
        });
        break;
      case 'popup':
        await this.props.commonActions.showPopup({
          ...action.params,
        });
        break;
      case 'popup-screen':
        await this.props.commonActions.showPopupScreen({
          ...action.params,
        });
        break;
    }
  }

  checkForInlineErrors(result) {
    if (result.error?.errors) {
      Object.keys(result.error.errors).forEach((errorKey) => {
        if (result.error.errors[errorKey].errors) {
          this.props.contentActions.updateUserData({
            [`${errorKey}_errors`]: result.error.errors[errorKey].errors,
          });
        } else if (result.error.errors[errorKey].error) {
          this.props.contentActions.updateUserData({
            [`${errorKey}_errors`]: result.error.errors[errorKey],
          });
        }
      });
    }
  }

  validateResults(result) {
    if (result && result.data?.redirect) {
      redirectTo(result.data?.redirect);
    }
    if (result && result.error?.redirect) {
      redirectTo(result.error?.redirect);
    }
  }

  render() {
    const { containerTemplate: overrideContainerTemplate, ...allProps } =
      this.props;
    const { dataPacket, store } = allProps;
    const { pageData = {}, metaData } = this.state.pageData;
    const {
      container,
      containerTemplate,
      contentBodyClass = '',
      rootClassName = '',
      transition = {},
    } = pageData;
    const ContentContainer =
      containers[overrideContainerTemplate || containerTemplate] ||
      containers.Default;
    const ContentTemplContainer = containers[container] || DefaultContent;
    const {
      out: tranOut = 'out-up',
      in: tranIn = 'out-in',
      loading = 'loading',
    } = transition;
    const classState = this.state.isOut
      ? `transition transition-page--${tranOut}`
      : this.state.isIn
      ? `transition transition-page--${tranIn}`
      : '';
    const loadingState = this.state.isLoading
      ? `transition transition-page--${loading}`
      : '';
    const userData = {
      ...this.props.store.content.userData,
      ...dataPacket,
      contentPage: true,
    };
    return (
      <div className={`dynamic-content row ${rootClassName} ${loadingState}`}>
        <Snackbar
          open={store.common.notification.show}
          message={store.common.notification.message}
          autoHideDuration={null}
          onClose={(evt, reason) => {
            if (reason !== 'clickaway') {
              this.props.commonActions.closeNotification()
              return;
            }
          }}    
          severity={store.common.notification.type}
        />
        <ContentContainer
          {...allProps}
          pageData={pageData}
          metaData={metaData}
          data={this.state.pageData}
          pageState={this.state.page}
          userData={userData}
        >
          <div
            className={`${contentBodyClass} dynamic-content__body ${classState}`}
          >
            <ContentTemplContainer
              {...allProps}
              pageData={pageData}
              metaData={metaData}
              data={this.state.pageData}
              userData={userData}
              pageState={this.state.page}
              onChange={this.onChange}
              onAction={this.onAction}
            />
          </div>
        </ContentContainer>
        {this.state.isLoading && (
          <Progress style={'fixed'} overlayStyle="full" />
        )}
      </div>
    );
  }
}

DynamicContent.propTypes = {
  commonStore: PropTypes.object,
  contentActions: PropTypes.object,
};

export { DynamicContent, customHooks };

const mapStateToProps = (state) => {
  return {
    store: {
      common: state.common,
      content: state.content,
      auth: state.auth,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    contentActions: {
      postApi: (data) => dispatch(postApi(data)),
      fetchContentPage: (data) => dispatch(fetchContentPage(data)),
      resetUserData: (data) => dispatch(resetUserData(data)),
      updateUserData: (data) => dispatch(updateUserData(data)),
      mergeUserData: (data) => dispatch(mergeUserData(data)),
      sendContact: (data) => dispatch(sendContact(data)),
      updateErrorData: (data) => dispatch(updateErrorData(data)),
    },
    commonActions: {
      showNotificationMessage: (data) =>
        dispatch(showNotificationMessage(data)),
      closeNotification: (data) => dispatch(closeNotification(data)),
      startLoading: (data) => dispatch(startLoading(data)),
      closePopup: (data) => dispatch(closePopup(data)),
      showPopup: (data) => dispatch(showPopup(data)),
      stopLoading: (data) => dispatch(stopLoading(data)),
      setError: (data) => dispatch(setError(data)),
      clearError: (data) => dispatch(clearError(data)),
      showPopupScreen: (data) => dispatch(showPopupScreen(data)),
    },
    raiseAction: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicContent);
