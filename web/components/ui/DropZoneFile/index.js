import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'react-mui-dropzone';

import './drop-zone-file.scss';

const DropZoneFile = ({
  className = '',
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
  onAction,
  uploadButtonText = 'Upload',
  ...rest
}) => {
  const [file, setFile] = useState([]);
  const handleChange = (filenew) => {
    setFile(filenew);
  };

  // const handleAction = () => {
  //   onAction &&
  //     onAction({
  //       ...rest,
  //       data: {
  //         files: file,
  //       },
  //     });
  //   setFile([]);
  // };

  return (
    <div className={`sq-drop-zone-file ${className}`}>
      <DropzoneArea onChange={handleChange} />
    </div>
  );
};
DropZoneFile.propTypes = {
  className: PropTypes.string,
};

export default DropZoneFile;
