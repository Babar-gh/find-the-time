import { Navigate, Route, RouteProps } from 'react-router-dom';
import * as jwt from 'jwt';

const PrivateRoute: React.VFC<RouteProps> = (props) => {
  if (jwt.checkIfExists()) {
    return <Route {...props} />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
