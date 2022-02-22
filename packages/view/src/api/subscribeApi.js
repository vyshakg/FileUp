import Axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL
export const subscribe = {
  upgrade: function(data) {
    return Axios.post(`${HOST_URL}/api/upgrade`, { ...data }).then(res => res.data);
  },
  cancelUpgarde: function() {
    return Axios.post(`${HOST_URL}/api/cancelUpgarde`).then(res => {
      return res.data;
    });
  }
};