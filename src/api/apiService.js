import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
   getServices,
   getServicesByUid,
   getServiceIssues,
   getCategories,
   getServicesCount,
   getServiceAllIssues,
   getResolvedIssuesCount,
   getSolvingIssuesCount,
   getAverageTimeToResolveIssues,
   getPublishedIssuesInTheLastWeek,
   getPublishedIssuesCount
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

function getPublishedIssuesCount(categoryIds = []) {
   const queryString = categoryIds.length > 0 ? `?statuses=PUBLISHED&categories=${categoryIds.join(',')}` : '?statuses=PUBLISHED';
   return instance.get(`/issues/count${queryString}`);
}

function getResolvedIssuesCount(categoryIds = []) {
   const queryString = categoryIds.length > 0 ? `?statuses=SOLVED&categories=${categoryIds.join(',')}` : '?statuses=SOLVED';
   return instance.get(`/issues/count${queryString}`);
}

function getSolvingIssuesCount(categoryIds = []) {
   const queryString = categoryIds.length > 0 ? `?statuses=SOLVING&categories=${categoryIds.join(',')}` : '?statuses=SOLVING';
   return instance.get(`/issues/count${queryString}`);
}

function getAverageTimeToResolveIssues(categoryIds = []) {
   const queryString = categoryIds.length > 0 ? `?categories=${categoryIds.join(',')}` : '';
   return instance.get(`/solutions/avg-time${queryString}`);
}

function getPublishedIssuesInTheLastWeek(categoryIds = []) {
   const oneWeekAgo = new Date();
   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
   const fromDate = oneWeekAgo.toISOString().split('T')[0];
   const toDate = new Date().toISOString().split('T')[0];

   const queryString = categoryIds.length > 0 ? `&categories=${categoryIds.join(',')}` : '';
   return instance.get(`/issues/count?statuses=PUBLISHED&from=${fromDate}&to=${toDate}${queryString}`);
}