import { Navigate, Route, RouteProps } from 'react-router-dom';
import * as jwt from 'jwt';

const PrivateRoute: React.VFC<RouteProps> = (props) => {
  return jwt.checkIfExists() ? (
    <Route {...props} />
  ) : (
    <Navigate to={'/login'} />
  );
};

export default PrivateRoute;
