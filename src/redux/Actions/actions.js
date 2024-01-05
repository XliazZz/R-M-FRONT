import * as types from "../Action-types/actions-types";
import axios from 'axios';

const token = localStorage.getItem('token');
const URL = 'https://rickandmortyback.adaptable.app/';


export const postFavoriteCharacterRequest = () => ({
    type: types.POST_FAVORITE_REQUEST,
});
export const postFavoriteCharacterSuccess = (character) => ({
    type: types.POST_FAVORITE_SUCCESS,
    payload: character,
});
export const postFavoriteCharacterError = (error) => ({
    type: types.POST_FAVORITE_ERROR,
    payload: error,
});
export const postFavorite = (character) => {
  return async (dispatch) => {
    dispatch(postFavoriteCharacterRequest());
    const endpoint = `${URL}/fav`;
    try {
      const { data } = await axios.post(endpoint, { character, token }); 
      dispatch(postFavoriteCharacterSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      dispatch(postFavoriteCharacterError(errorMessage));
    }
  };
};

export const removeFavRequest = () => ({
  type: types.REMOVE_FAV_REQUEST,
});
export const removeFavSuccess = (id) => ({
  type: types.REMOVE_FAV_SUCCESS,
  payload: id,
});
export const removeFavError = (error) => ({
  type: types.REMOVE_FAV_ERROR,
  payload: error,
});
export const removeFav = (id) => {
  return async (dispatch) => {
    dispatch(removeFavRequest());
    const endpoint = `${URL}/fav/${id}`;
    try {
      const { data } = await axios.delete(endpoint, { data: { token } });
      dispatch(removeFavSuccess(data));
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      dispatch(removeFavError(errorMessage));
    }
  };
}


export const orderCards = (orden) => {
  return { type: types.ORDER, payload: orden }
};


// Characters
export const request = () => ({
  type: types.REQUEST,
});

export const success = (characters) => ({
  type: types.SUCCESS,
  payload: characters,
});

export const errorRequest = (error) => ({
  type: types.ERRORREQUEST,
  payload: error,
});

export const getAllCharacters = () => {
  return async (dispatch) => {
  dispatch(request());
    
  try {
    const response = await axios.get(`${URL}/characters`);
    const characters = response.data;
    dispatch(success(characters));
  } catch (error) {
      const errorMessage = error.message;
      dispatch(errorRequest(errorMessage));
    };
  };
};


//Paginate
export function setPage(pageNumber){
  return{
    type: types.SET_PAGE,
    payload: pageNumber
  };
};


//SearchBar
export const searchCharacterRequest = () => {
  return {
    type: types.SEARCH_CHARACTER,
  };
};

export const searchCharacterSuccess = (name) => {
  return {
    type: types.SEARCH_CHARACTER_SUCCESS,
    payload: name,
  };
}

export const searchCharacterError = (error) => {
  return {
    type: types.SEARCH_CHARACTER_ERROR,
    payload: error,
  };
}

export const searchCharacter = (name) => async (dispatch, getState) => {
  const { searchResults } = getState();
  const existingCharacter = searchResults.find((character) => character.name === name);

  try {
    dispatch(searchCharacterRequest()); 
    const response = await axios.get(`https://rickandmortyback.adaptable.app/character?name=${name}`);
    const data = response.data;
    dispatch(searchCharacterSuccess(data)); 
  } catch (error) {
    dispatch(searchCharacterError(error.response.data)); 
  }
};



//OnClose
export const removeCard = (id) => {
  return { type: types.REMOVE_CARD, payload: id };
};

//Filter
export const filterGender = (gender) => {
  return { type: types.FILTER, payload: gender };
};

//ContactFomr
export const addMessage = (name, email, message) => {
  return { type: types.ADD_MESSAGE, payload: { name, email, message } };
};

//Register
export const registerRequest = () => {
  return {
    type: types.REGISTER_REQUEST,
  };
};

export const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFailure = (error) => {
  return {
    type: types.REGISTER_FAILURE,
    payload: error,
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());
      const endpoint = `${URL}/api/signup`;
      const response = await axios.post(endpoint, userData);
      dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error.response.data.error));
    }
  };
};

//Resett register
export const resetRegister = () => {
  return {
    type: types.RESET_REGISTER,
  };
};

// Episodes

export const getEpisodesRequest = () => {
  return {
    type: types.GET_EPISODES_REQUEST,
  };
};
//aca estan los personajes del comp Characters
export const getEpisodesSuccess = (episodes) => {
  return {
    type: types.GET_EPISODES_SUCCESS,
    payload: episodes,
  };
};

export const getEpisodesError = (error) => {
  return {
    type: types.GET_EPISODES_ERROR,
    payload: error,
  };
};

export const getEpisode = (episodes) => {
  return async (dispatch) => {
    try {
      dispatch(getEpisodesRequest());
      const endpoint = `${URL}/episodes`;
      const response = await axios.get(endpoint, episodes);
      dispatch(getEpisodesSuccess(response.data));
    } catch (error) {
      dispatch(getEpisodesError(error.response));
    }
  };
};

//Get random characters
export const getRandomCharactersRequest = () => {
  return {
    type: types.GET_RANDOM_CHARACTERS_REQUEST,
  };
};
export const getRandomCharactersSuccess = (characters) => {
  return {
    type: types.GET_RANDOM_CHARACTERS_SUCCESS,
    payload: characters,
  };
};
export const getRandomCharactersError = (error) => {
  return {
    type: types.GET_RANDOM_CHARACTERS_ERROR,
    payload: error,
  };
};
export const getRandomCharacters = () => {
  return async (dispatch) => {
    try {
      dispatch(getRandomCharactersRequest());
      const endpoint = `${URL}/random`;
      const response = await axios.get(endpoint);
      dispatch(getRandomCharactersSuccess(response.data));
    } catch (error) {
      dispatch(getRandomCharactersError(error.response));
    }
  };
};

export const clearRandomCharacters = () => {
  return {
    type: types.CLEAR_RANDOM_CHARACTERS,
  };
};


//Get favorite
export const getFavoriteRequest = () => {
  return {
    type: types.GET_FAVORITE_REQUEST,
  };
};
export const getFavoriteSuccess = (characters) => {
  return {
    type: types.GET_FAVORITE_SUCCESS,
    payload: characters,
  };
};
export const getFavoriteError = (error) => {
  return {
    type: types.GET_FAVORITE_ERROR,
    payload: error,
  };
};
export const getFavorite = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
      dispatch(getFavoriteRequest());
      const endpoint = `${URL}/fav`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      dispatch(getFavoriteSuccess(response.data));
    } catch (error) {
      dispatch(getFavoriteError(error.response));
    }
  };
};

export const clearFavoriteStatus = () => {
  return {
    type: types.CLEAR_FAVORITE_STATUS,
  };
};