import { Navigate, useLocation } from 'react-router-dom';
import AuthShell from './AuthShell';
import LoginForm from '../components/forms/LoginForm';
import useAuth from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROLE_HOME } from '../utils/constants';

export default function Login() {
  const { user } = useAuth();
  const location = useLocation();
  useDocumentTitle('Sign In');
  // Already signed in: go to the right dashboard instead of showing the form again.
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />;
  return (
    <AuthShell title="Sign in to TradeSphere" subtitle={location.state?.from ? 'Please sign in to continue.' : 'Sign in to your Buyer or Supplier account.'}>
      <LoginForm />
    </AuthShell>
  );
}
