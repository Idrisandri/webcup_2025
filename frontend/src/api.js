import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,        // envoie cookies de session et csrftoken
  xsrfCookieName: 'csrftoken',  // nom du cookie CSRF
  xsrfHeaderName: 'X-CSRFToken' // header attendu par Django
});

export default api;