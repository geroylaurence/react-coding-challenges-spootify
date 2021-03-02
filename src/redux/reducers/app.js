import { 
  APP_SET_TITLE,
  APP_SET_SPOTIFY_CREDENTIALS_LOADING,
  APP_SET_SPOTIFY_CREDENTIALS_SUCCESS,
  APP_SET_SPOTIFY_CREDENTIALS_ERROR
} from '../actions/app';

const initialState = {
  title: 'React Universal',
  spotifyCredentials: {
    authenticated: false,
    loading: false,
    data: {
      "access_token": "",
      "token_type": "",
      "expires_in": "",
    },
    error: null,
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_SET_TITLE:
      return {
        ...state,
        title: action.data
      };
    case APP_SET_SPOTIFY_CREDENTIALS_LOADING: {
      return {
        ...state,
        spotifyCredentials: {
          ...state.spotifyCredentials,
          loading: true,
          error: null,
        }
      };
    }
    case APP_SET_SPOTIFY_CREDENTIALS_SUCCESS: {
      if (typeof window.__APP_SPOTIFY__ !== 'undefined') {
        window.__APP_SPOTIFY__ = action.data;
      }
      
      return {
        ...state,
        spotifyCredentials: {
          ...state.spotifyCredentials,
          loading: false,
          data: action.data,
          authenticated: true,
        }
      };
    }
    case APP_SET_SPOTIFY_CREDENTIALS_ERROR: {
      return {
        ...state,
        spotifyCredentials: {
          ...state.spotifyCredentials,
          loading: false,
          error: action.error,
        }
      };
    }
    default:
      return state;
  }
}

export default appReducer;
