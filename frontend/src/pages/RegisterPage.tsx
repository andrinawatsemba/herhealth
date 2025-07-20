import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['Patient', 'Doctor', 'Admin']),
  trimester: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        trimester: data.trimester,
      });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F5] p-4">
      <Card className="w-full max-w-md border-[#FFA726] shadow-lg">
        <CardHeader className="text-center bg-gradient-to-b from-[#FFA726]/20 to-[#F472B6]/10 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-[#FFA726]">
            Create Account
          </CardTitle>
          <CardDescription className="text-[#333]">
            Join HerHealth to start your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#FFA726]">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register('username')}
                className={errors.username ? 'border-[#FBBF24]' : 'border-[#FFA726]'}
              />
              {errors.username && (
                <p className="text-sm text-[#F472B6]">{errors.username.message}</p>
              )}
            </div>

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
              <label htmlFor="role" className="text-sm font-medium text-[#FFA726]">
                Role
              </label>
              <Select onValueChange={(value) => setValue('role', value as 'Patient' | 'Doctor' | 'Admin')}>
                <SelectTrigger className="border-[#FFA726]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patient">Patient</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-[#F472B6]">{errors.role.message}</p>
              )}
            </div>

            {selectedRole === 'Patient' && (
              <div className="space-y-2">
                <label htmlFor="trimester" className="text-sm font-medium text-[#FFA726]">
                  Trimester
                </label>
                <Select onValueChange={(value) => setValue('trimester', parseInt(value))}>
                  <SelectTrigger className="border-[#FFA726]">
                    <SelectValue placeholder="Select trimester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Trimester</SelectItem>
                    <SelectItem value="2">Second Trimester</SelectItem>
                    <SelectItem value="3">Third Trimester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[#FFA726]">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-[#FBBF24]' : 'border-[#FFA726]'}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-[#F472B6]">{errors.confirmPassword.message}</p>
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm text-[#333]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#FFA726] hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage; 