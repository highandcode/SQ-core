import React from 'react';
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import GridRow from './components/GridRow';
import GridHeaderRow from './components/GridHeaderRow';
import ColFilters from './components/GridColumnFilter';
import Dialog from '../Dialog';
import Button from '../ui/Button';
import './grid.scss';
import { translate } from '../../utils/translate';
import { getValue } from '../../utils/properties';

const RowTypes = {
  GridRow,
};

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedIndex: 0,
      data: [],
      validated: false,
      total: {},
      hasLeftScrolled: false,
    };
    this.headerRef = React.createRef();
    this.bodyRef = React.createRef();
    this.fixedHeaderRef = React.createRef();
    this.fixedRHeaderRef = React.createRef();
    this.fixedLBodyRef = React.createRef();
    this.fixedRBodyRef = React.createRef();
    this.bodyWrapperRef = React.createRef();
    this.addNewRow = this.addNewRow.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleFieldClick = this.handleFieldClick.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleFieldAction = this.handleFieldAction.bind(this);
    this.handleChildRowRender = this.handleChildRowRender.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.onBody_Scroll = this.onBody_Scroll.bind(this);
    this.onLeftBody_Scroll = this.onLeftBody_Scroll.bind(this);
    this.onRightBody_Scroll = this.onRightBody_Scroll.bind(this);
    this.handleColSelChange = this.handleColSelChange.bind(this);
    this.onColumReorder = this.onColumReorder.bind(this);
  }
  onLeftBody_Scroll(e) {
    this.bodyRef.current.scrollTop = this.fixedLBodyRef.current.scrollTop;
    this.fixedRBodyRef.current.scrollTop = this.fixedLBodyRef.current.scrollTop;
  }
  onRightBody_Scroll(e) {
    this.bodyRef.current.scrollTop = this.fixedRBodyRef.current.scrollTop;
    this.fixedLBodyRef.current.scrollTop = this.fixedRBodyRef.current.scrollTop;
  }

  onBody_Scroll(e) {
    this.headerRef.current.scrollLeft = this.bodyRef.current.scrollLeft;
    this.fixedLBodyRef.current.scrollTop = this.bodyRef.current.scrollTop;
    if (!(this.bodyRef.current.scrollLeft > 0 && this.state.hasLeftScrolled === true)) {
      if (!(this.bodyRef.current.scrollLeft === 0 && this.state.hasLeftScrolled === false)) {
        this.setState({
          hasLeftScrolled: this.bodyRef.current.scrollLeft > 0,
        });
      }
    }
  }

  componentDidMount() {
    this.bodyRef.current.addEventListener('scroll', this.onBody_Scroll);
    this.fixedLBodyRef.current.addEventListener('scroll', this.onLeftBody_Scroll);
    this.fixedRBodyRef.current.addEventListener('scroll', this.onRightBody_Scroll);
  }

  addNewRow(evt) {
    const { onAddNew } = this.props;
    onAddNew && onAddNew(evt);
  }

  handleColSelChange(data) {
    const { onColFilterSelection } = this.props;
    onColFilterSelection &&
      onColFilterSelection({
        value: data.value,
      });
    this.setState({
      tempColSelection: data.value,
    });
  }

  onColumReorder(colOrder) {
    this.setState({
      tempColOrder: colOrder,
    });
  }

  handleApplySelection(action) {
    const { onColFilterChange } = this.props;
    if (action.actionType === 'apply') {
      this.setState({
        selectedColumns: this.state.tempColSelection || this.props.selectedColumns,
        colOrder: this.state.tempColOrder,
      });
      onColFilterChange &&
        onColFilterChange({
          value: this.state.tempColSelection || this.props.selectedColumns,
        });
    } else {
      this.setState({
        tempColSelection: this.state.selectedColumns,
      });
      onColFilterChange &&
        onColFilterChange({
          value: this.state.selectedColumns,
          cancel: true,
        });
    }
  }

  render() {
    const { columns = [], editColumnPane = {}, showColSelection = false, data = [], className = '', showAdd = false, showHeader = true, rowConfig = {}, onRowClick, gridStyle = 'default' } = this.props;
    const actionsClassName = typeof onRowClick === 'function' ? 'sq-grid--has-action' : '';
    const finalColumns = columns
      .sort((a, b) => {
        return this.state.colOrder && (this.state.colOrder[a.name] > this.state.colOrder[b.name] ? 1 : this.state.colOrder[a.name] < this.state.colOrder[b.name] ? -1 : 0);
      })
      .filter((col) => {
        return col.customize === false || !this.props.selectedColumns ? true : this.props.selectedColumns.indexOf(col.name) > -1;
      });
    const nonFixedColumns = columns.filter((i) => !i.fixed);
    const fixedLeftColumns = finalColumns.filter((i) => i.fixed === true && (!i.direction || i.direction === 'left'));
    const fixedRightColumns = finalColumns.filter((i) => i.fixed === true && i.direction === 'right');
    const otherColumns = finalColumns.filter((i) => !i.fixed);
    return (
      <div className={`sq-grid ${className} ${actionsClassName} sq-grid--${gridStyle}`}>
        <Dialog
          open={showColSelection}
          transitionDir="left"
          actions={[
            {
              buttonText: 'Apply',
              actionType: 'apply',
            },
            {
              buttonText: 'Cancel',
              variant: 'outlined',
              actionType: 'cancel',
            },
          ]}
          title={'Customize Columns'}
          {...editColumnPane}
          classes={{
            dialog: {
              root: 'sq-dialog--fixed-right',
            },
          }}
          onClose={(data, action) => this.handleApplySelection(action)}
          onAction={(data, action) => this.handleApplySelection(action)}
        >
          <DndProvider backend={HTML5Backend}>
            <ColFilters colOrder={this.state.colOrder} onColumReorder={this.onColumReorder} columns={columns} value={this.state.tempColSelection || this.props.selectedColumns || columns.map((i) => i.name)} onChange={this.handleColSelChange} />
          </DndProvider>
        </Dialog>
        <div className="sq-grid__root">
          <div className={`sq-grid__left-fixed ${this.state.hasLeftScrolled > 0 ? 'has-scrolled' : ''}`}>
            {this.hasData() && fixedLeftColumns.length > 0 && showHeader && (
              <div className="sq-grid__header" ref={this.fixedHeaderRef}>
                {!this.isLoading() && this.renderHeader(fixedLeftColumns)}
              </div>
            )}
            <div className="sq-grid__body" ref={this.fixedLBodyRef}>
              {this.hasData() && !this.isLoading() && fixedLeftColumns.length > 0 && (
                <div className="sq-grid-body__wrapper">
                  {this.renderData(fixedLeftColumns, data, rowConfig, undefined, true)}
                </div>
              )}
            </div>
          </div>
          <div className="sq-grid__center">
            {this.isLoading() && this.renderLoadingView()}
            {this.hasData() && showHeader && (
              <div className="sq-grid__header" ref={this.headerRef}>
                {!this.isLoading() && this.renderHeader(otherColumns, true)}
              </div>
            )}
            <div className="sq-grid__body" ref={this.bodyRef}>
              <div className="sq-grid-body__wrapper" ref={this.bodyWrapperRef}>
                {!this.isLoading() && this.renderData(otherColumns, data, rowConfig, true)}
              </div>
            </div>
          </div>
          <div className={`sq-grid__right-fixed`}>
            {this.hasData() && fixedRightColumns.length > 0 && showHeader && (
              <div className="sq-grid__header" ref={this.fixedRHeaderRef}>
                {!this.isLoading() && this.renderHeader(fixedRightColumns)}
              </div>
            )}
            <div className="sq-grid__body" ref={this.fixedRBodyRef}>
              {this.hasData() && fixedRightColumns.length > 0 && (
                <div className="sq-grid-body__wrapper">
                  {!this.isLoading() && this.renderData(fixedRightColumns, data, rowConfig,  undefined, true)}
                </div>
              )}
            </div>
          </div>
        </div>
        {this.hasActions() && <div className="sq-grid__actions">{showAdd && <Button buttonText={translate('Add')} onClick={this.addNewRow} />}</div>}
      </div>
    );
  }

  handleSort(data, column) {
    const { onSort } = this.props;
    onSort && onSort(data, column);
  }

  renderHeader(columns, spacer) {
    const { sortColumn, sortOrder, enableSort = false } = this.props;
    let scrollbarWidth = 0;
    if (this.bodyRef?.current) {
      scrollbarWidth = this.bodyRef.current.offsetWidth - this.bodyRef.current.clientWidth;
    }
    return <GridHeaderRow spacer={spacer} columns={columns} sortColumn={sortColumn} sortOrder={sortOrder} enableSort={enableSort} spacerWidth={scrollbarWidth} onSort={this.handleSort} />;
  }

  renderData(columns, data, rowConfig, spacer, disableLoader) {
    if (!this.hasData()) {
      return this.renderNoDataView();
    } else if (this.hasData()) {
      return data.map((rowData, index) => {
        return this.renderRow(columns, rowData, rowConfig, index, spacer);
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

  renderLoadingView(disable = false) {
    const { loader } = this.props;
    return disable === false && <div className="sq-grid__body container-fluid sq-grid__loading-data">{loader}</div>;
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
      updatedIndex: this.state.updatedIndex + 1,
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
  handleFieldAction(column, action, row) {
    const { onAction } = this.props;
    onAction && onAction(row, action, column);
  }
  renderRow(columns, data, rowConfig = {}, index, spacer) {
    const { rowType, className = '', wrapperClassName = '' } = rowConfig;
    const RowComp = RowTypes[rowType] || RowTypes.GridRow;
    const finalClassName = getValue(this, className, data, columns);
    const finalWrapperClassName = getValue(this, wrapperClassName, data, columns);

    return (
      <RowComp
        key={`${index}${this.state.updatedIndex}`}
        columns={columns}
        spacer={spacer}
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
  errorMessage: PropTypes.func,
};

export default Grid;
