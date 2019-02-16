import { DELETE_IMAGE, LOAD_IMAGES } from "../utils/types";

export default function Images(state = [], action = {}) {
  switch (action.type) {
    case LOAD_IMAGES:
      return action.payload;
    case DELETE_IMAGE:
      return state.filter(img => {
        if (!(img.id === action.payload.id)) return true;
        else return false;
      });

    default:
      return state;
  }
}

export const loadImages = res => ({
  type: LOAD_IMAGES,
  payload: res
});

export const deletePhotoReducer = res => ({
  type: DELETE_IMAGE,
  payload: res
});
