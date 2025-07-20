import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F5] p-4">
      <Card className="w-full max-w-md border-[#FFA726] shadow-lg">
        <CardHeader className="text-center bg-gradient-to-b from-[#FFA726]/20 to-[#F472B6]/10 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-[#FFA726]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-[#333]">
            Sign in to your HerHealth account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#FFA726]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={errors.email ? 'border-[#FBBF24]' : 'border-[#FFA726]'}
              />
              {errors.email && (
                <p className="text-sm text-[#F472B6]">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#FFA726]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className={errors.password ? 'border-[#FBBF24]' : 'border-[#FFA726]'}
              />
              {errors.password && (
                <p className="text-sm text-[#F472B6]">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-[#FBBF24]/10 border border-[#FBBF24] rounded-md">
                <p className="text-sm text-[#FFA726]">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#FFA726] hover:bg-[#F472B6] text-white font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center text-sm text-[#333]">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#FFA726] hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage; 