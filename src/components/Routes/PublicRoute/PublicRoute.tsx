import AppLayout from 'components/Layout';
import { Route, RouteProps } from 'react-router-dom';

const PublicRoute = ({
  component: Component = ({ children }: RouteProps) => <>{children}</>,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      )}
    />
  );
};

export default PublicRoute;
