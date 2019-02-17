import Axios from "axios";

export const images = {
  upload: function(data) {
    return Axios.post("/api/upload", { data });
  },
  uploadCloud: function(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    return Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`, formData);
  },
  load: function() {
    return Axios.get("/api/allpics").then(res => {
      return res.data;
    });
  },
  delete: function(id) {
    return Axios.post("/api/delete", id).then(res => {
      return res.data;
    });
  },
  favourite: function(id) {
    return Axios.post("/api/favourite", id).then(res => {
      return res.data;
    });
  }
};
