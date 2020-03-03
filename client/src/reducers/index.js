import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import article from './article';
import post from './post';
import boxer from './boxer';
import event from './event';
import bout from './bout';

export default combineReducers({
  alert,
  auth,
  bout,
  profile,
  article,
  post,
  boxer,
  event
});
