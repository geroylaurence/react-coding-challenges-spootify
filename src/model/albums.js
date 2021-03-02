import config from '../config';

import makeRequest from '../middleware/makeRequest';

function newReleased() {
  return makeRequest(`${config.api.baseUrl}/browse/${config.endpoints.newReleased}`, {
    method: 'GET'
  });
}

function featuredPlaylists() {
  return makeRequest(`${config.api.baseUrl}/browse/${config.endpoints.featuredPlaylists}`, {
    method: 'GET'
  });
}

function categories() {
  return makeRequest(`${config.api.baseUrl}/browse/${config.endpoints.categories}`, {
    method: 'GET'
  });
}

export {
  newReleased,
  featuredPlaylists,
  categories,
}