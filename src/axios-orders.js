import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-aade8.firebaseio.com/'
});

export default instance;