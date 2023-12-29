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

function getServices() {
   return instance.get('/services');
}
