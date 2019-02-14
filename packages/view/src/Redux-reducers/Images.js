import { LOAD_IMAGES } from "../utils/types";

export default function Images(state = [], action = {}) {
  switch (action.type) {
    case LOAD_IMAGES:
      return action.payload;
    default:
      return state;
  }
}

export const loadImages = res => ({
  type: LOAD_IMAGES,
  payload: res
});
