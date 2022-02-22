import Axios from "axios";
const HOST_URL = process.env.REACT_APP_HOST_URL;

export const images = {
  upload: function(data) {
    return Axios.post(`${HOST_URL}/api/upload`, { data });
  },
  uploadCloud: function(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    return Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, formData , {withCredentials : false});
  },
  load: function() {
    return Axios.get(`${HOST_URL}/api/allpics`).then(res => {
      return res.data;
    });
  },
  delete: function(id) {
    return Axios.post(`${HOST_URL}/api/delete`, id).then(res => {
      return res.data;
    });
  },
  favourite: function(id) {
    return Axios.post(`${HOST_URL}/api/favourite`, id).then(res => {
      return res.data;
    });
  }
};
