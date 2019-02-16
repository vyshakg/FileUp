import { Icon } from "antd";
import React from "react";
import { DisplayFileListSC, FileList } from "../../css/upload/Upload";
import formatFileSize from "../../utils/formatFileSize";

function DisplayFileList({ fileList, setFileList }) {
  const onRemoveHandle = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };

  return (
    <DisplayFileListSC>
      {fileList.map(file => {
        return (
          <FileList key={file.name}>
            <Icon
              type="close"
              onClick={() => onRemoveHandle(file)}
              className="onHover-effect"
              style={{ float: "right" }}
            />
            <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: "160px" }} />

            <h4>{file.name}</h4>
            <span>{formatFileSize(file.size)}</span>
          </FileList>
        );
      })}
    </DisplayFileListSC>
  );
}

export default DisplayFileList;
