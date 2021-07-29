import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import './_rich-text.scss';

class RichTextField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focused: false,
      hasChanged: false
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }

  handleOnChange(evt) {
    this.setState({
      value: evt.value,
      hasChanged: true
    });
    const { onKeyPress, onChange } = this.props;
    onKeyPress &&
      onKeyPress({
        value: evt.value
      });
    onChange &&
      onChange({
        value: this.state.value
      });
  }

  componentDidMount() {
    const that = this;
    this.setState({
      value: this.props.value !== undefined ? this.props.value : ''
    });
    const { ...rest } = this.props;
    this.editorInstance = new Quill(this.editor, {
      theme: 'snow',
      ...rest
    });
    this.editorInstance.on('text-change', function (delta, oldDelta, source) {
      that.handleOnChange({
        value: that.editorInstance.root.innerHTML,
        textValue: that.editorInstance.root.innerText
      });
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
    if (this.props.disabled !== prevProps.disabled) {
      if (this.props.disabled) {
        this.editorInstance.disable();
      } else {
        this.editorInstance.enable();
      }
    }
  }

  handleFocus() {
    this.setState({
      focused: true
    });
  }

  handleBlur() {
    const { onBlur, onChange } = this.props;
    this.setState({
      focused: false
    });
    onBlur &&
      onBlur({
        value: this.state.value
      });
    onChange &&
      onChange({
        value: this.state.value
      });
  }

  handleOnKeyUp(e) {
    if (e.key === 'Enter') {
      this.handleOnChange(e);
      this.handleBlur();
    }
  }

  render() {
    const { focused } = this.state;
    const { errorMessage, label, className = '', formatter, ...rest } = this.props;
    let formatteedValue = this.state.value;
    return (
      <div className={`sq-richtext-field${focused ? ' sq-richtext-field--focused' : ''} ${className}`}>
        {label && <label htmlFor="">{label}</label>}
        <div className={`sq-richtext-field__editor`} ref={(el) => (this.editor = el)}></div>
        {!focused && <div className="sq-textarea-field--error">{errorMessage}</div>}
      </div>
    );
  }
}

RichTextField.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  formatter: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func
};
export default RichTextField;
