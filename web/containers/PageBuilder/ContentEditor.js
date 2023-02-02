import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../components/ErrorBoundry';
import ComponentEditor from './ComponentEditor';
import { Placeholder } from './Placeholder';
import { ItemTypes } from './ItemTypes';

import './_content-editor.scss';

class ContentEditor extends Component {
  constructor() {
    super();
    this.state = {};
    this.componentOnChange = this.componentOnChange.bind(this);
    this.componentOnDelete = this.componentOnDelete.bind(this);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.componentOnDrop = this.componentOnDrop.bind(this);
  }

  componentOnChange(data, idx) {
    const { onChange } = this.props;
    onChange && onChange(data, idx);
  }
  componentOnDelete(idx) {
    const { onDelete } = this.props;
    onDelete && onDelete(idx);
  }

  handleMoveDown(idx) {
    const { onMoveItemDown } = this.props;
    onMoveItemDown && onMoveItemDown(idx);
  }
  componentOnDrop(item, atIdx) {
    const { onDrop } = this.props;
    onDrop && onDrop(item, atIdx);
  }

  handleMoveUp(idx) {
    const { onMoveItemUp } = this.props;
    onMoveItemUp && onMoveItemUp(idx);
  }

  render() {
    const { pageData = {}, compList = {}, fieldsMeta } = this.props;
    const { className = '' } = pageData;

    return (
      <div className={`sq-content-editor ${className}`}>
        {pageData.items &&
          pageData.items.map((block, idx) => {
            const Component = compList[block.component] || compList.Default;
            return (
              <ErrorBoundary key={idx}>
                {/* <Placeholder allowedDropEffect={'any'} plaecHolderStle="line" accept={[ItemTypes.COMPONENT, ItemTypes.FORM]} onDrop={this.componentOnDrop} /> */}
                <ComponentEditor
                  component={block.component}
                  fieldsMeta={fieldsMeta}
                  {...block.metaData}
                  isStart={idx === 0}
                  isEnd={idx === pageData.items.length - 1}
                  {...Component}
                  value={block}
                  compList={compList}
                  onDelete={() => this.componentOnDelete(idx)}
                  onChange={(data) => this.componentOnChange(data, idx)}
                  onMoveUp={() => this.handleMoveUp(idx)}
                  onMoveDown={() => this.handleMoveDown(idx)}
                />
                {/* <Placeholder allowedDropEffect={'any'} plaecHolderStle="line" accept={[ItemTypes.COMPONENT, ItemTypes.FORM]} onDrop={this.componentOnDrop} /> */}
              </ErrorBoundary>
            );
          })}
        <Placeholder allowedDropEffect={'any'} accept={[ItemTypes.COMPONENT, ItemTypes.FORM]} onDrop={this.componentOnDrop} />
      </div>
    );
  }
}

ContentEditor.propTypes = {
  pageData: PropTypes.object,
  compList: PropTypes.object,
};

export default ContentEditor;
