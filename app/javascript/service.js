export const API_URL = 'api';

export const getToken = () => document.querySelector("meta[name='csrf-token']").getAttribute('content');
