import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './_rich-text.scss';

function getText(html) {
  var divContainer = document.createElement('div');
  divContainer.innerHTML = html;
  return divContainer.textContent || divContainer.innerText || '';
}

let configOptions = {
  full: {
    plugins: 'code link table fullscreen',
    toolbar: 'heading | undo redo | styleselect | bold italic underline strikethrough | link superscript subscript | alignleft aligncenter alignright alignjustify | outdent indent | table | code fullscreen',
  },
  default: {
    plugins: 'code link table fullscreen',
    toolbar: 'heading | undo redo | styleselect | bold italic underline strikethrough | link superscript subscript | alignleft aligncenter alignright alignjustify | outdent indent | table | code fullscreen',
  },
  compact: {
    plugins: 'code link fullscreen',
    toolbar: 'heading | undo redo | styleselect | bold italic underline strikethrough | link superscript subscript | alignleft aligncenter alignright alignjustify | outdent indent | code fullscreen',
  },
};

export const setEditorOptions = (name, options) => {
  configOptions[name] = {
    ...configOptions,
    [name]: options,
    default: configOptions.default,
    compact: configOptions.compact,
  };
};

class RichTextField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focused: false,
      hasChanged: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.editorRef = React.createRef();
  }

  handleOnChange(value) {
    const html = this.editor.getContent();
    const hasText = getText(html);
    this.setState({
      value: html,
      hasChanged: true,
    });
    const { onChange } = this.props;

    onChange &&
      onChange({
        value: hasText && html,
      });
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
    if (!window.tinymce) {
      throw 'tinymce not found please load tinymce js from cdn or locally';
    }
    window.tinymce.init({
      target: this.editorRef.current,
      content_css: '/static/css/main.css',
      branding: false,
      promotion: false,
      ...(configOptions[this.props.editorStyle] || {}),
      ...this.props.editorOptions,
      setup: (editor) => {
        this.editor = editor;
        editor.on('Change', this.handleOnChange);
        editor.setContent(this.props.value);
        Object.keys(this.props.events || {}).forEach((eventName) => {
          editor.on(eventName, this.props.events[eventName]);
        });
      },
    });
  }
  componentDidUpdate(prevProps) {

    if (!this.state.focused && prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  handleFocus() {
    this.setState({
      focused: true,
    });
  }

  handleBlur() {
    const { onBlur, onChange } = this.props;
    this.setState({
      focused: false,
    });
  }

  render() {
    const { focused } = this.state;
    const { label, className = '', formatter, value, error, errorMessage, ...rest } = this.props;

    return (
      <div className={`sq-richtext-field${focused ? ' sq-richtext-field--focused' : ''} ${className}`}>
        {label && <label htmlFor="">{label}</label>}
        <div>
          <textarea ref={this.editorRef}>{value}</textarea>
        </div>
        {!focused && error && <div className="sq-textarea-field--error">{errorMessage}</div>}
      </div>
    );
  }
}

RichTextField.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  editorStyle: PropTypes.string,
  formatter: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
};

RichTextField.defaultProps = {
  editorStyle: 'default',
};
export default RichTextField;
