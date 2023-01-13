import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  }
  async componentDidMount() {
    const { pageData, store } = this.props;
    await this.props.raiseAction(
      getPage(
        {
          path: utils.queryString.query.get().path,
        },
        pageData.urls
      )
    );
    this.setState({
      contentData: this.props.store.admin.contentData,
    });
  }
  async savePageAsDraft() {
    const { pageData, store } = this.props;
    await this.props.raiseAction(
      savePageDraft(this.state.contentData, pageData.urls)
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

  render() {
    const { className = '', ...rest } = this.props;
    const compList = getSupportedComps();
    return (
      <div className={`sq-page-builder ${className}`}>
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
        <div className="sq-page-builder__content">
          <DndProvider backend={HTML5Backend}>
            <div className="sq-page-builder__l-options">
              <IconButton
                title="Elements"
                iconName="code"
                variant={this.state.enableMenu ? 'default' : 'primary'}
                onClick={this.toggleElements}
              />
            </div>
            <div className="sq-page-builder__r-options">
              <IconButton
                title="Properties"
                iconName="default"
                variant={this.state.enableProps ? 'default' : 'primary'}
                onClick={this.toggleProps}
              />
            </div>

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
                  <DynamicContent pageConfig={this.state.contentData} />
                )}
                {!this.state.preview && (
                  <>
                    <ContentEditor
                      pageData={this.state.contentData.pageData}
                      compList={compList}
                      onDelete={this.onContentDelete}
                      onChange={this.onContentChange}
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
                      fields={[
                        {
                          name: 'title',
                          cmpType: 'InputField',
                          label: 'Title',
                        },
                        {
                          name: 'className',
                          cmpType: 'InputField',
                          label: 'className',
                        },
                        {
                          cmpType: 'InputField',
                          name: 'container',
                          label: 'container',
                        },
                        {
                          cmpType: 'InputField',
                          name: 'bodyClassName',
                          label: 'bodyClassName',
                        },
                        {
                          cmpType: 'InputField',
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
