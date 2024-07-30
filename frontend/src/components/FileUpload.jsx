import React, { useRef } from 'react';

const FileUpload = ({ onUpload }) => {


  const handleFileChange = (event) => {
    const file = event.target.files[0];
      onUpload(file);
  
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;

