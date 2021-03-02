import appReducer from './app';
import accountReducer from './account';
import albumsReducer from './albums';

function stateForKey(state, key) {
  if (state) {
    return state[key];
  }

  return undefined;
}

export default (state, action) => {
  let s = state;

  if (action.type === 'ACCOUNT_SET_LOGOUT') {
    s = undefined;
  }

  return {
    app: appReducer(stateForKey(state, 'app'), action),
    account: accountReducer(stateForKey(s, 'account'), action),
    albums: albumsReducer(stateForKey(s, 'albums'),action),
  };
};
