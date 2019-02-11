import Axios from "axios";

export const user = {
  login: function(credentials) {
    return Axios.post("/api/login", credentials).then(res => res.data);
    // .catch(err => err.response.data);
  },
  register: function(credentials) {
    return Axios.post("/api/register", credentials).then(res => res.data);
    // .catch(err => err.response.data);
  },
  logout: () => {
    return Axios.post("/api/logout")
      .then(res => res.data)
      .catch(err => err.response.data);
  }
};
