import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import Button from '../Button';
import Tooltip from '@mui/material/Tooltip';
import Icon from '../../Icon';

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
  uploadOnChange = false,
  onChange,
  value,
  ...rest
}) => {
  const [file, setFile] = useState([]);
  const handleChange = async (filenew) => {
    const takeOne = multiple ? filenew : [filenew];
    let listToBeAdded = [].filter.call(takeOne, (i) => file.filter((d)=>d.name === i.name).length === 0);  
    if (listToBeAdded.length > 0) {
      const newFiles = [...(multiple ? file : []), ...(listToBeAdded)];
      await setFile(newFiles);
      uploadOnChange && handleAction({files: newFiles});
    }
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

  const handleAction = (obj) => {
    onAction &&
      onAction({}, {
        ...rest,
        success,
        failed,
        data: {
          files: (obj && obj.files) || file,
        },
      });
    setFile([]);
  };
  const handleClear = () => {
    setFile([]);
  };

  return (
    <div className={`sq-file-uploader ${className}`}>
      <Tooltip title={fileTypes.join(', ').toLowerCase()}>
        <span>
          <FileUploader
            disabled={disabled}
            multiple={multiple}
            fileOrFiles={file.length ? null : file}
            className="sq-file-uploader__file"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </span>
      </Tooltip>
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
      {!uploadOnChange && <Button
        disabled={file.length === 0}
        variant="outlined"
        onClick={handleAction}
        buttonText={uploadButtonText}
      />}
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
