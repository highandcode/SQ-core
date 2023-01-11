import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../components/ErrorBoundry';
import ComponentEditor from './ComponentEditor';
import './_content-editor.scss';

class ContentEditor extends Component {
  constructor() {
    super();
    this.state = {};
    this.componentOnChange = this.componentOnChange.bind(this);
    this.componentOnDelete = this.componentOnDelete.bind(this);
  }

  componentOnChange(data, idx) {
    const { onChange } = this.props;
    onChange && onChange(data, idx);
  }
  componentOnDelete(idx) {
    const { onDelete } = this.props;
    onDelete && onDelete(idx);
  }
  render() {
    const { pageData = {}, compList = {} } = this.props;
    const { className = '' } = pageData;

    return (
      <div className={`sq-content-editor ${className}`}>
        {pageData.items &&
          pageData.items.map((block, idx) => {
            const Component = compList[block.component];
            return (
              <ErrorBoundary key={idx}>
                <ComponentEditor
                  component={block.component}
                  {...block.metaData}
                  {...Component}
                  value={block}
                  compList={compList}
                  onDelete={() => this.componentOnDelete(idx)}
                  onChange={(data) => this.componentOnChange(data, idx)}
                />
              </ErrorBoundary>
            );
          })}
      </div>
    );
  }
}

ContentEditor.propTypes = {
  pageData: PropTypes.object,
  compList: PropTypes.object,
};

export default ContentEditor;
