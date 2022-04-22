import React from 'react';
import PropTypes from 'prop-types';
import GridRow from './components/GridRow';
import GridHeaderRow from './components/GridHeaderRow';
import Button from '../ui/Button';
import './grid.scss';
import { translate } from '../../utils/translate';
import { getValue } from '../../utils/properties';

const RowTypes = {
  GridRow
};

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedIndex: 0,
      data: [],
      validated: false,
      total: {}
    };
    this.addNewRow = this.addNewRow.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleFieldClick = this.handleFieldClick.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleFieldAction = this.handleFieldAction.bind(this);
    this.handleChildRowRender = this.handleChildRowRender.bind(this);
  }

  addNewRow(evt) {
    const { onAddNew } = this.props;
    onAddNew && onAddNew(evt);
  }

  render() {
    const { columns = [], data = [], className = '', showAdd = false, showHeader = true, strips = false, rowConfig = {}, onRowClick, gridStyle = 'normal' } = this.props;
    const actionsClassName = typeof onRowClick === 'function' ? 'sq-grid--has-action' : '';
    return (
      <div className={`sq-grid ${className} ${actionsClassName} sq-grid${strips ? '--striped' : '--bordered'} sq-grid--${gridStyle}`}>
        {this.hasData() && showHeader && <div className="sq-grid__header">{this.renderHeader(columns)}</div>}
        <div className="sq-grid__body">{this.renderData(columns, data, rowConfig)}</div>
        {this.hasActions() && (
          <div className="sq-grid__actions">{showAdd && <Button buttonText={translate('Add')} onClick={this.addNewRow} />}</div>
        )}
      </div>
    );
  }

  renderHeader(columns) {
    return <GridHeaderRow columns={columns} />;
  }

  renderData(columns, data, rowConfig) {
    if (this.isLoading()) {
      return this.renderLoadingView();
    } else if (!this.hasData()) {
      return this.renderNoDataView();
    } else {
      return data.map((rowData, index) => {
        return this.renderRow(columns, rowData, rowConfig, index);
      });
    }
  }

  isLoading() {
    return this.props.data === undefined || this.props.isLoading === true;
  }

  hasData() {
    return this.props.data && this.props.data.length > 0;
  }
  hasActions() {
    return this.props.showAdd;
  }

  renderLoadingView() {
    const { loader } = this.props;
    return <div className="sq-grid__body sq-grid__loading-data">{loader}</div>;
  }
  renderNoDataView() {
    const { noDataMessage = 'No Data Found' } = this.props;
    return <div className="sq-grid__body sq-grid__no-data">{noDataMessage}</div>;
  }

  handleRowChange(column, value, row) {
    const { onChange, onRowValidate } = this.props;
    const result = onRowValidate && onRowValidate(column, value, row);
    if (result === false) {
      return;
    }
    onChange && onChange(value, column, row);
  }

  handleChildRowRender(column, data) {
    const { onChildRowRender } = this.props;
    return onChildRowRender && onChildRowRender(column, data);
  }

  handleColumnChange(column, value, row) {
    const { onFieldChange, onColumnValidate } = this.props;
    const result = onColumnValidate && onColumnValidate(column, value, row);
    this.setState({
      updatedIndex: this.state.updatedIndex + 1
    });
    if (result === false) {
      return;
    }
    onFieldChange && onFieldChange(value, column, row);
  }

  handleRowClick(columns, row) {
    const { onRowClick, analytics = {}, onAnalytics } = this.props;
    const { rowClick } = analytics;
    onRowClick && onRowClick(row, columns);
    rowClick && onAnalytics && onAnalytics(rowClick);
  }

  handleFieldBlur(column, value, row) {
    const { onFieldBlur } = this.props;
    onFieldBlur && onFieldBlur(value, column, row);
  }

  handleFieldClick(column, value, row) {
    const { onFieldClick } = this.props;
    onFieldClick && onFieldClick(value, column, row);
  }
  handleFieldAction(column, value, row) {
    const { onAction } = this.props;
    onAction && onAction(value, column, row);
  }
  renderRow(columns, data, rowConfig = {}, index) {
    const { rowType, className = '', wrapperClassName = '' } = rowConfig;
    const RowComp = RowTypes[rowType] || RowTypes.GridRow;
    const finalClassName = getValue(this, className, data, columns);
    const finalWrapperClassName = getValue(this, wrapperClassName, data, columns);


    return (
      <RowComp
        key={`${index}${this.state.updatedIndex}`}
        columns={columns}
        className={finalClassName}
        wrapperClassName={finalWrapperClassName}
        data={data}
        errors={data.validators && data.validators.errors}
        onAnalytics={this.props.onAnalytics}
        onRowClick={this.handleRowClick}
        onRowChange={this.handleRowChange}
        onChildRowRender={this.handleChildRowRender}
        onFieldAction={this.handleFieldAction}
        onFieldBlur={this.handleFieldBlur}
        onFieldClick={this.handleFieldClick}
        onColumnChange={this.handleColumnChange}
      />
    );
  }
}

Grid.propTypes = {
  showAdd: PropTypes.bool,
  strips: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array,
  showHeader: PropTypes.bool,
  rowConfig: PropTypes.object,
  columns: PropTypes.array,
  onFieldBlur: PropTypes.func,
  onChildRowRender: PropTypes.func,
  onChange: PropTypes.func,
  onFieldChange: PropTypes.func,
  onAction: PropTypes.func,
  onFieldClick: PropTypes.func,
  onColumnValidate: PropTypes.func,
  onRowValidate: PropTypes.func,
  onSubmit: PropTypes.func,
  onAddNew: PropTypes.func,
  errorMessage: PropTypes.func
};

export default Grid;
