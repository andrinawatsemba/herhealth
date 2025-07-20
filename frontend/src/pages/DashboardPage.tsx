import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

// Try importing the image directly
const babyImage = '/imgt1.png';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Debug logging
  console.log('User data:', user);
  console.log('User role:', user?.role);
  console.log('User trimester:', user?.trimester);
  console.log('Should show image:', user?.role === 'Patient' && user?.trimester === 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-orange-600">HerHealth</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.username} ({user?.role})
              </span>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-100" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">
            Welcome {user?.username}
          </h2>
          
          {/* Debug info - remove this after testing */}
          <div className="mb-4 p-2 bg-yellow-100 rounded text-sm">
            <p>Debug Info:</p>
            <p>Role: {user?.role}</p>
            <p>Trimester: {user?.trimester}</p>
            <p>Should show image: {user?.role === 'Patient' && user?.trimester === 1 ? 'Yes' : 'No'}</p>
          </div>
          
          {/* Show baby size image only for 1st trimester patients */}
          {user?.role === 'Patient' && user?.trimester === 1 && (
            <div className="text-center mb-4">
              <img 
                src={babyImage} 
                alt="Baby size at 1st trimester" 
                className="mx-auto max-w-xs rounded-lg shadow-md"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
              <p className="text-lg font-medium text-orange-600 mt-2">
                Your baby size now
              </p>
            </div>
          )}
          
          <p className="text-gray-600">
            Manage your health journey and connect with healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Username:</span> {user?.username}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {user?.role}
                </div>
                {user?.role === 'Patient' && user?.trimester && (
                  <div>
                    <span className="font-medium">Trimester:</span> {user.trimester}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full border-orange-500 text-orange-600 hover:bg-orange-100" variant="outline" onClick={() => navigate('/health-records')}>
                  View Health Records
                </Button>
                <Button className="w-full border-orange-500 text-orange-600 hover:bg-orange-100" variant="outline" onClick={() => navigate('/appointments')}>
                  Schedule Appointment
                </Button>
                <Button className="w-full border-orange-500 text-orange-600 hover:bg-orange-100" variant="outline" onClick={() => navigate('/contact-doctor')}>
                  Contact Doctor
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Last Login</div>
                  <div>Today at {new Date().toLocaleTimeString()}</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Account Status</div>
                  <div className="text-green-600">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {user?.role === 'Patient' && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Pregnancy Journey</CardTitle>
                <CardDescription>Track your pregnancy progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Pregnancy Progress</span>
                      <span className="text-sm text-gray-500">
                        Trimester {user.trimester}
                      </span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${(user.trimester! / 3) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {user.trimester}
                      </div>
                      <div className="text-sm text-gray-600">Current Trimester</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">0</div>
                      <div className="text-sm text-gray-600">Appointments</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600">Health Records</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage; 