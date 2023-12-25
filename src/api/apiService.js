import axios from 'axios';

let accessToken = null;

export const tokenSetter = {
   setToken
};

export const api = {
   getServices
};

function setToken(token) {
   accessToken = token;
   console.log('[Axios] token is ' + token);
}

const instance = axios.create({
   baseURL: 'https://bettercity.mikita.dev/',
   headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
   }
});

function getServices() {
   return instance.get('/services');
}
