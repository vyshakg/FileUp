import { Icon } from "antd";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router";
import { CustomButton, UploadContainer } from "../../css/upload/Upload";
import DisplayFileList from "./DisplayFileList";
import onSubmitHandle from "./onSubmitHandle";

function UploadPage() {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = acceptedFiles => {
    if (fileList === []) {
      setFileList(acceptedFiles);
    } else {
      setFileList([...fileList, ...acceptedFiles]);
    }
  };

  return (
    <>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
          return (
            <UploadContainer isDragActive={isDragActive} isDragReject={isDragReject} {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="custom-upload-text">Drop Images here...</p>
              ) : (
                <>
                  <p className="custom-upload-text">
                    Drag a images here or <span className="upload-tag">browse</span> for a image to upload
                  </p>
                </>
              )}
            </UploadContainer>
          );
        }}
      </Dropzone>

      <DisplayFileList fileList={fileList} setFileList={setFileList} />

      <CustomButton
        type="primary"
        onClick={() => onSubmitHandle(fileList, setFileList, uploading, setUploading)}
        disabled={fileList.length === 0}
        loading={uploading}
      >
        {uploading ? (
          <>
            <Icon
              type="loading"
              style={{
                marginRight: "1rem"
              }}
            />
            Uploading
          </>
        ) : (
          "Upload"
        )}
      </CustomButton>
    </>
  );
}

export default withRouter(UploadPage);
