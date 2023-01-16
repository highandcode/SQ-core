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
import { Placeholder } from './Placeholder';

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
      text: '/apps/core/templates/page',
      value: '/apps/core/templates/page',
    },
  ],
  layouts: [
    {
      text: '/apps/core/layouts/spa',
      value: '/apps/core/layouts/spa',
    },
  ],
  containers: [
    {
      text: 'Default',
      value: 'Default',
    },
  ],
};

export const updateConfig = ({
  templates,
  layouts,
  containers,
}) => {
  if (templates) {
    config.templates = templates;
  }
  if (layouts) {
    config.layouts = layouts;
  }
  if (containers) {
    config.containers = containers;
  }
};

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
import { getPage, savePageDraft } from '../../redux/admin';
import ContentEditor from './ContentEditor';

import './_page-builder.scss';
import { ItemTypes } from './ItemTypes';
import { getSupportedComps, addComponent } from './supported-comps';
import DynamicContent from '../DynamicContent';
import * as utils from '../../utils';
import ErrorBoundry from '../../components/ErrorBoundry';

class PageBuilder extends Component {
  constructor() {
    super();
    this.state = {
      enableMenu: true,
      enableProps: true,
      contentData: {
        pageData: {
          items: [],
        },
      },
    };
    this.componentOnDrop = this.componentOnDrop.bind(this);
    this.toggleProps = this.toggleProps.bind(this);
    this.toggleElements = this.toggleElements.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentDelete = this.onContentDelete.bind(this);
    this.savePageAsDraft = this.savePageAsDraft.bind(this);
    this.formOnChange = this.formOnChange.bind(this);
    this.onMoveItemDown = this.onMoveItemDown.bind(this);
    this.onMoveItemUp = this.onMoveItemUp.bind(this);
  }
  async componentDidMount() {
    const { pageData, store } = this.props;
    await this.props.raiseAction(
      getPage(
        {
          path: utils.queryString.query.get().path,
        },
        pageData.getPageConfig
      )
    );
    this.setState({
      contentData: this.props.store.admin.contentData,
    });
  }
  async savePageAsDraft() {
    const { pageData, store } = this.props;
    await this.props.raiseAction(
      savePageDraft(this.state.contentData, pageData.savePageConfig)
    );
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
  }

  togglePreview() {
    this.setState({
      preview: !this.state.preview,
    });
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
  }

  render() {
    const { className = '', pageData } = this.props;
    const compList = getSupportedComps();
    return (
      <div
        className={`sq-page-builder sq-v-screen sq-v-screen--fixed ${className}`}
      >
        <div className="sq-v-screen__container">
          <div className="sq-page-builder__top-actions mb-wide">
            <Switch
              label="Preview"
              value={this.state.preview}
              onChange={this.togglePreview}
            />
            <Button
              iconName={'Save'}
              variant="outlined"
              buttonText="Save as Draft"
              onClick={this.savePageAsDraft}
            />
            <Button iconName={'Publish'} buttonText="Publish" />
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
                  title="Properties"
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
                        <ComponentList compList={compList} />
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
                        pageData={this.state.contentData.pageData}
                        compList={compList}
                        onDelete={this.onContentDelete}
                        onChange={this.onContentChange}
                        onMoveItemUp={this.onMoveItemUp}
                        onMoveItemDown={this.onMoveItemDown}
                      />
                      <Placeholder
                        allowedDropEffect={'any'}
                        accept={[ItemTypes.COMPONENT, ItemTypes.FORM]}
                        onDrop={this.componentOnDrop}
                      />
                    </>
                  )}
                </div>
                <div className="sq-page-builder__right">
                  {this.state.enableProps && (
                    <Panel header="Properties" onClose={this.toggleProps}>
                      <Form
                        value={this.state.contentData.pageData}
                        onChange={this.formOnChange}
                        fields={[
                          {
                            name: 'title',
                            cmpType: 'Input',
                            label: 'Title',
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
                            name: 'className',
                            cmpType: 'Input',
                            label: 'className',
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
                            cmpType: 'Input',
                            name: 'containerTemplate',
                            label: 'containerTemplate',
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
export { PageBuilder, addComponent };
