import api from "../api";
import { loadImages } from "../Redux-reducers/Images";

export const load = () => dispatch => {
  return api.images.load().then(res => {
    dispatch(loadImages(res));
  });
};
