import { Icon } from "antd";
import Axios from "axios";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router";
import { CustomButton, DisplayFileList, FileList, UploadContainer } from "../../css/upload/Upload";
import formatFileSize from "../../utils/formatFileSize";
import ErrorNotification from "../notification/ErrorNotification";
import SuccessNotification from "../notification/SuccessNotification";
export class UploadPage extends Component {
  state = {
    fileList: [],
    uploading: false,
    toStore: []
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
  uploadFiles = async fileList => {
    let count = 0;
    return new Promise((resolve, reject) => {
      fileList.forEach(file => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, formData)
          .then(res => {
            const toStore = {
              originalFilename: res.data.original_filename,
              photoId: res.data.public_id,
              size: res.data.bytes
            };
            count++;
            this.setState({ toStore: [...this.state.toStore, toStore] });

            if (count === fileList.length) {
              resolve();
            }
          })
          .catch(() => {
            this.setState({
              uploading: false
            });
            reject();
          });
      });
    });
  };
  onsubmit = () => {
    const { fileList } = this.state;

    this.setState({
      uploading: true
    });
    Axios.get("/api/isauth")
      .then(async res => {
        if (res.data.isLoggedIn) {
          await this.uploadFiles(fileList)
            .then(() => {
              this.uploadserver();
            })
            .catch(() =>
              ErrorNotification({ message: "Upload Unsuccessfull", description: "Server Error! try after sometime" })
            );
        }
      })
      .catch(err => {
        if (!err.response.data.isLoggedIn) {
          ErrorNotification({ description: err.response.data.description });
          this.props.history.push("/login");
        } else ErrorNotification();
      });
    this.setState({
      uploading: false,
      fileList: [],
      toStore: []
    });
  };
  uploadserver = () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    Axios.post("/api/upload", { data: this.state.toStore }, config)
      .then(() => {
        SuccessNotification({
          message: "Upload Successfull",
          description: "Your images are successfully added to the Cloud."
        });
      })
      .catch(err => {
        if (!err.response.data.isLoggedIn) {
          ErrorNotification({ description: err.response.data.description });
          this.props.history.push("/login");
        } else ErrorNotification();
      });
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
        <Dropzone onDrop={this.onDrop} accept="image/*">
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

export default withRouter(UploadPage);
