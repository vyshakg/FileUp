import Axios from "axios";
const HOST_URL = process.env.REACT_APP_HOST_URL
Axios.defaults.withCredentials = true;

export const user = {
  login: function(credentials) {
    return Axios.post(`${HOST_URL}/api/login`, credentials).then(res => res.data);
    // .catch(err => err.response.data);
  },
  isAuth: function() {
    return Axios.get(`${HOST_URL}/api/isauth`);
  },
  register: function(credentials) {
    return Axios.post(`${HOST_URL}/api/register`, credentials).then(res => res.data);
    // .catch(err => err.response.data);
  },
  logout: () => {
    return Axios.post(`${HOST_URL}/api/logout`)
      .then(res => res.data)
      .catch(err => err.response.data);
  }
};
