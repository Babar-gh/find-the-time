import { Navigate, Route, RouteProps } from 'react-router-dom';
import * as jwt from 'jwt';

const AuthRoute: React.VFC<RouteProps> = (props) => {
  if (jwt.checkIfExists()) {
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
};

export default AuthRoute;
