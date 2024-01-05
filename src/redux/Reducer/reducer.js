import {
	FILTER, ORDER, SUCCESS, ERRORREQUEST, REQUEST, SEARCH_CHARACTER, SEARCH_CHARACTER_SUCCESS, SEARCH_CHARACTER_ERROR, REMOVE_CARD, ADD_MESSAGE, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILURE, POST_FAVORITE_REQUEST, POST_FAVORITE_SUCCESS, POST_FAVORITE_ERROR, RESET_REGISTER, GET_EPISODES_REQUEST, GET_EPISODES_SUCCESS, GET_EPISODES_ERROR,
	GET_RANDOM_CHARACTERS_REQUEST, GET_RANDOM_CHARACTERS_SUCCESS, GET_RANDOM_CHARACTERS_ERROR,
	CLEAR_RANDOM_CHARACTERS,
	GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS, GET_FAVORITE_ERROR,
	CLEAR_FAVORITE_STATUS,
	REMOVE_FAV_REQUEST, REMOVE_FAV_SUCCESS, REMOVE_FAV_ERROR
} from "../Action-types/actions-types"

const initialState = {
	loadingPostFavorite: false,
	errorPostFavorite: null,
	successPostFavorite: false,

	loadingDeleteFavorite: false,
	errorDeleteFavorite: null,
	successDeleteFavorite: false,

	characters: [],
	currentPage: 1,
	itemsPerPage: 20,
	totalPages: 1,
	searchResults: [],
	messages: [],
	episodes: [],

	loadingGetRandomCharacters: false,
	errorGetRandomCharacters: null,
	successGetRandomCharacters: false,
	randomCharacters: [],

	loadingGetFavorite: false,
	errorGetFavorite: null,
	successGetFavorite: false,
	myFavorites: [],
};

const rootReducer = (state = initialState, action) => {
	switch(action.type){
		case POST_FAVORITE_REQUEST:
			return{
				...state,
				loadingPostFavorite: true,
				errorPostFavorite: false,
				successPostFavorite: false,
			};
		case POST_FAVORITE_SUCCESS:
			return{
				...state,
				loadingPostFavorite: false,
				errorPostFavorite: false,
				successPostFavorite: true,
			};
		case POST_FAVORITE_ERROR:
			return{
				...state,
				loadingPostFavorite: false,
				errorPostFavorite: action.payload,
				successPostFavorite: false,
			};

		case FILTER:
			const allCharactersFiltered = state.allCharactersFav.filter(character => character.gender === action.payload)
			return {
				...state,
				myFavorites:
					action.payload === 'allCharacters'
					? [...state.allCharactersFav]
					: allCharactersFiltered
				}

		case ORDER:
			const copyAllCharacters = [...state.allCharactersFav];
			return{
				...state,
				myFavorites: action.payload === "A" ? copyAllCharacters.sort((a, b) => a.id - b.id)
				: copyAllCharacters.sort((a,b) => b.id - a.id)
			};

		case REQUEST:
			return{
				...state,
				loading: { ...state.loading, getCharacters: true }
			};

		case SUCCESS:
			return{
				...state,
				success: { ...state.success, getCharacters: true },
				characters: action.payload,
			};

		case ERRORREQUEST:
			return{
				...state,
				error: { ...state.error, getCharacters: action.payload }
			};

		case REMOVE_CARD:
			return{
				...state,
				searchResults: state.searchResults.filter((char) => char.id !== action.payload )
			};

		case SEARCH_CHARACTER:
			return{
				...state,
				loading: true
			};

		case SEARCH_CHARACTER_SUCCESS:
			return{
				...state,
				success:  true ,
				searchResults: [...state.searchResults, action.payload],
			};

		case SEARCH_CHARACTER_ERROR:
			return{
				...state,
				error: action.payload
			};


		case ADD_MESSAGE:
			return{
				...state,
				messages: [...state.messages, action.payload, alert("se pudo")]
			};


		case REGISTER_REQUEST:
			return{
				...state,
				loading: true
			};
		case REGISTER_SUCCESS:
			return{
				...state,
				success: true,
			}
		case REGISTER_FAILURE:
			return{
				...state,
				error: action.payload
			}

		case RESET_REGISTER:
			return{
				...state,
				loading:false,
				success: false,
				error: false
			};


		case GET_EPISODES_REQUEST:
			return{
				...state,
				loading: true
			};
		case GET_EPISODES_SUCCESS:
			return{
				...state,
				success: true,
				episodes: action.payload
			};
		case GET_EPISODES_ERROR:
			return{
				...state,
				error: action.payload
			}

		
		case GET_RANDOM_CHARACTERS_REQUEST:
			return{
				...state,
				loadingGetRandomCharacters: true,
				successGetRandomCharacters: false,
				errorGetRandomCharacters: false,
			};
		case GET_RANDOM_CHARACTERS_SUCCESS:
			return{
				...state,
				loadingGetRandomCharacters: false,
				successGetRandomCharacters: true,
				randomCharacters: action.payload
			};
		case GET_RANDOM_CHARACTERS_ERROR:
			return{
				...state,
				loadingGetRandomCharacters: false,
				errorGetRandomCharacters: action.payload,
				successGetRandomCharacters: false,
			};

		case CLEAR_RANDOM_CHARACTERS:
			return{
				...state,
				randomCharacters: [],
				loadingGetRandomCharacters: false,
				errorGetRandomCharacters: false,
				successGetRandomCharacters: false,

				loadingGetFavorite: false,
				errorGetFavorite: false,
				successGetFavorite: false,
			};

		
		case GET_FAVORITE_REQUEST:
			return{
				...state,
				loadingGetFavorite: true,
				successGetFavorite: false,
				errorGetFavorite: false,
			};
		case GET_FAVORITE_SUCCESS:
			return{
				...state,
				loadingGetFavorite: false,
				successGetFavorite: true,
				errorGetFavorite: false,
				myFavorites: action.payload
			};
		case GET_FAVORITE_ERROR:
			return{
				...state,
				loadingGetFavorite: false,
				errorGetFavorite: action.payload,
				successGetFavorite: false,
			};
		
		case CLEAR_FAVORITE_STATUS:
			return{
				...state,
				loadingGetFavorite: false,
				errorGetFavorite: false,
				successGetFavorite: false,

				loadingPostFavorite: false,
				errorPostFavorite: false,
				successPostFavorite: false,

				loadingDeleteFavorite: false,
				errorDeleteFavorite: false,
				successDeleteFavorite: false,
			};

		case REMOVE_FAV_REQUEST:
			return{
				...state,
				loadingDeleteFavorite: true,
				errorDeleteFavorite: false,
				successDeleteFavorite: false,
			};
		case REMOVE_FAV_SUCCESS:
			return{
				...state,
				loadingDeleteFavorite: false,
				errorDeleteFavorite: false,
				successDeleteFavorite: true,
			};
		case REMOVE_FAV_ERROR:
			return{
				...state,
				loadingDeleteFavorite: false,
				errorDeleteFavorite: action.payload,
				successDeleteFavorite: false,
			};


		default:
			return{...state};
	};
};

export default rootReducer;