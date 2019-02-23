import Axios from "axios";

export const subscribe = {
  upgrade: function(data) {
    return Axios.post("/api/upgrade", { ...data }).then(res => res.data);
  },
  cancelUpgarde: function() {
    return Axios.post("/api/cancelUpgarde").then(res => {
      return res.data;
    });
  }
};
