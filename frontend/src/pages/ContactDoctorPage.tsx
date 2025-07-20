import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const dummyDoctors = [
  { id: 1, name: 'Dr. Jane Doe', specialty: 'Obstetrician', contact: '+256 700 123456' },
  { id: 2, name: 'Dr. John Smith', specialty: 'Gynecologist', contact: '+256 701 654321' },
];

const ContactDoctorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Contact Doctor</h1>
          <p className="text-gray-700 mb-4">Here are some doctors you can contact for your maternal health needs.</p>
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-100" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      <Card className="w-full max-w-2xl border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Doctors</CardTitle>
          <CardDescription>Sample doctors for demonstration</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-orange-100">
            {dummyDoctors.map((doc) => (
              <li key={doc.id} className="py-3">
                <div className="font-medium text-orange-700">{doc.name}</div>
                <div className="text-gray-700">Specialty: {doc.specialty}</div>
                <div className="text-gray-500 text-sm">Contact: {doc.contact}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDoctorPage; 