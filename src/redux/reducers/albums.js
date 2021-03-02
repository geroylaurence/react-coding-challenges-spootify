import {
  ALBUMS_SET_NEW_RELEASED_LOADING,
  ALBUMS_SET_NEW_RELEASED_SUCCESS,
  ALBUMS_SET_NEW_RELEASED_ERROR,

  ALBUMS_SET_FEATURED_PLAYLIST_LOADING,
  ALBUMS_SET_FEATURED_PLAYLIST_SUCCESS,
  ALBUMS_SET_FEATURED_PLAYLIST_ERROR,

  ALBUMS_SET_CATEGORIES_LOADING,
  ALBUMS_SET_CATEGORIES_SUCCESS,
  ALBUMS_SET_CATEGORIES_ERROR,
} from '../actions/albums';

const initialState = {
  newReleased: {
    rendered: false,
    loading: false,
    data: null,
    error: null,
  },
  featuredPlaylists: {
    rendered: false,
    loading: false,
    data: null,
    error: null,
  },
  categories: {
    rendered: false,
    loading: false,
    data: null,
    error: null,
  }
}

function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case ALBUMS_SET_NEW_RELEASED_LOADING: {
      return {
        ...state,
        newReleased: {
          ...state.newReleased,
          loading: true,
          rendered: false,
          error: null,
        }
      };
    };
    case ALBUMS_SET_NEW_RELEASED_SUCCESS: {
      return {
        ...state,
        newReleased: {
          ...state.newReleased,
          loading: false,
          data: action.data,
          rendered: true,
        }
      };
    }
    case ALBUMS_SET_NEW_RELEASED_ERROR: {
      return {
        ...state,
        newReleased: {
          ...state.newReleased,
          loading: false,
          error: action.error
        }
      };
    };

    case ALBUMS_SET_FEATURED_PLAYLIST_LOADING: {
      return {
        ...state,
        featuredPlaylists: {
          ...state.featuredPlaylists,
          loading: true,
          rendered: false,
          error: null,
        }
      };
    };
    case ALBUMS_SET_FEATURED_PLAYLIST_SUCCESS: {
      return {
        ...state,
        featuredPlaylists: {
          ...state.featuredPlaylists,
          loading: false,
          data: action.data,
          rendered: true,
        }
      };
    };
    case ALBUMS_SET_FEATURED_PLAYLIST_ERROR: {
      return {
        ...state,
        featuredPlaylists: {
          ...state.featuredPlaylists,
          loading: false,
          error: action.error,
        }
      };
    };

    case ALBUMS_SET_CATEGORIES_LOADING: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          rendered: false,
          error: null,
        }
      };
    };
    case ALBUMS_SET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          data: action.data,
          rendered: true,
        }
      };
    };
    case ALBUMS_SET_CATEGORIES_ERROR: {
      return {
        ...state,
        categories: {
          loading: false,
          error: action.error,
        }
      };
    };

    default: 
      return state;
  }
}

export default albumsReducer;
