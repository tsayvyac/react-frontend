import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
   getServices,
   getServicesByUid,
   getServiceIssues,
   getCategories,
   getServicesCount
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

function getServicesByUid(uid) {
   return instance.get(`/services/${uid}`);
}

function getServiceIssues(uid) {
   return instance.get(`/issues/service/${uid}`);
}

function getCategories() {
   return instance.get('/categories');
}

function getServicesCount() {
   return instance.get('/services/count');
}
