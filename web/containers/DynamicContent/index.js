import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer } from '../../utils/timer';
import Progress from '../../components/Progress';
import Snackbar from '../../components/Snackbar';
import DefaultContent from '../Content';
import Default from './Default';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import { events } from '../../utils/app-events';
import { fetchContentPage, postApi, downloadApi, executeHook, updateUserData, updateMetaData, mergeUserData, updateErrorData, resetUserData, customHooks, sendContact, processParams } from '../../redux/content';

import { startLoading, showNotificationMessage, closeNotification, stopLoading, showPopupScreen, showPopup, setError, clearError } from '../../redux/common';


const _window = window;
let containers = {
  Default,
  // ...Containers,
};

const registerContainers = (newContainers) => {
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
    this.onChange = this.onChange.bind(this);
    this.onAction = this.onAction.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  async componentDidMount() {
    const { location = {}, url: overrideUrl, pageConfig } = this.props;
    this.setState(
      {
        url: overrideUrl || location.pathname,
      },
      () => {
        this.fetchPage(true, pageConfig);
      }
    );
    events.subscribe('refreshPage', this.onRefresh);
  }

  async componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll);
    window.removeEventListener('resize', this.handlePageScroll);
    events.unsubscribe('refreshPage', this.onRefresh);
  }

  async onRefresh() {
    const { refresh } = this.props.pageData || {};
    let isValid = true;
    if (refresh) {
      if (refresh.match) {
        const validations = new Validator({
          ...refresh.match,
        });
        validations.setValues({ ...this.getUpdatedUserData() });
        isValid = validations.validateAll();
      }
    }
    if (isValid) {
      this.refreshPage(refresh?.forceLoad);
    }
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

  postApi(data) {
    return this.props.contentActions.postApi(data);
  }

  async refreshPage(forceLoad) {
    if (forceLoad) {
      this.fetchPage();
    } else {
      this.fetchPage(undefined, this.state.pageData);
    }
  }

  async fetchPage(firstTime, dataForPage) {
    const { onAnalytics, transitionSpeed = 300, initialData } = this.props;
    if (initialData) {
      await this.props.contentActions.updateUserData(initialData);
    }
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
    let resp;
    let pageResponse;
    if (!dataForPage) {
      resp = await this.props.contentActions.fetchContentPage(this.state.url).unwrap();
      pageResponse = resp.data;
    } else {
      pageResponse = dataForPage;
    }
    if (pageResponse.pageData.reset) {
      await this.props.contentActions.resetUserData(pageResponse.pageData.reset);
    }
    await this.props.contentActions.updateMetaData({
      url: this.state.url,
      data: {
        metaData: pageResponse.metaData,
        siteMap: pageResponse.siteMap,
      },
    });
    await this.props.contentActions.updateUserData(pageResponse.metaData?.userData);
    await this.props.contentActions.mergeUserData(pageResponse.pageData.merge);
    await this.processHook(pageResponse.pageData.hook?.load);
    await this.props.contentActions.mergeUserData(pageResponse.pageData.init);
    await this.props.contentActions.mergeUserData(pageResponse.pageData.merge);
    window.clearTimeout(interval);
    const { analytics = {} } = pageResponse.pageData;
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

  getValidationResult(field, block, value) {
    if (field?.validators) {
      const allValidators = {};
      block.fields?.forEach((field) => {
        if (field.validators) {
          allValidators[field.name] = {
            validators: field.validators,
            impactOn: field.impactOn,
          };
        }
      });
      const validations = new Validator({
        ...allValidators,
        [field.name]: {
          validators: field.validators,
          impactOn: field.impactOn,
        },
      });
      validations.setValues({ ...this.getUpdatedUserData(), ...value });
      validations.validate(field.name);

      return validations;
    }
  }

  onChange(value, field, block) {
    const { onContentChange, contentParams } = this.props;
    let obj = {};
    block = field?.block ? field.block : block;
    if (block && block.name) {
      obj[block.name] = value.value;
    } else {
      obj = value.value;
    }
    let nestErrors;
    let currentError;
    let currentValue;
    let currentForm;
    let lastError;
    let existingErrors = this.props.store.content.userData[block.name + '_errors'] || {};
    if (value.formTrace?.length > 0) {
      currentValue = value.value;
      if (value.orignField?.validators) {
        nestErrors = {};
        currentError = nestErrors;
        value.formTrace.forEach((tForm) => {
          currentValue = currentValue[tForm.name];
          existingErrors = existingErrors[tForm.name] || {};
          lastError = currentError;
          currentError[tForm.name] = {
            errors: {
              ...existingErrors.errors,
            },
          };
          currentError = currentError[tForm.name].errors;
          currentForm = tForm;
        });

        let validations = this.getValidationResult(value.orignField, currentForm, currentValue);
        if (validations) {
          lastError[currentForm.name].errors = { ...lastError[currentForm.name].errors, ...validations.errors };
        }
      }
    }
    let validations = this.getValidationResult(field, block, value.value);
    if (validations || nestErrors) {
      this.props.contentActions.updateUserData({
        [block.name + '_errors']: {
          ...this.props.store.content.userData[block.name + '_errors'],
          ...validations?.errors,
          ...nestErrors,
        },
      });
    }

    this.props.contentActions.updateUserData(obj);
    this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
    onContentChange && onContentChange(processParams(this.props.store.content.userData, contentParams))
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

  validateForms(forms = [], group) {
    let isValid = true;
    forms.forEach((form) => {
      if (this.hasMatchingGroup(form, group) && !this.validateForm(form)) {
        isValid = false;
      }
    });
    return isValid;
  }

  getValidateFormFull(block, value = {}) {
    let fullValid = true;
    let allErros = {};
    let validators = {};
    block.fields?.forEach((item) => {
      let hasMatch = true;
      if (item.match) {
        const valid = new Validator(item.match);
        valid.setValues({
          ...this.getUpdatedUserData(),
          ...value[block.name],
        });
        hasMatch = valid.validateAll();
      }
      if (hasMatch && item.validators) {
        validators[item.name] = {
          validators: item.validators,
        };
      }
      if (item.cmpType === 'Form') {
        const { isValid: inernvalValid, errors: newErrors } = this.getValidateFormFull(item, value[item.name]);
        if (!inernvalValid) {
          fullValid = inernvalValid;
          allErros[item.name] = { errors: newErrors };
        }
      }
    });
    const validObj = new Validator(validators);
    validObj.setValues({
      ...this.getUpdatedUserData(),
      ...value[block.name],
    });
    const isValid = validObj.validateAll() && fullValid;
    return { isValid, errors: { ...validObj.errors, ...allErros } };
  }

  validateForm(block) {
    const { isValid, errors } = this.getValidateFormFull(block, this.getUpdatedUserData());
    this.props.contentActions.updateUserData({
      [block.name + '_errors']: {
        ...this.props.store.content.userData[block.name + '_errors'],
        ...errors,
      },
    });
    return isValid;
  }

  async onAction(value, action, block) {
    const { onSubmit } = this.props;
    let result;
    let isValid = true;
    switch (action.actionType) {
      case 'download-doc':
        await this.props.contentActions.updateUserData({
          isSubmitting: true,
        });
        result = await this.props.contentActions.downloadApi(action);
        await this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
        await this.props.contentActions.updateUserData({
          isSubmitting: false,
        });
        if (result.status === 'success') {
          const data = action.dataKey ? { [action.dataKey]: result.data } : result.data;
          await this.props.contentActions.updateUserData({
            ...data,
            lastError: {},
          });
        }
        this.checkForInlineErrors(result, action);
        this.validateResults(result);
        break;
      case 'api':
        await this.props.contentActions.updateUserData({
          isSubmitting: true,
        });
        result = await this.props.contentActions.postApi(action);
        await this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
        await this.props.contentActions.updateUserData({
          isSubmitting: false,
        });
        if (result.status === 'success') {
          const data = action.dataKey ? { [action.dataKey]: result.data } : result.data;
          await this.props.contentActions.updateUserData({
            ...data,
            lastError: {},
          });
        }
        this.checkForInlineErrors(result, action);
        this.validateResults(result);
        break;
      case 'module':
        if (action.validate) {
          isValid = this.validateForms(block.forms, action.validateGroup);
        }
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          result = await this.props.contentActions.executeHook(action);
          await this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
          await this.props.contentActions.updateUserData({
            isSubmitting: false,
          });
          if (result.status === 'success') {
            const data = action.dataKey ? { [action.dataKey]: result.data } : result.data;
            await this.props.contentActions.updateUserData({
              ...data,
              lastError: {},
            });
          }
          this.checkForInlineErrors(result, action);
          this.validateResults(result);
        }
        break;
      case 'submit-form':
        isValid = this.validateForm(block);
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          result = await this.props.contentActions.postApi(action);
          await this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
          await this.props.contentActions.updateUserData({
            isSubmitting: false,
          });
          this.checkForInlineErrors(result, action);
          this.validateResults(result);
        }
        break;
      case 'submit':
        isValid = this.validateForms(block.forms, action.validateGroup);
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          result = await this.props.contentActions.postApi(action);
          await this.props.contentActions.mergeUserData(this.state.pageData.pageData.merge);
          await this.props.contentActions.updateUserData({
            isSubmitting: false,
          });
          this.checkForInlineErrors(result, action);
          this.validateResults(result);
        }
        break;
      case 'submit-event':
        isValid = this.validateForms(block.forms, action.validateGroup);
        if (isValid) {
          await this.props.contentActions.updateUserData({
            isSubmitting: true,
          });
          onSubmit && onSubmit(processParams(this.props.store.content.userData, action.params));
        }
        break;
      case 'user-store':
        await this.props.contentActions.mergeUserData({
          ...processParams(this.props.store.content.userData, action.params),
        });
        break;
      case 'notify-message':
        await this.props.commonActions.showNotificationMessage({
          ...processParams(this.props.store.content.userData, action.params),
        });
        break;
      case 'popup':
        await this.props.commonActions.showPopup({
          ...processParams(this.props.store.content.userData, action.params),
        });
        break;
      case 'popup-screen':
        await this.props.commonActions.showPopupScreen({
          ...processParams(this.props.store.content.userData, action.params),
        });
        break;
      case 'redirect':
        redirectTo(action.to, processParams(this.props.store.content.userData, action.params), action.options);
        break;
    }
  }

  checkForInlineErrors(result, action) {
    if (action.rootErrorKey && result.error?.errors) {
      result.error.errors = {
        [action.rootErrorKey]: {
          errors: result.error?.errors,
        },
      };
    }
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
    if (result && typeof result.data?.redirect === 'string') {
      redirectTo(result.data?.redirect);
    } else if (result && result.data?.redirect?.to) {
      redirectTo(result.data?.redirect.to, processParams(this.props.store.content.userData, result.data?.redirect.urlParams));
    }
    if (result && typeof result.error?.redirect === 'string') {
      redirectTo(result.error?.redirect);
    } else if (result && result.error?.redirect?.to) {
      redirectTo(result.error?.redirect.to, processParams(this.props.store.content.userData, result.error?.redirect.urlParams));
    }
  }

  render() {
    const { containerTemplate: overrideContainerTemplate, rootClass = 'row', ...allProps } = this.props;
    const { dataPacket, store } = allProps;
    const userData = {
      ...this.props.store.content.userData,
      ...dataPacket,
      contentPage: true,
    };
    const { pageData = {}, metaData } = this.state.pageData;
    const dynamicParams = processParams(userData, pageData.inject || {});
    const { classes = {}, ...restDynamic } = dynamicParams;
    const updatedPageData = { ...pageData, ...restDynamic };
    const { container, containerTemplate, contentBodyClass = '', rootClassName = '', transition = {} } = updatedPageData;
    const ContentTemplateContainer = containers[overrideContainerTemplate || containerTemplate] || containers.Default;
    const ContentContainer = containers[container] || DefaultContent;
    const { out: tranOut = 'out-up', in: tranIn = 'out-in', loading = 'loading' } = transition;
    const classState = this.state.isOut ? `transition transition-page--${tranOut}` : this.state.isIn ? `transition transition-page--${tranIn}` : '';
    const loadingState = this.state.isLoading ? `transition transition-page--${loading}` : '';

    return (
      <div className={`dynamic-content ${rootClass} ${rootClassName} ${loadingState} ${classes.root || ''}`}>
        <Snackbar
          open={store.common.notification.show}
          message={store.common.notification.message}
          autoHideDuration={null}
          onClose={(evt, reason) => {
            if (reason !== 'clickaway') {
              this.props.commonActions.closeNotification();
              return;
            }
          }}
          severity={store.common.notification.type}
        />
        <ContentTemplateContainer {...allProps} pageData={updatedPageData} metaData={metaData} data={this.state.pageData} pageState={this.state.page} userData={userData}>
          <div className={`${contentBodyClass} dynamic-content__body ${classState} ${classes.body || ''}`}>
            <ContentContainer {...allProps} pageData={updatedPageData} metaData={metaData} data={this.state.pageData} userData={userData} pageState={this.state.page} onChange={this.onChange} onAction={this.onAction} />
          </div>
        </ContentTemplateContainer>
        {this.state.isLoading && <Progress className={`${classes.progress || ''}`} style={'fixed'} overlayStyle="full" />}
      </div>
    );
  }
}

DynamicContent.propTypes = {
  contentActions: PropTypes.object,
  commonActions: PropTypes.object,
  raiseAction: PropTypes.func,
};

export { DynamicContent, customHooks, registerContainers };

const mapStateToProps = (state) => {
  return {
    store: {
      ...state,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    contentActions: {
      postApi: (data) => dispatch(postApi(data)),
      downloadApi: (data) => dispatch(downloadApi(data)),
      updateMetaData: (data) => dispatch(updateMetaData(data)),
      executeHook: (data) => dispatch(executeHook(data)),
      fetchContentPage: (data) => dispatch(fetchContentPage(data)),
      resetUserData: (data) => dispatch(resetUserData(data)),
      updateUserData: (data) => dispatch(updateUserData(data)),
      mergeUserData: (data) => dispatch(mergeUserData(data)),
      sendContact: (data) => dispatch(sendContact(data)),
      updateErrorData: (data) => dispatch(updateErrorData(data)),
    },
    commonActions: {
      showNotificationMessage: (data) => dispatch(showNotificationMessage(data)),
      closeNotification: (data) => dispatch(closeNotification(data)),
      startLoading: (data) => dispatch(startLoading(data)),
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
