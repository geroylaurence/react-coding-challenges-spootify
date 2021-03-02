import React, { Component } from 'react';
import { connect } from 'react-redux';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

// misc
import { 
  newReleased,
  featuredPlaylists,
  categories,
} from '../../../model/albums';
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
} from '../../../redux/actions/albums';

class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  newReleased() {
    this.props.setNewReleasedLoading();
    newReleased()
    .then(result => {
      this.props.setNewReleasedSuccess(result);
      this.setState({ newReleases: result.albums.items })
    })
    .catch(err=> {
      this.props.setNewReleasedError(err);
    });
  }
  featuredPlaylists() {
    this.props.setFeaturedPlaylistLoading()
    featuredPlaylists()
    .then(result => {
      this.props.setFeaturedPlaylistSuccess(result);
      this.setState({ playlists: result.playlists.items });
    })
    .catch(err => {
      this.props.setFeaturedPlaylistError(err);
    });
  }
  categories() {
    this.props.setCategoriesLoading();
    categories()
    .then(result => {
      this.props.setCategoriesSuccess(result);
      this.setState({ categories: result.categories.items });
    })
    .catch(err => {
      this.props.setCategoriesError(err);
    });
  }

  componentDidUpdate(prevProps) {
    // must fetch first the initial spotify credentials
    if (
      !prevProps.app.spotifyCredentials.authenticated &&
      this.props.app.spotifyCredentials.authenticated
    ) {
      this.newReleased();
    }

    // its time to fetch featured playlist 
    if (
      !prevProps.albums.newReleased.rendered &&
      this.props.albums.newReleased.rendered
    ) {
      this.featuredPlaylists();
    }

    // its time to fetch 
    if (
      !prevProps.albums.featuredPlaylists.rendered &&
      this.props.albums.featuredPlaylists.rendered
    ) {
      this.categories()
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  albums: state.albums,
});
const mapDispatchToProps = dispatch => ({
  setNewReleasedLoading: () => dispatch({ type: ALBUMS_SET_NEW_RELEASED_LOADING }),
  setNewReleasedSuccess: data => dispatch({ type: ALBUMS_SET_NEW_RELEASED_SUCCESS, data }),
  setNewReleasedError: error => dispatch({ type: ALBUMS_SET_NEW_RELEASED_ERROR, error }),

  setFeaturedPlaylistLoading: () => dispatch({ type: ALBUMS_SET_FEATURED_PLAYLIST_LOADING }),
  setFeaturedPlaylistSuccess: data => dispatch({ type: ALBUMS_SET_FEATURED_PLAYLIST_SUCCESS, data }),
  setFeaturedPlaylistError: error => dispatch({ type: ALBUMS_SET_FEATURED_PLAYLIST_ERROR, error }),

  setCategoriesLoading: () => dispatch({ type: ALBUMS_SET_CATEGORIES_LOADING }),
  setCategoriesSuccess: data => dispatch({ type: ALBUMS_SET_CATEGORIES_SUCCESS, data }),
  setCategoriesError: error => dispatch({ type: ALBUMS_SET_CATEGORIES_ERROR, error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
