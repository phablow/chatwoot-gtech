import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      const redirectPath = user.role === 'ADMIN' ? '/admin' : '/agent';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  return <LoginForm />;
};

export default LoginPage;
