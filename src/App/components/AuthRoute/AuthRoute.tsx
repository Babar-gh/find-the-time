import { Navigate, Route, RouteProps } from 'react-router-dom';
import * as jwt from 'jwt';

const AuthRoute: React.VFC<RouteProps> = (props) => {
  return jwt.checkIfExists() ? <Navigate to={'/'} /> : <Route {...props} />;
};

export default AuthRoute;
