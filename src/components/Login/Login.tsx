import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { fetchAuthToken } from 'store/auth/operations';
import { Redirect } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Login = () => {
  const dispatch = useDispatch();
  let query = useQuery();
  const code = query.get('code');

  useEffect(() => {
    code && dispatch(fetchAuthToken(code));
  }, []);
  return <Redirect to="/" />;
};
export default Login;
