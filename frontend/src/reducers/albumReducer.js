import albumService from "../services/albumService";

export const initializeAlbum = (url) => {
  return async (dispatch) => {
    const album = await albumService.getAll(url);
    dispatch({
      type: "SET_ALBUM",
      data: album,
    });
  };
};

const albumReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default albumReducer;
