import {
  DashboardStats,
  Patient,
  VisitRecord,
  EducationalMaterial,
  FeedbackMessage,
  MonthlyVisits,
  CareTypeDistribution,
  MaterialCategoryCount,
  CreateVisitRecord,
  CreateEducationalMaterial,
} from '../types/admin';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: {
    username: string;
    email: string;
    password: string;
    role: string;
    trimester?: number;
  }) {
    return this.request<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // User endpoints
  async getCurrentUser() {
    return this.request<any>('/users/me');
  }

  async updateProfile(userData: any) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Admin Dashboard endpoints
  async getDashboardStats() {
    return this.request<DashboardStats>('/admin/dashboard/stats');
  }

  async getPatients() {
    return this.request<Patient[]>('/admin/patients');
  }

  // Doctor Dashboard endpoints
  async getDoctorPatients() {
    return this.request<Patient[]>('/doctor/patients');
  }

  async getVisitRecords() {
    return this.request<VisitRecord[]>('/doctor/visits');
  }

  async createVisitRecord(visitData: CreateVisitRecord) {
    return this.request<VisitRecord>('/doctor/visits', {
      method: 'POST',
      body: JSON.stringify(visitData),
    });
  }

  async getEducationalMaterials() {
    return this.request<EducationalMaterial[]>('/admin/materials');
  }

  async createEducationalMaterial(materialData: CreateEducationalMaterial) {
    return this.request<EducationalMaterial>('/admin/materials', {
      method: 'POST',
      body: JSON.stringify(materialData),
    });
  }

  async deleteEducationalMaterial(id: number) {
    return this.request<{ message: string }>(`/admin/materials/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeedbackMessages() {
    return this.request<FeedbackMessage[]>('/admin/feedback');
  }

  async markFeedbackAsRead(id: number) {
    return this.request<{ message: string }>(`/admin/feedback/${id}/read`, {
      method: 'PUT',
    });
  }

  // Analytics endpoints
  async getMonthlyVisits() {
    return this.request<MonthlyVisits[]>('/admin/analytics/monthly-visits');
  }

  async getCareTypeDistribution() {
    return this.request<CareTypeDistribution[]>('/admin/analytics/care-type-distribution');
  }

  async getMaterialCategoryCount() {
    return this.request<MaterialCategoryCount[]>('/admin/analytics/material-categories');
  }
}

export const apiService = new ApiService(); 