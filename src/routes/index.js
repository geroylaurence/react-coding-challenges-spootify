import React from 'react';
import { connect } from 'react-redux';
import Discover from './Discover';

// misc
import initSpotifyCredentials from '../middleware/initiateClientCredentials'; 
import {
  APP_SET_SPOTIFY_CREDENTIALS_LOADING,
  APP_SET_SPOTIFY_CREDENTIALS_SUCCESS,
  APP_SET_SPOTIFY_CREDENTIALS_ERROR,
} from '../redux/actions/app';

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  initSpotifyCredentials() {
    this.props.setSpotifyCredentialsLoading();
    initSpotifyCredentials()
    .then(result => this.props.setSpotifyCredentialsSuccess(result))
    .catch(err => this.props.setSpotifyCredentialsError(err));
  }
  componentDidMount() {
    if (!this.props.app.spotifyCredentials.loading) {
      this.initSpotifyCredentials();
    }
  }
  render() {
    return (
      <Discover />
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});
const mapDispatchToProps = dispatch => ({
  setSpotifyCredentialsLoading: () => dispatch({ type: APP_SET_SPOTIFY_CREDENTIALS_LOADING }),
  setSpotifyCredentialsSuccess: data => dispatch({ type: APP_SET_SPOTIFY_CREDENTIALS_SUCCESS, data }),
  setSpotifyCredentialsError: error => dispatch({ type: APP_SET_SPOTIFY_CREDENTIALS_ERROR, error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes)