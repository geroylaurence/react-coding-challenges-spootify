import config from '../config';

export default () => {
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
};