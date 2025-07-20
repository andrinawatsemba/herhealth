import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/api';
import { Patient, VisitRecord, CreateVisitRecord } from '../types/admin';
import { Plus, Search } from 'lucide-react';

const purpleHeartLogo = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#4B2A7B"/>
    <path d="M24 38s-11.52-9.216-16.32-14.592C2.496 24.096 0 20.352 0 16.32 0 9.792 5.184 4.608 11.712 4.608c3.456 0 6.72 1.536 8.832 4.032C22.08 6.144 25.344 4.608 28.8 4.608 35.328 4.608 40.512 9.792 40.512 16.32c0 4.032-2.496 7.776-7.68 12.288C35.52 28.992 24 38 24 38z" fill="#fff" fillOpacity="0.2"/>
    <path d="M24 34s-8.64-6.912-12.24-10.944C3.744 18.336 2.016 15.36 2.016 12.288 2.016 7.488 6.048 3.456 10.848 3.456c2.88 0 5.6 1.28 7.36 3.36C20.16 4.736 22.88 3.456 25.76 3.456c4.8 0 8.832 4.032 8.832 8.832 0 3.072-1.728 6.048-5.744 10.768C32.64 27.088 24 34 24 34z" fill="#fff"/>
    <circle cx="24" cy="24" r="8" fill="#fff"/>
    <ellipse cx="24" cy="24" rx="3.5" ry="6" fill="#4B2A7B"/>
  </svg>
);

const dummyStats = {
  patients: 12,
  appointments: 5,
  unreadMessages: 3,
};

const dummyPatients = [
  { id: 'P001', name: 'Amina N.', trimester: '2nd', lastVisit: '2024-06-10' },
  { id: 'P002', name: 'Grace K.', trimester: '1st', lastVisit: '2024-06-05' },
  { id: 'P003', name: 'Sarah M.', trimester: '3rd', lastVisit: '2024-05-28' },
];

const dummyAppointments = [
  { id: 1, patient: 'Amina N.', date: '2024-06-15', time: '10:00 AM', status: 'Upcoming' },
  { id: 2, patient: 'Grace K.', date: '2024-06-12', time: '2:00 PM', status: 'Upcoming' },
  { id: 3, patient: 'Sarah M.', date: '2024-06-01', time: '11:00 AM', status: 'Completed' },
];

const dummyMessages = [
  { id: 1, from: 'Amina N.', content: 'Thank you for the last visit!', unread: true },
  { id: 2, from: 'Clinic Admin', content: 'Staff meeting at 3pm.', unread: true },
  { id: 3, from: 'Sarah M.', content: 'Can I reschedule my appointment?', unread: false },
];

const DoctorDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [visitRecords, setVisitRecords] = useState<VisitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddVisitDialog, setShowAddVisitDialog] = useState(false);
  
  // Form state for adding visit records
  const [visitForm, setVisitForm] = useState<CreateVisitRecord>({
    patient_id: 0,
    visit_date: '',
    visit_type: 'antenatal',
    notes: '',
    follow_up_needed: false,
  });

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      const [patientsData, visitsData] = await Promise.all([
        apiService.getDoctorPatients(),
        apiService.getVisitRecords(),
      ]);
      setPatients(patientsData);
      setVisitRecords(visitsData);
    } catch (error) {
      console.error('Failed to fetch doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVisit = async () => {
    try {
      await apiService.createVisitRecord(visitForm);
      setShowAddVisitDialog(false);
      setVisitForm({
        patient_id: 0,
        visit_date: '',
        visit_type: 'antenatal',
        notes: '',
        follow_up_needed: false,
      });
      fetchDoctorData();
    } catch (error) {
      console.error('Failed to add visit record:', error);
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] flex items-center justify-center">
        <div className="text-lg text-[#2E1A47]">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F3] flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          {purpleHeartLogo}
          <span className="text-2xl font-bold text-[#4B2A7B] tracking-tight">HearHealth Doctor</span>
        </div>
        <Button onClick={logout} className="bg-[#4B2A7B] text-white hover:bg-[#2E1A47] font-bold px-6 py-2 rounded-full">Logout</Button>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Welcome & Stats */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2E1A47] mb-2">Welcome, Dr. {user?.username}</h1>
            <p className="text-[#2E1A47]">Here’s your dashboard overview.</p>
          </div>
          <div className="flex gap-4">
            <Card className="bg-[#F6A764] text-[#2E1A47] w-40">
              <CardContent className="py-4 text-center">
                <div className="text-2xl font-bold">{dummyStats.patients}</div>
                <div className="text-sm">Patients</div>
              </CardContent>
            </Card>
            <Card className="bg-[#F6A764] text-[#2E1A47] w-40">
              <CardContent className="py-4 text-center">
                <div className="text-2xl font-bold">{dummyStats.appointments}</div>
                <div className="text-sm">Upcoming Appointments</div>
              </CardContent>
            </Card>
            <Card className="bg-[#F6A764] text-[#2E1A47] w-40">
              <CardContent className="py-4 text-center">
                <div className="text-2xl font-bold">{dummyStats.unreadMessages}</div>
                <div className="text-sm">Unread Messages</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Management */}
        <Card className="mb-8 bg-[#F6A764]">
          <CardHeader>
            <CardTitle className="text-[#2E1A47]">Patient Management</CardTitle>
            <CardDescription className="text-[#2E1A47]">View and manage your assigned patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-[#2E1A47]" />
              <Input
                placeholder="Search patients by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm border-[#4B2A7B] text-[#2E1A47]"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#2E1A47]">ID</TableHead>
                  <TableHead className="text-[#2E1A47]">Name</TableHead>
                  <TableHead className="text-[#2E1A47]">Email</TableHead>
                  <TableHead className="text-[#2E1A47]">Phone</TableHead>
                  <TableHead className="text-[#2E1A47]">Care Type</TableHead>
                  <TableHead className="text-[#2E1A47]">Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium text-[#2E1A47]">{patient.id}</TableCell>
                    <TableCell className="text-[#2E1A47]">{patient.username}</TableCell>
                    <TableCell className="text-[#2E1A47]">{patient.email}</TableCell>
                    <TableCell className="text-[#2E1A47]">{patient.contact || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {patient.trimester || 'Not Specified'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#2E1A47]">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="mb-8 bg-[#F6A764]">
          <CardHeader>
            <CardTitle className="text-[#2E1A47]">Appointments</CardTitle>
            <CardDescription className="text-[#2E1A47]">Manage your appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-[#2E1A47]">
                <thead>
                  <tr className="bg-[#4B2A7B] text-white">
                    <th className="py-2 px-3">Patient</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Time</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyAppointments.map((appt) => (
                    <tr key={appt.id} className="bg-white even:bg-[#FAF7F3]">
                      <td className="py-2 px-3">{appt.patient}</td>
                      <td className="py-2 px-3">{appt.date}</td>
                      <td className="py-2 px-3">{appt.time}</td>
                      <td className="py-2 px-3">{appt.status}</td>
                      <td className="py-2 px-3">
                        {appt.status === 'Upcoming' ? (
                          <Button className="bg-[#4B2A7B] text-white px-3 py-1 rounded-full text-xs">Mark Completed</Button>
                        ) : (
                          <span className="text-xs text-[#4B2A7B]">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Visit Records */}
        <Card className="mb-8 bg-[#F6A764]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[#2E1A47]">Visit Records</CardTitle>
                <CardDescription className="text-[#2E1A47]">Manage patient visit records and add new visits.</CardDescription>
              </div>
              <Dialog open={showAddVisitDialog} onOpenChange={setShowAddVisitDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#4B2A7B] text-white hover:bg-[#2E1A47]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visit Record
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Visit Record</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#2E1A47]">Patient</label>
                      <Select
                        value={visitForm.patient_id.toString()}
                        onValueChange={(value) => setVisitForm({ ...visitForm, patient_id: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id.toString()}>
                              {patient.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2E1A47]">Visit Date</label>
                      <Input
                        type="date"
                        value={visitForm.visit_date}
                        onChange={(e) => setVisitForm({ ...visitForm, visit_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2E1A47]">Visit Type</label>
                      <Select
                        value={visitForm.visit_type}
                        onValueChange={(value: 'antenatal' | 'postnatal') => 
                          setVisitForm({ ...visitForm, visit_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="antenatal">Antenatal</SelectItem>
                          <SelectItem value="postnatal">Postnatal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2E1A47]">Notes</label>
                      <Textarea
                        value={visitForm.notes}
                        onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                        placeholder="Enter visit notes..."
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="follow-up"
                        checked={visitForm.follow_up_needed}
                        onChange={(e) => setVisitForm({ ...visitForm, follow_up_needed: e.target.checked })}
                      />
                      <label htmlFor="follow-up" className="text-sm font-medium text-[#2E1A47]">
                        Follow-up needed
                      </label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddVisitDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddVisit} className="bg-[#4B2A7B] text-white hover:bg-[#2E1A47]">
                        Add Visit
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#2E1A47]">Patient</TableHead>
                  <TableHead className="text-[#2E1A47]">Visit Date</TableHead>
                  <TableHead className="text-[#2E1A47]">Type</TableHead>
                  <TableHead className="text-[#2E1A47]">Notes</TableHead>
                  <TableHead className="text-[#2E1A47]">Follow-up</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitRecords.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell className="font-medium text-[#2E1A47]">{visit.patient_name}</TableCell>
                    <TableCell className="text-[#2E1A47]">{new Date(visit.visit_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={visit.visit_type === 'antenatal' ? 'default' : 'secondary'}>
                        {visit.visit_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-[#2E1A47]">{visit.notes}</TableCell>
                    <TableCell>
                      <Badge variant={visit.follow_up_needed ? 'destructive' : 'outline'}>
                        {visit.follow_up_needed ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Messages & Notifications */}
        <Card className="mb-8 bg-[#F6A764]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-[#2E1A47]">Messages & Notifications</CardTitle>
              <CardDescription className="text-[#2E1A47]">Stay updated with your patients and clinic.</CardDescription>
            </div>
            <div className="relative">
              <span className="inline-block bg-[#4B2A7B] text-white rounded-full px-3 py-1 text-xs font-bold">
                {dummyStats.unreadMessages}
              </span>
              <span className="ml-2 text-[#2E1A47]">🔔</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul>
              {dummyMessages.map((msg) => (
                <li key={msg.id} className={`mb-2 p-3 rounded ${msg.unread ? 'bg-[#FAF7F3] font-bold' : 'bg-white'}`}>
                  <span className="text-[#4B2A7B]">{msg.from}:</span> {msg.content}
                </li>
              ))}
            </ul>
            <Button className="mt-4 bg-[#4B2A7B] text-white px-6 py-2 rounded-full">Send Message</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorDashboardPage; 