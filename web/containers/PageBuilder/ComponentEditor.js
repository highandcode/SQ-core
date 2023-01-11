import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../components/ErrorBoundry';
import IconButton from '../../components/ui/IconButton';
import Dialog from '../../components/Dialog';
import './_component-editor.scss';
import DynamicContent from '../DynamicContent';
import { Placeholder } from './Placeholder';

class ComponentEditor extends Component {
  constructor() {
    super();
    this.state = { openSettings: false };
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.saveFormData = this.saveFormData.bind(this);
    this.saveFormElData = this.saveFormElData.bind(this);
    this.onComponentDrop = this.onComponentDrop.bind(this);
    this.deleteComponentByIdx = this.deleteComponentByIdx.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }

  toggleEditForm() {
    this.setState({
      openSettings: !this.state.openSettings,
    });
  }

  saveFormData(data) {
    const { onChange } = this.props;
    onChange && onChange(data);
    this.toggleEditForm();
  }
  saveFormElData(data, idx) {
    const { onChange, itemsPropName, value = {} } = this.props;
    const finalData = {
      ...value,
      [itemsPropName]: [...((value && value[itemsPropName]) || [])],
    };
    finalData[itemsPropName][idx] = {
      ...finalData[itemsPropName][idx],
      ...data,
    };
    onChange && onChange(finalData);
  }
  deleteComponentByIdx(idx) {
    const { onChange, itemsPropName, value = {} } = this.props;
    const finalData = {
      ...value,
      [itemsPropName]: [...((value && value[itemsPropName]) || [])],
    };
    finalData[itemsPropName].splice(idx, 1);
    onChange && onChange(finalData);
  }

  deleteComponent() {
    const { onDelete } = this.props;
    onDelete && onDelete();
  }

  onComponentDrop(dataComp) {
    const { metaData, ...data } = dataComp;
    const { onChange, itemsPropName, compTypeProp, value } = this.props;
    const finalData = {
      ...value,
      [itemsPropName]: [
        ...((value && value[itemsPropName]) || []),
        {
          [compTypeProp]: data.name,
          ...metaData.sampleData,
          ...data,
          name: `${value.name}${
            value.name ? '_' : ''
          }${data.name?.toLowerCase()}_${
            value[itemsPropName]?.length + 1 || 1
          }`,
        },
      ],
    };

    onChange && onChange(finalData);
  }

  render() {
    const {
      pageData = {},
      Component,
      sampleData = {},
      itemsPropName,
      name,
      value,
      compTypeProp,
      component,
      editData,
    } = this.props;
    const { hasItems, ...rest } = this.props;
    const { [itemsPropName]: items } = value || {};
    const { className = '' } = pageData;
    const { hasPlaceholder, accept, compList } = this.props;
    return (
      <div
        className={`sq-component-editor ${className} ${value.className || ''}`}
      >
        <Dialog
          classes={{
            dialog: {
              root: 'sq-dialog--fixed-right',
            },
          }}
          onClose={this.toggleEditForm}
          title={`${component} Configuration`}
          open={this.state.openSettings}
        >
          <div className="mt-wide">
            {editData && (
              <DynamicContent
                pageConfig={editData}
                initialData={{
                  main: value,
                }}
                onSubmit={this.saveFormData}
              />
            )}
          </div>
        </Dialog>
        <div className="sq-component-editor__name">
          <span className="sq-component-editor__name-text">{component}</span>
          {value.className ? `.${value.className}` : ''}
          {value.name ? `#${value.name}` : ''}
        </div>
        {/* <IconButton className="sq-component-editor__move" iconName={'Move'} /> */}
        <div className="sq-component-editor__actions">
          <IconButton iconName={'Settings'} onClick={this.toggleEditForm} />
          <IconButton iconName={'Delete'} onClick={this.deleteComponent} />
        </div>
        <div
          className={`sq-component-editor__container ${value.bodyClassName}`}
        >
          <ErrorBoundary>
            {!hasItems && <Component {...sampleData} {...value} />}
            {hasItems &&
              items &&
              items.map((item, idx) => {
                const Component = compList[item[compTypeProp]];
                const { [compTypeProp]: cmpType, ...restItem } = item;
                return (
                  <ErrorBoundary key={idx}>
                    <ComponentEditor
                      parentName={item.name}
                      component={item[compTypeProp]}
                      itemsPropName={itemsPropName}
                      compList={compList}
                      {...Component}
                      value={restItem}
                      onDelete={() => this.deleteComponentByIdx(idx)}
                      onChange={(data) => this.saveFormElData(data, idx)}
                    />
                  </ErrorBoundary>
                );
              })}
          </ErrorBoundary>
        </div>
        {hasPlaceholder && (
          <Placeholder accept={accept} onDrop={this.onComponentDrop} />
        )}
      </div>
    );
  }
}

ComponentEditor.propTypes = {
  data: PropTypes.object,
};

export default ComponentEditor;
