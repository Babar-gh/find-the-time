import { Navigate, Outlet } from 'react-router-dom';
import * as jwt from 'jwt';

const AuthRoute: React.FC = () =>
  jwt.checkIfExists() ? <Navigate to="/" /> : <Outlet />;

export default AuthRoute;
