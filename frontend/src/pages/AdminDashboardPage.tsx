import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { apiService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
  DashboardStats,
  Patient,
  EducationalMaterial,
  FeedbackMessage,
  MonthlyVisits,
  CareTypeDistribution,
  MaterialCategoryCount,
  CreateEducationalMaterial,
} from '../types/admin';
import { Users, Calendar, FileText, MessageSquare, Plus, Search, Eye, Trash2 } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [educationalMaterials, setEducationalMaterials] = useState<EducationalMaterial[]>([]);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [monthlyVisits, setMonthlyVisits] = useState<MonthlyVisits[]>([]);
  const [careTypeDistribution, setCareTypeDistribution] = useState<CareTypeDistribution[]>([]);
  const [materialCategories, setMaterialCategories] = useState<MaterialCategoryCount[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false);

  const [materialForm, setMaterialForm] = useState<CreateEducationalMaterial>({
    title: '',
    category: 'Antenatal',
    file_url: '',
    link_url: '',
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        statsData,
        patientsData,
        materialsData,
        feedbackData,
        monthlyVisitsData,
        careTypeData,
        materialCategoriesData,
      ] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getPatients(),
        apiService.getEducationalMaterials(),
        apiService.getFeedbackMessages(),
        apiService.getMonthlyVisits(),
        apiService.getCareTypeDistribution(),
        apiService.getMaterialCategoryCount(),
      ]);

      setStats(statsData);
      setPatients(patientsData);
      setEducationalMaterials(materialsData);
      setFeedbackMessages(feedbackData);
      setMonthlyVisits(monthlyVisitsData);
      setCareTypeDistribution(careTypeData);
      setMaterialCategories(materialCategoriesData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = async () => {
    try {
      await apiService.createEducationalMaterial(materialForm);
      setShowAddMaterialDialog(false);
      setMaterialForm({
        title: '',
        category: 'Antenatal',
        file_url: '',
        link_url: '',
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to add educational material:', error);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      await apiService.deleteEducationalMaterial(id);
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to delete educational material:', error);
    }
  };

  const handleMarkFeedbackAsRead = async (id: number) => {
    try {
      await apiService.markFeedbackAsRead(id);
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to mark feedback as read:', error);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-lg text-orange-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-orange-600">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.username} (Admin)
              </span>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-600 hover:bg-orange-100" 
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-2">
            Admin Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Manage patients, educational materials, and system analytics
          </p>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.totalPatients || 0}</div>
              <p className="text-xs text-gray-600">Registered patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Antenatal Visits</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.totalAntenatalVisits || 0}</div>
              <p className="text-xs text-gray-600">Total visits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Postnatal Visits</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.totalPostnatalVisits || 0}</div>
              <p className="text-xs text-gray-600">Total visits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Educational Materials</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.totalEducationalMaterials || 0}</div>
              <p className="text-xs text-gray-600">Uploaded materials</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.totalFeedbackMessages || 0}</div>
              <p className="text-xs text-gray-600">Total messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Visits Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Visits</CardTitle>
              <CardDescription>Antenatal vs Postnatal visits over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="antenatal" stroke="#f97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="postnatal" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Care Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Care Type Distribution</CardTitle>
              <CardDescription>Distribution of patients by trimester</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={careTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#f97316"
                    dataKey="count"
                  >
                    {careTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Material Categories Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Educational Materials by Category</CardTitle>
            <CardDescription>Number of materials uploaded by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={materialCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Patient Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>All registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Care Type</TableHead>
                  <TableHead>Registration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.username}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.contact || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {patient.trimester || 'Not Specified'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(patient.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Educational Materials Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Educational Materials</CardTitle>
                <CardDescription>Manage educational content</CardDescription>
              </div>
              <Dialog open={showAddMaterialDialog} onOpenChange={setShowAddMaterialDialog}>
                <DialogTrigger asChild>
                  <Button className="border-orange-500 text-orange-600 hover:bg-orange-100" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Educational Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={materialForm.title}
                        onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                        placeholder="Enter material title..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={materialForm.category}
                        onValueChange={(value: any) => setMaterialForm({ ...materialForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Antenatal">Antenatal</SelectItem>
                          <SelectItem value="Postnatal">Postnatal</SelectItem>
                          <SelectItem value="Mental Health">Mental Health</SelectItem>
                          <SelectItem value="Nutrition">Nutrition</SelectItem>
                          <SelectItem value="Exercise">Exercise</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">File URL (optional)</label>
                      <Input
                        value={materialForm.file_url}
                        onChange={(e) => setMaterialForm({ ...materialForm, file_url: e.target.value })}
                        placeholder="Enter file URL..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link URL (optional)</label>
                      <Input
                        value={materialForm.link_url}
                        onChange={(e) => setMaterialForm({ ...materialForm, link_url: e.target.value })}
                        placeholder="Enter link URL..."
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddMaterialDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMaterial} className="border-orange-500 text-orange-600 hover:bg-orange-100" variant="outline">
                        Add Material
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educationalMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{material.category}</Badge>
                    </TableCell>
                    <TableCell>{new Date(material.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {(material.file_url || material.link_url) && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={material.file_url || material.link_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Feedback Management */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Messages</CardTitle>
            <CardDescription>Patient feedback and inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbackMessages.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.patient_name}</TableCell>
                    <TableCell className="max-w-xs truncate">{feedback.message}</TableCell>
                    <TableCell>{new Date(feedback.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={feedback.is_read ? 'outline' : 'default'}>
                        {feedback.is_read ? 'Read' : 'Unread'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!feedback.is_read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkFeedbackAsRead(feedback.id)}
                          className="border-orange-500 text-orange-600 hover:bg-orange-100"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboardPage; 