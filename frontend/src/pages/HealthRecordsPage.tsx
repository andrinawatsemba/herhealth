import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const dummyHealthRecords = [
  { id: 1, date: '2024-06-01', notes: 'Routine checkup. All vitals normal.' },
  { id: 2, date: '2024-05-15', notes: 'Ultrasound performed. Baby healthy.' },
  { id: 3, date: '2024-04-20', notes: 'Blood pressure slightly elevated.' },
];

const heroImage = '/img1.jpg';

const HealthRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src={heroImage}
          alt="Health records illustration"
          className="rounded-xl shadow-lg w-full md:w-1/2 object-cover h-64 border-4 border-orange-300"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Health Records</h1>
          <p className="text-gray-700 mb-4">Here are your recent health records. Keep track of your pregnancy journey and stay informed about your health status.</p>
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-100" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      <Card className="w-full max-w-2xl border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Recent Health Records</CardTitle>
          <CardDescription>Sample health records for demonstration</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-orange-100">
            {dummyHealthRecords.map((rec) => (
              <li key={rec.id} className="py-3">
                <div className="font-medium text-orange-700">{rec.date}</div>
                <div className="text-gray-700">{rec.notes}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordsPage; 