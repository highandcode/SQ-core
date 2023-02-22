import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Form from '../../components/Form';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';
import Switch from '../../components/ui/Switch';
import { ComponentList } from './ComponentList';
import Panel from './Panel';
import { withEditTabsConfig } from './edits/Common';
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
import { getFieldsMeta, getPage, savePageDraft } from '../../redux/admin';
import ContentEditor from './ContentEditor';
import { getSupportedComps, addComponent } from './supported-comps';
import DynamicContent from '../DynamicContent';
import * as utils from '../../utils';
import ErrorBoundry from '../../components/ErrorBoundry';
import { GLOBAL_OPTIONS } from '../../globals';

import {
  fetchContentPage,
  postApi,
  downloadApi,
  executeHook,
  updateUserData,
  updateMetaData,
  mergeUserData,
  updateErrorData,
  resetUserData,
  customHooks,
  sendContact,
  processParams,
} from '../../redux/content';

const config = {
  templates: [
    {
      text: 'apps/core/templates/page',
      value: 'apps/core/templates/page',
    },
  ],
  layouts: [
    {
      text: 'apps/core/layouts/spa',
      value: 'apps/core/layouts/spa',
    },
  ],
  containers: [
    {
      text: 'Default',
      value: 'Default',
    },
  ],
  themes: [
    {
      text: 'Main',
      value: 'main',
    },
  ],
};

export const getConfig = () => config;

export const updateConfig = ({ templates, layouts, containers, themes }) => {
  if (templates) {
    config.templates = templates;
  }
  if (layouts) {
    config.layouts = layouts;
  }
  if (containers) {
    config.containers = containers;
  }
  if (themes) {
    config.themes = themes;
  }
};

class PageBuilder extends Component {
  constructor() {
    super();
    this.state = {
      enableMenu: true,
      autoSave: true,
      enableProps: false,
      contentData: {
        pageData: {
          updatePageTitle: false,
          items: [],
        },
      },
    };
    this.componentOnDrop = this.componentOnDrop.bind(this);
    this.toggleProps = this.toggleProps.bind(this);
    this.toggleElements = this.toggleElements.bind(this);
    this.toggleQuickPreview = this.toggleQuickPreview.bind(this);
    this.toggleAutoSave = this.toggleAutoSave.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentDelete = this.onContentDelete.bind(this);
    this.savePageAsDraft = this.savePageAsDraft.bind(this);
    this.formOnChange = this.formOnChange.bind(this);
    this.onMoveItemDown = this.onMoveItemDown.bind(this);
    this.onMoveItemUp = this.onMoveItemUp.bind(this);
  }

  async componentDidMount() {
    const { pageData, store } = this.props;
    this.props.commonActions.startLoading();
    await this.props.raiseAction(
      getPage(
        {
          path: utils.queryString.query.get().path,
        },
        pageData.getPageConfig
      )
    );
    await this.props.raiseAction(getFieldsMeta({}, pageData.fieldsMetaConfig));
    this.setState({
      contentData: this.props.store.admin.contentData,
    });
    this.props.commonActions.stopLoading();
  }
  async savePageAsDraft(autoSave) {
    const { pageData, store } = this.props;
    !autoSave && this.props.commonActions.startLoading();
    await this.props.raiseAction(
      savePageDraft(this.state.contentData, {
        autoSave: autoSave === true,
        ...pageData.savePageConfig,
      })
    );
    !autoSave && this.props.commonActions.stopLoading();
  }
  componentOnDrop(item) {
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: {
          ...this.state.contentData.pageData,
          items: [
            ...(this.state.contentData.pageData.items || []),
            {
              component: item.name,
              name:
                item.name.toLowerCase() +
                (this.state.contentData.pageData.items?.length || 1),
              ...item.metaData.sampleData,
            },
          ],
        },
      },
    });
    this.checkAutoSave();
  }
  toggleProps() {
    this.setState({ enableProps: !this.state.enableProps });
  }
  toggleElements() {
    this.setState({ enableMenu: !this.state.enableMenu });
  }

  formOnChange(data) {
    const finalData = {
      pageData: {
        ...this.state.contentData.pageData,
        ...data.value,
      },
    };
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: finalData.pageData,
      },
    });
    this.checkAutoSave();
  }
  onContentChange(data, idx) {
    const finalData = {
      pageData: {
        ...this.state.contentData.pageData,
        items: [...this.state.contentData.pageData.items],
      },
    };
    finalData.pageData.items[idx] = {
      ...finalData.pageData.items[idx],
      ...data,
    };
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: finalData.pageData,
      },
    });
    this.checkAutoSave();
  }

  onContentDelete(idx) {
    const finalData = {
      pageData: {
        ...this.state.contentData.pageData,
        items: [...this.state.contentData.pageData.items],
      },
    };
    finalData.pageData.items.splice(idx, 1);
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: finalData.pageData,
      },
    });
    this.checkAutoSave();
  }

  toggleQuickPreview() {
    this.setState({
      preview: !this.state.preview,
    });
  }
  toggleAutoSave() {
    this.setState({
      autoSave: !this.state.autoSave,
    });
  }
  showPreview() {
    utils.redirect.redirectTo(
      utils.queryString.query.get().path,
      { mode: 'preview' },
      { target: '_blank' }
    );
  }

  onMoveItemDown(index) {
    const finalData = {
      pageData: {
        ...this.state.contentData.pageData,
        items: [...this.state.contentData.pageData.items],
      },
    };
    finalData.pageData.items = update(finalData.pageData.items, {
      $splice: [
        [index, 1],
        [index + 1, 0, finalData.pageData.items[index]],
      ],
    });
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: finalData.pageData,
      },
    });
    this.checkAutoSave();
  }

  checkAutoSave() {
    setTimeout(() => {
      this.state.autoSave && this.savePageAsDraft(true);
    }, 200);
  }

  onMoveItemUp(index) {
    const finalData = {
      pageData: {
        ...this.state.contentData.pageData,
        items: [...this.state.contentData.pageData.items],
      },
    };
    finalData.pageData.items = update(finalData.pageData.items, {
      $splice: [
        [index, 1],
        [index - 1, 0, finalData.pageData.items[index]],
      ],
    });
    this.setState({
      contentData: {
        ...this.state.contentData,
        pageData: finalData.pageData,
      },
    });
    this.checkAutoSave();
  }

  getLiveFields(items = []) {
    let arryData = [];

    items.forEach((item) => {
      if (item.component === 'Form') {
        arryData.push({
          text: `.${item.name}`,
          value: `.${item.name}`,
        });
        item.fields?.forEach((field) => {
          arryData.push({
            text: `.${item.name}.${field.name}`,
            value: `.${item.name}.${field.name}`,
          });
        });
      }
      if (item.items) {
        arryData = arryData.concat(this.getLiveFields(item.items));
      }
    });
    return arryData;
  }

  getDrivedProps() {
    return {
      liveFields: this.getLiveFields(this.state.contentData?.pageData?.items),
    };
  }

  render() {
    const { className = '', pageData, store } = this.props;
    const compList = getSupportedComps();
    return (
      <div
        className={`sq-page-builder sq-v-screen sq-v-screen--fixed ${className}`}
      >
        <div className="sq-v-screen__container">
          <div className="sq-page-builder__top-actions mb-wide">
            <Switch
              label="Autosave"
              value={this.state.autoSave}
              onChange={this.toggleAutoSave}
            />
            <Switch
              label="Quick Preview"
              value={this.state.preview}
              onChange={this.toggleQuickPreview}
            />
            <Button
              iconName={'Save'}
              variant="outlined"
              buttonText="Save"
              onClick={() => this.savePageAsDraft()}
            />
            <Button
              iconName={'Preview'}
              variant="outlined"
              buttonText="Full Preview"
              onClick={this.showPreview}
            />
            {/* <Button iconName={'Publish'} buttonText="Publish" /> */}
          </div>
          <div className="sq-page-builder__content sq-v-screen-grow">
            <DndProvider backend={HTML5Backend}>
              <div className="sq-page-builder__l-options">
                <IconButton
                  title="Elements"
                  iconName="code"
                  variant={!this.state.enableMenu ? 'default' : 'primary'}
                  onClick={this.toggleElements}
                />
                <IconButton
                  title="Page Properties"
                  iconName="default"
                  variant={!this.state.enableProps ? 'default' : 'primary'}
                  onClick={this.toggleProps}
                />
              </div>
              {/* <div className="sq-page-builder__r-options">
              </div> */}

              <div className="sq-page-builder__container">
                <div className="sq-page-builder__left">
                  {this.state.enableMenu && (
                    <Panel
                      header="Elements"
                      theme="dark"
                      onClose={this.toggleElements}
                    >
                      <div className="row">
                        <ComponentList compList={compList} filter={pageData.compListFilter} />
                      </div>
                    </Panel>
                  )}
                </div>
                <div className="sq-page-builder__center">
                  {this.state.preview && (
                    <ErrorBoundry>
                      <DynamicContent pageConfig={this.state.contentData} />
                    </ErrorBoundry>
                  )}
                  {!this.state.preview && (
                    <>
                      <ContentEditor
                        fieldsMeta={{
                          ...this.getDrivedProps(),
                          ...store.admin.fieldsMeta,
                        }}
                        pageData={this.state.contentData.pageData}
                        compList={compList}
                        onDelete={this.onContentDelete}
                        onChange={this.onContentChange}
                        onMoveItemUp={this.onMoveItemUp}
                        onMoveItemDown={this.onMoveItemDown}
                        onDrop={this.componentOnDrop}
                      />
                    </>
                  )}
                </div>
                <div className="sq-page-builder__right">
                  {this.state.enableProps && (
                    <Panel header="Page Properties" onClose={this.toggleProps}>
                      <Form
                        value={this.state.contentData.pageData}
                        onChange={this.formOnChange}
                        fields={[
                          {
                            name: 'title',
                            cmpType: 'Input',
                            label: 'Title',
                          },
                          // {
                          //   name: 'pageBackground',
                          //   cmpType: 'ColorPicker',
                          //   label: 'Page background',
                          // },
                          {
                            name: 'updatePageTitle',
                            cmpType: 'Switch',
                            label: 'updatePageTitle',
                          },
                          {
                            name: 'init',
                            cmpType: 'FormObject',
                            label: 'init',
                          },
                          {
                            name: 'merge',
                            cmpType: 'FormObject',
                            label: 'merge',
                          },
                          {
                            name: 'template',
                            cmpType: 'Autocomplete',
                            label: 'Template',
                            options: pageData.templates || config.templates,
                          },
                          {
                            name: 'layout',
                            cmpType: 'Autocomplete',
                            label: 'Layout',
                            options: pageData.layouts || config.layouts,
                          },
                          {
                            name: 'theme',
                            cmpType: 'Autocomplete',
                            label: 'Theme',
                            options: pageData.themes || config.themes,
                          },
                          {
                            name: 'className',
                            cmpType: 'InputWithOptions',
                            label: 'className',
                            options: GLOBAL_OPTIONS.bodyContainers.toArray(),
                          },
                          {
                            name: 'wrapperClassName',
                            cmpType: 'InputWithOptions',
                            label: 'wrapperClassName',
                            options:
                              GLOBAL_OPTIONS.pageWrapperClasses.toArray(),
                          },
                          {
                            cmpType: 'Autocomplete',
                            name: 'container',
                            label: 'container',
                            options: pageData.containers || config.containers,
                          },
                          {
                            cmpType: 'Input',
                            name: 'bodyClassName',
                            label: 'bodyClassName',
                          },
                          {
                            cmpType: 'Autocomplete',
                            name: 'containerTemplate',
                            label: 'containerTemplate',
                            options: pageData.containers || config.containers,
                          },
                          {
                            cmpType: 'FormObject',
                            name: 'custom',
                            label: 'custom',
                          },
                        ]}
                      />
                    </Panel>
                  )}
                </div>
              </div>
            </DndProvider>
          </div>
          <div className="sq-page-builder__footer"></div>
        </div>
      </div>
    );
  }
}

PageBuilder.propTypes = {};

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
      showNotificationMessage: (data) =>
        dispatch(showNotificationMessage(data)),
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

export default connect(mapStateToProps, mapDispatchToProps)(PageBuilder);
export { PageBuilder, addComponent, withEditTabsConfig };
