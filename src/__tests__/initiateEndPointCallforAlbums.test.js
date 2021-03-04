let fetch = require('node-fetch');
import config from '../config';
import makeRequest from '../middleware/makeRequest'
import { newReleased } from '../model/albums';

let initiateClientCredentials = () => {
  let auth = `${config.api.clientId}:${config.api.clientSecret}`;
  let encodedAuth = btoa(auth);
  let initBody = new URLSearchParams();
  initBody.set("grant_type", "client_credentials");

  return new Promise((resolve, reject) => {
    fetch(`${config.api.authUrl}`, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        Authorization: `Basic ${encodedAuth}`
      },
      method: 'POST',
      body: initBody,
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
}

let APP_SPOTIFY = {};
it('call for initial auth token', () => {
  expect.assertions(2);
  return initiateClientCredentials().then(data => {
    APP_SPOTIFY = data;
    window.APP_SPOTIFY = data;
    console.log(data);
    expect(data).toBeTruthy();
    expect(data).toHaveProperty('access_token');
  });
});

