import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
   getServices
};

const instance = axios.create({
   baseURL: 'https://bettercity.mikita.dev/api/v1',
   headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`
   }
});

instance.interceptors.request.use(config => {
   config.headers.Authorization = `Bearer ${accessToken}`;
   return config;
})

function getServices() {
   return instance.get('/services');
}
