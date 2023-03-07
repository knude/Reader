import imageService from "../services/imageService";

export const initializeImages = (url) => {
  return async (dispatch) => {
    const album = await imageService.getAll(url);
    dispatch({
      type: "SET_ALBUM",
      data: album,
    });
  };
};

const imageReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default imageReducer;
