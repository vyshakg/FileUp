import Axios from "axios";

export const images = {
  load: function() {
    return Axios.get("/api/allpics").then(res => {
      return res.data;
    });
  },
  delete: function(id) {
    return Axios.post("/api/delete", id).then(res => {
      console.log(res.data);
      return res.data;
    });
  }
};
