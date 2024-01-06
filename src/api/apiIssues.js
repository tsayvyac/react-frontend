import axios from 'axios';
import Cookies from 'js-cookie';

export const api = {
   getIssues,
   getIssuesByUid,
   getCategories,
   getPhoto
};

const instance = axios.create({
   baseURL: 'https://bettercity.mikita.dev/api/v1',
   headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`
   }
});

function getIssues() {
   return instance.get('/issues');
}

function getIssuesByUid(uid) {
   return instance.get(`/issues/${uid}`);
}

function getCategories() {
   return instance.get(`/categories`);
}

function getPhoto(url) {
   return instance.get(url + '?alt=media', { responseType: 'blob' });
}
