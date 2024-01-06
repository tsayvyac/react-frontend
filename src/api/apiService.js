import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
   getServices,
   getServicesByUid,
   getServiceIssues,
   getCategories,
   getServicesCount,
   getServiceAllIssues
};

const instance = axios.create({
   baseURL: 'https://bettercity.mikita.dev/api/v1',
   headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`
   }
});

function getServices(page) {
   return instance.get(`/services?page=${page}`);
}

function getServicesByUid(uid) {
   return instance.get(`/services/${uid}`);
}

function getServiceIssues(uid, status, order_by) {
   return instance.get(`/issues/service/${uid}?statuses=${status}&order-by=${order_by}`);
}

function getServiceAllIssues(uid, order_by) {
   return instance.get(`/issues/service/${uid}?order-by=${order_by}`);
}

function getCategories() {
   return instance.get('/categories');
}

function getServicesCount() {
   return instance.get('/services/count');
}
