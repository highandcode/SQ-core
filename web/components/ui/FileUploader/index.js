import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import Button from '../Button';
import './file-uploader.scss';
import Icon from '../../Icon';
import Alert from '../../Alert';

const SQFileUploader = ({
  className = '',
  disabled,
  fileTypes = [
    'JPG',
    'PNG',
    'GIF',
    'PDF',
    'JPEG',
    'DOC',
    'DOCX',
    'PPT',
    'PPTX',
    'RTF',
  ],
  multiple = true,
  clearAll = false,
  onAction,
  errorMessage,
  uploadButtonText = 'Upload',
  clearButtonText = 'Clear',
  onChange,
  value,
  ...rest
}) => {
  const [file, setFile] = useState([]);
  const handleChange = (filenew) => {
   setFile([...(multiple ? file : []), ...(multiple ? filenew : [filenew])]);
  };
  const handleDelete = (filenew) => {
    const idx = file.indexOf(filenew);
    file.splice(idx, 1);
    setFile([...file]);
  };

  const success = (data) => {
    onChange &&
      onChange({
        value: data,
      });
  };
  const failed = () => {
    onChange &&
      onChange({
        value: null,
      });
  };

  const handleAction = () => {
    onAction &&
      onAction({
        ...rest,
        success,
        failed,
        data: {
          files: file,
        },
      });
    setFile([]);
  };
  const handleClear = () => {
    setFile([]);
  };

  return (
    <div className={`sq-file-uploader ${className}`}>
      <FileUploader
        disabled={disabled}
        multiple={multiple}
        className="sq-file-uploader__file"
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {file && (
        <div className="sq-file-uploader__list">
          {file.map((file) => {
            return (
              <div
                key={file.name}
                title={file.name}
                className="sq-file-uploader__file-item"
              >
                <div className="sq-file-uploader__file-icon">
                  <Icon name="file" size="small" />
                </div>
                <div className="sq-file-uploader__file-name">
                  {file.name}
                </div>
                <div className="sq-file-uploader__file-delete" onClick={() => handleDelete(file)}>
                  <Icon name="close"  size='small' variant='error' />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {errorMessage && <div className="sq-error">{errorMessage}</div>}
      <Button
        disabled={file.length === 0}
        variant="outlined"
        onClick={handleAction}
        buttonText={uploadButtonText}
      />
      {clearAll && <Button
        disabled={file.length === 0}
        variant="outlined"
        onClick={handleClear}
        buttonText={clearButtonText}
      />}
    </div>
  );
};
SQFileUploader.propTypes = {
  className: PropTypes.string,
  uploadButtonText: PropTypes.string,
  clearButtonText: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  actionOnSelect: PropTypes.bool,
  clearAll: PropTypes.bool,
};

export default SQFileUploader;
