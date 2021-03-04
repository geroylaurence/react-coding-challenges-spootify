let fetch = require('node-fetch');
import config from '../config';

let makeRequest = (path, requestOpts) => {
  let appSpotify = window.__APP_SPOTIFY__;

  return new Promise((resolve, reject) => {
    let addOptions = {};
    if (requestOpts.method == 'GET') {
      addOptions = { ...addOptions, method: 'GET' };
    }
    if (addOptions.method == 'POST') {
      addOptions = { ...addOptions, method: 'POST', body: JSON.stringify(requestOpts.data) }; 
    }

    fetch(`${path}`, {
      ...addOptions,
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${appSpotify.access_token}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
        .then((data) => {
          return resolve(data);
        }).catch((err) => {
          return resolve({});
        });
      } else {
        return response.text().then((text = 'Unknown error.') => {
          return reject(new Error(text));
        });
      }

    })
    .catch(err => {
      reject(err)
    });
  });
};

function newReleased() {
  return makeRequest(`${config.api.baseUrl}/browse/${config.endpoints.newReleased}`, {
    method: 'GET'
  });
}

test('check the config', () => expect(config).toBeTruthy());

export {
  newReleased
}