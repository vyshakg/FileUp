import React from "react";

function FileTypeIcon({ file }) {
  const file_ext = file.split(".");
  return <span className={`fiv-viv fiv-size-lg fiv-icon-${file_ext.pop()}`} />;
}

export default FileTypeIcon;
