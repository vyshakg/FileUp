import api from "../api";
import { deletePhotoReducer, loadImages } from "../Redux-reducers/Images";

export const load = () => dispatch => {
  return api.images.load().then(res => {
    dispatch(loadImages(res));
  });
};
export const deletePhoto = id => dispatch => {
  console.log(id);
  return api.images.delete(id).then(res => {
    dispatch(deletePhotoReducer(res));
  });
};
