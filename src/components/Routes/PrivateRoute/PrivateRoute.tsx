import AppLayout from 'components/Layout';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getAccessToken } from 'store/auth/selectors';

const PrivateRoute = ({
  component: Component = ({ children }: RouteProps) => <>{children}</>,
  ...rest
}) => {
  const isAuthenticated = useSelector(getAccessToken);

  return (
    <Route
      {...rest}
      render={(props) => 
        isAuthenticated ?(
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      ): <Redirect
      to={{
        pathname: '/403',
        state: { from: props.location },
      }}
    />}
    />
  );
};

export default PrivateRoute;
