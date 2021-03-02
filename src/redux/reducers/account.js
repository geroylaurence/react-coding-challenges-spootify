import {
  // signup
  ACCOUNT_SIGNUP_LOADING,
  ACCOUNT_SIGNUP_SUCCESS,
  ACCOUNT_SIGNUP_ERROR,

  ACCOUNT_SIGNIN_LOADING,
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNIN_ERROR,

  ACCOUNT_SET_LOGOUT,
} from '../actions/account';

const initialState = {
  accessToken: null,
  authenticated: false,
  verified: false,
  userData: {
    accessToken: "",
    email: "",
    emailVerification: null,
    registered: false,
    registeredDate: null,
    sessionToken: "",
    userToken: "",
    authenticated: false,
  },
  signup: {
    loading: false,
    data: null,
    error: null,
  },
  signin: {
    loading: false,
    data: null,
    error: null,
  }
};

function accountReducer(state = initialState, action) {
  switch(action.type) {
    case ACCOUNT_SIGNUP_LOADING: 
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: true,
          error: null,
        },
        userData: initialState.userData,
      };
    ;
    case ACCOUNT_SIGNUP_SUCCESS:
      let accountData = action.data;
      if (typeof document !== 'undefined') {
        document.cookie = `accessToken=${accountData.accessToken}; path=/`;
      }

      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          data: accountData,
        },
        userData: {
          accessToken: accountData.accessToken,
          email: accountData.email,
          emailVerification: accountData.emailVerification,
          registered: accountData.registered,
          registeredDate: accountData.registeredDate,
          sessionToken: accountData.sessionToken,
          userToken: accountData.userToken,
          authenticated: true,
        },
        accessToken: accountData.accessToken,
        authenticated: true,
        verified: true,
      };
    ;
    case ACCOUNT_SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          error: action.error,
        },
        userData: initialState.userData,
      };
    ;
    case ACCOUNT_SIGNIN_LOADING: 
      return {
        ...state,
        signin: {
          ...state.signin,
          loading: true,
          error: null,
        }
      }
    ;
    case ACCOUNT_SIGNIN_SUCCESS: {
      let accountData = action.data;
      if (typeof document !== 'undefined') {
        document.cookie = `accessToken=${accountData.accessToken}; path=/;`;
      }

      return {
        ...state,
        signin: {
          ...state.signin,
          loading: false,
          data: accountData,
        },
        userData: {
          accessToken: accountData.accessToken,
          email: accountData.email,
          emailVerification: accountData.emailVerification,
          registered: accountData.registered,
          registeredDate: accountData.registeredDate,
          sessionToken: accountData.sessionToken,
          userToken: accountData.userToken,
          authenticated: true,
        },
        accessToken: accountData.accessToken,
        authenticated: true,
        verified: true,
      }
    };
    case ACCOUNT_SIGNUP_ERROR:
      return {
        ...state,
        signin: {
          ...state.signin,
          loading: false,
          error: action.error
        },
      }
    ;
    case ACCOUNT_SET_LOGOUT:
      document.cookie = `accessToken=; expires=0; path=/;`;
      return initialState;
    ;
    default:
      return state;
  }
}

export default accountReducer;
