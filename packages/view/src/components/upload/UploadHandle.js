import { Icon, notification } from "antd";
import Axios from "axios";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {CustomButton ,DisplayFileList ,FileList ,UploadContainer} from '../../css/uploadPage/UploadPage';
import formatFileSize from "../../utils/formatFileSize";


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
  uploadFiles = file => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, formData)
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false
        });
        console.log(res);
        notification.open({
          duration: 6,
          message: "Upload Successfull",
          description: `Your image ${res.data.original_filename} are successfully added to the Cloud.`,
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
        console.log(err);
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
  onsubmit = () => {
    const { fileList } = this.state;

    this.setState({
      uploading: true
    });
    fileList.forEach(file => {
      this.uploadFiles(file);
    });

    // const config = {
    //   onUploadProgress: progressEvent => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     this.setState({ percentCompleted });
    //   }
    // };
  };
  render() {
    const { uploading, fileList } = this.state;
    const files = this.state.fileList.map(file => {
      return (
        <FileList key={file.name}>
          <Icon
            type="close"
            onClick={() => this.onRemoveHandle(file)}
            className="onHover-effect"
            style={{ float: "right" }}
          />
          <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: "160px" }} />

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

        <DisplayFileList>{files}</DisplayFileList>
        <CustomButton type="primary" onClick={this.onsubmit} disabled={fileList.length === 0} loading={uploading}>
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
