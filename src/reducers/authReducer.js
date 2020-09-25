import { toast } from 'react-toastify';

const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SIGN_UP':
      toast.success(`${payload} you have been succefully signed up!`);
      return state;
    case 'SIGN_UP_ERROR':
      toast.error(`${payload.name}: ${payload.err.message}`);
      return state;
    case 'SIGN_OUT':
      toast.info(`${payload} you have been succefully signed out!`);
      return state;
    case 'SIGN_OUT_ERROR':
      toast.error(`${payload.name} something wrong with signing out :(`);
      return state;
      console.log(payload.err);
    case 'SIGN_IN':
      toast.info(`Welcome back! :)`);
      return state;
    case 'SIGN_IN_ERROR':
      toast.error(payload.message);
      return state;
    default:
      return state;
  }
};

export default authReducer;
