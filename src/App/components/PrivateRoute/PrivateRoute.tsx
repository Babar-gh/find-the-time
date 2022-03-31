import { Navigate, Outlet } from 'react-router-dom';
import * as jwt from 'jwt';

const PrivateRoute: React.FC = () =>
  jwt.checkIfExists() ? <Outlet /> : <Navigate to="/login" />;

export default PrivateRoute;
