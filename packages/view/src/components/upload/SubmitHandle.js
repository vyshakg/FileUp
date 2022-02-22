import api from "../../api";
import ErrorNotification from "../notification/ErrorNotification";
import SuccessNotification from "../notification/SuccessNotification";

function SubmitHandle(fileList, setFileList, uploading, setUploading, history) {
  setUploading(true);
  api.user
    .isAuth()
    .then(async res => {
      if (res.data.isLoggedIn) {
        await uploadFiles(fileList,setUploading)
          .then(data => {
            uploadserver(data, setUploading, setFileList, history);
          })
          .catch(() => {
            setUploading(false);
            return ErrorNotification({
              message: "Upload Unsuccessfull",
              description: "Server Error! try after sometime"
            });
          });
      }
    })
    .catch(err => {
      setUploading(false);
      if (!err.response.data.isLoggedIn) {
        ErrorNotification({ description: err.response.data.description });
        history.push("/login");
      } else ErrorNotification();
    });
}

const uploadFiles = (fileList, setUploading) => {
  const data = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    fileList.forEach(file => {
      api.images
        .uploadCloud(file)
        .then(res => {
          const toStore = {
            originalFilename: res.data.original_filename,
            photoId: res.data.public_id,
            size: res.data.bytes
          };
          count++;
          data.push(toStore);
          if (count === fileList.length) {
            resolve(data);
          }
        })
        .catch(() => {
          setUploading(false);
          reject("couldn't upload to cloud");
        });
    });
  });
};

const uploadserver = (data, setUploading, setFileList, history) => {
  api.images
    .upload(data)
    .then(() => {
      SuccessNotification({
        message: "Upload Successfull",
        description: "Your images are successfully added to the Cloud."
      });
      setUploading(false);
      setFileList([]);
    })
    .catch(err => {
      if (!err.response.data.isLoggedIn) {
        ErrorNotification({ description: err.response.data.description });
        history.push("/login");
      } else ErrorNotification();
      setUploading(false);
    });
};
export default SubmitHandle;
