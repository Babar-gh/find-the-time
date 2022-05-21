import { Component, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PRIVATE } from 'constants/routes';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  state: IState = { hasError: false };

  static getDerivedStateFromError(_: Error): IState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <Navigate to={PRIVATE.Error} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
