import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import ErrorBoundary from '../../components/ErrorBoundry';
import IconButton from '../../components/ui/IconButton';
import Dialog from '../../components/Dialog';
import './_component-editor.scss';
import DynamicContent from '../DynamicContent';
import { Placeholder } from './Placeholder';

let changeIdx = 1;
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
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveElemDown = this.moveElemDown.bind(this);
    this.moveElemUp = this.moveElemUp.bind(this);
  }

  toggleEditForm() {
    this.setState({
      openSettings: !this.state.openSettings,
    });
  }

  saveFormData(data) {
    const { onChange } = this.props;
    onChange && onChange(data);
    changeIdx++;
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
    changeIdx++;
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

  moveUp() {
    const { onMoveUp } = this.props;
    onMoveUp && onMoveUp();
  }

  moveDown() {
    const { onMoveDown } = this.props;
    onMoveDown && onMoveDown();
  }
  moveElemUp(index) {
    const { onChange, itemsPropName, compTypeProp, value } = this.props;
    const items = (value && value[itemsPropName]) || [];
    let updatedCols = update(items, {
      $splice: [
        [index, 1],
        [index - 1, 0, items[index]],
      ],
    });
    const finalData = {
      ...value,
      [itemsPropName]: updatedCols,
    };
    onChange && onChange(finalData);
  }

  moveElemDown(index) {
    const { onChange, itemsPropName, compTypeProp, value } = this.props;
    const items = (value && value[itemsPropName]) || [];
    let updatedCols = update(items, {
      $splice: [
        [index, 1],
        [index + 1, 0, items[index]],
      ],
    });
    const finalData = {
      ...value,
      [itemsPropName]: updatedCols,
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
      isStart,
      isEnd,
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
          {!isStart && <IconButton size="small" iconSize='small' iconName={'arrow-up'} onClick={this.moveUp} />}
          {!isEnd && <IconButton size="small" iconSize='small' iconName={'arrow-down'} onClick={this.moveDown} />}
          <IconButton size="small" iconSize='small' iconName={'Settings'} onClick={this.toggleEditForm} />
          <IconButton size="small" iconSize='small' iconName={'Delete'} onClick={this.deleteComponent} />
        </div>
        <div
          className={`sq-component-editor__container ${value.bodyClassName}`}
        >
          <ErrorBoundary>
            {!hasItems && <Component {...value} />}
            {hasItems &&
              items &&
              items.map((item, idx) => {
                const Component = compList[item[compTypeProp]];
                const { [compTypeProp]: cmpType, ...restItem } = item;
                return (
                  <ErrorBoundary key={idx + changeIdx}>
                    <ComponentEditor
                      parentName={item.name}
                      component={item[compTypeProp]}
                      isStart={idx === 0}
                      isEnd={idx === items.length -1}
                      index={idx}
                      itemsPropName={itemsPropName}
                      compList={compList}
                      {...Component}
                      value={restItem}
                      onDelete={() => this.deleteComponentByIdx(idx)}
                      onChange={(data) => this.saveFormElData(data, idx)}
                      onMoveUp={() => this.moveElemUp(idx)}
                      onMoveDown={() => this.moveElemDown(idx)}
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
