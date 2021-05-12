import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeAuthToken } from 'store/auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(removeAuthToken());
  return <Redirect to="/" />;
};
export default Logout;
