import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const dummyAppointments = [
  { id: 1, date: '2024-06-20', time: '10:00 AM', doctor: 'Dr. Jane Doe', location: 'Kampala Health Center' },
  { id: 2, date: '2024-07-05', time: '2:00 PM', doctor: 'Dr. John Smith', location: 'Mulago Hospital' },
];

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Upcoming Appointments</h1>
          <p className="text-gray-700 mb-4">Here are your upcoming appointments. Stay on top of your schedule and never miss a checkup!</p>
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-100" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      <Card className="w-full max-w-2xl border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Appointments</CardTitle>
          <CardDescription>Sample appointments for demonstration</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-orange-100">
            {dummyAppointments.map((appt) => (
              <li key={appt.id} className="py-3">
                <div className="font-medium text-orange-700">{appt.date} at {appt.time}</div>
                <div className="text-gray-700">Doctor: {appt.doctor}</div>
                <div className="text-gray-500 text-sm">Location: {appt.location}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsPage; 