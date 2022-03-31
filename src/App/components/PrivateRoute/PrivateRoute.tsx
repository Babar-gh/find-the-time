import { Navigate, Outlet } from 'react-router-dom';
import * as jwt from 'jwt';
import { AUTH } from 'constants/routes';

const PrivateRoute: React.FC = () =>
  jwt.checkIfExists() ? <Outlet /> : <Navigate to={AUTH.Login} />;

export default PrivateRoute;
