import { Icon, notification } from "antd";
import Axios from "axios";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {
  CustomButton,
  DisplayFileList,
  FileList,
  UploadContainer
} from "../../layouts";
import formatFileSize from "../../utils/formatFileSize";
import FileTypeIcon from "./FileTypeIcon";

export class UploadPage extends Component {
  state = {
    fileList: [],
    uploading: false
  };

  onRemoveHandle = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    });
  };
  onDrop = acceptedFiles => {
    if (this.state.fileList === []) {
      this.setState({ fileList: acceptedFiles });
    } else {
      this.setState({ fileList: [...this.state.fileList, ...acceptedFiles] });
    }
  };

  onsubmit = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files", file);
    });

    this.setState({
      uploading: true
    });

    // const config = {
    //   onUploadProgress: progressEvent => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     this.setState({ percentCompleted });
    //   }
    // };
    Axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    Axios.post("/api/upload", formData)
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false
        });

        notification.open({
          duration: 6,
          message: "Upload Successfull",
          description: "Your files are successfully added to the Cloud.",
          icon: (
            <Icon
              type="smile"
              style={{
                color: "#52c41a",
                fontSize: "2rem"
              }}
            />
          )
        });
      })
      .catch(err => {
        this.setState({
          uploading: false
        });

        notification.open({
          message: "Upload Unsuccessfull",
          description: "Server Error! try after sometime",
          icon: (
            <Icon
              type="frown"
              style={{
                color: "#f5232e",
                fontSize: "2rem"
              }}
            />
          )
        });
      });
  };
  render() {
    const { uploading, fileList } = this.state;
    const files = this.state.fileList.map(file => {
      return (
        <FileList key={file.name}>
          <FileTypeIcon file={file.name} />
          <Icon
            type="close"
            onClick={() => this.onRemoveHandle(file)}
            className="onHover-effect"
            style={{ float: "right" }}
          />
          <h4>{file.name}</h4>
          <span>{formatFileSize(file.size)}</span>
        </FileList>
      );
    });
    return (
      <>
        <Dropzone onDrop={this.onDrop} className="hello">
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
            return (
              <UploadContainer
                isDragActive={isDragActive}
                isDragReject={isDragReject}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="custom-upload-text">Drop files here...</p>
                ) : (
                  <>
                    <p className="custom-upload-text">
                      Drag a file here or{" "}
                      <span className="upload-tag">browse</span> for a file to
                      upload
                    </p>
                  </>
                )}
              </UploadContainer>
            );
          }}
        </Dropzone>

        <DisplayFileList>{files}</DisplayFileList>
        <CustomButton
          type="primary"
          onClick={this.onsubmit}
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
}

export default UploadPage;
