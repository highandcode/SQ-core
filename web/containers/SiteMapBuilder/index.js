import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { startLoading, showNotificationMessage, closeNotification, stopLoading, showPopupScreen, showPopup, setError, clearError } from '../../redux/common';
import { getFieldsMeta, getPage, savePageDraft } from '../../redux/admin';
import IconButton from '../../components/ui/IconButton';
import DynamicContent from '../DynamicContent';

import Button from '../../components/ui/Button';
import Switch from '../../components/ui/Switch';
import * as utils from '../../utils';
import editData from './editConfig';
import { fetchContentPage, postApi, downloadApi, executeHook, updateUserData, updateMetaData, mergeUserData, updateErrorData, resetUserData, customHooks, sendContact, processParams } from '../../redux/content';

class SiteMapBuilder extends Component {
  constructor() {
    super();
    this.state = {
      enableMenu: true,
      autoSave: true,
      enableProps: false,
      contentData: {},
    };
    this.savePageAsDraft = this.savePageAsDraft.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.toggleAutoSave = this.toggleAutoSave.bind(this);
  }

  toggleAutoSave() {
    this.setState({
      autoSave: !this.state.autoSave,
    });
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
    this.setState({
      contentData: this.props.store.admin.contentData,
    });

    this.props.commonActions.stopLoading();
  }
  async savePageAsDraft(data, autoSave) {
    const { pageData, store } = this.props;
    !autoSave && this.props.commonActions.startLoading();
    await this.props.raiseAction(savePageDraft({ ...this.state.contentData }, { autoSave, ...pageData.savePageConfig }));
    !autoSave && this.props.commonActions.stopLoading();
  }
  async onContentChange(data) {
    await this.setState({
      contentData: { ...this.state.contentData, pageData: { ...data } },
    });
    this.state.autoSave && this.savePageAsDraft(data, this.state.autoSave);
  }
  render() {
    const { className = '', pageData, store } = this.props;
    console.log;
    return (
      <div className={`sq-sitemap-builder sq-v-screen sq-v-screen--fixed ${className}`}>
        <DndProvider backend={HTML5Backend}>
          <div className="sq-v-screen__container">
            <div className="sq-sitemap-builder__top-actions text-right mb-wide">
              <div className="container-fluid">
                <Switch label="Autosave" value={this.state.autoSave} onChange={this.toggleAutoSave} />
                <Button iconName={'Save'} variant="outlined" buttonText="Save" onClick={() => this.savePageAsDraft()} />
              </div>
              {/* <Button iconName={'Preview'} variant="outlined" buttonText="Full Preview" onClick={this.showPreview} /> */}
              {/* <Button iconName={'Publish'} buttonText="Publish" /> */}
            </div>
            <div className="sq-sitemap-builder__content sq-v-screen-grow auto">
              <div className="container-fluid">
                {this.state.contentData?.pageData && (
                  <DynamicContent
                    pageConfig={editData}
                    rootClass={''}
                    initialData={{
                      main: this.state.contentData.pageData,
                    }}
                    contentParams={editData.pageData.params}
                    onContentChange={this.onContentChange}
                    onSubmit={this.savePageAsDraft}
                  />
                )}
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    );
  }
}

SiteMapBuilder.propTypes = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(SiteMapBuilder);
export { SiteMapBuilder };
