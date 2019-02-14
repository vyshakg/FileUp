import Axios from "axios";

export const images = {
  load: function() {
    return Axios.get("/api/allpics").then(res => {
      return res.data;
    });
  }
};
