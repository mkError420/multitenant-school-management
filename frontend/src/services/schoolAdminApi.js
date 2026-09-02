import axios from 'axios';

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const origin = window.location.origin.toLowerCase();
    if (origin.includes('maneschool.site.je')) {
      return 'https://maneschool.site.je/api';
    }
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return 'http://localhost:8000/api';
    }
  }

  return 'https://maneschool.site.je/api';
};

const API_BASE_URL = getApiBaseUrl();

const shouldUseRemoteApi = () => {
  if (typeof window === 'undefined') return true;
  const origin = window.location.origin;
  return origin.includes('localhost') || origin.includes('127.0.0.1') || !!import.meta.env.VITE_API_BASE_URL;
};

// Helper function to check if API is available
const isApiAvailable = async () => {
  try {
    await axios.get(`${API_BASE_URL}/health`, { timeout: 1000 });
    return true;
  } catch {
    return false;
  }
};

export const schoolAdminApi = {
  // Get all school admins
  getSchoolAdmins: async () => {
    if (!shouldUseRemoteApi()) {
      const savedAdmins = localStorage.getItem('schoolAdmins');
      if (savedAdmins) {
        return { success: true, data: JSON.parse(savedAdmins) };
      }
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Prof. Kazi Faruq Ahmed',
            email: 'principal@maneschool.site.je',
            phone: '+8801711111111',
            role: 'principal',
            status: 'active',
            school_id: 1,
            school_name: 'Mane School and College',
            last_login_at: '2026-03-15 10:30:00',
            created_at: '2025-01-10 08:00:00'
          },
          {
            id: 2,
            name: 'Dr. Mohammad Rahman',
            email: 'principal@drmc.edu.bd',
            phone: '+8801711222222',
            role: 'principal',
            status: 'active',
            school_id: 2,
            school_name: 'Dhaka Residential Model College',
            last_login_at: '2026-03-14 14:20:00',
            created_at: '2024-11-15 09:00:00'
          },
          {
            id: 3,
            name: 'Ayesha Begum',
            email: 'admin@idealschool.edu.bd',
            phone: '+8801811000002',
            role: 'school_admin',
            status: 'active',
            school_id: 3,
            school_name: 'Ideal School and College',
            last_login_at: '2026-03-10 11:45:00',
            created_at: '2024-08-20 10:15:00'
          }
        ]
      };
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/superadmin/school-admins`, { timeout: 2000 });
      return response.data;
    } catch (error) {
      const savedAdmins = localStorage.getItem('schoolAdmins');
      if (savedAdmins) {
        return { success: true, data: JSON.parse(savedAdmins) };
      }
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'Prof. Kazi Faruq Ahmed',
            email: 'principal@maneschool.site.je',
            phone: '+8801711111111',
            role: 'principal',
            status: 'active',
            school_id: 1,
            school_name: 'Mane School and College',
            last_login_at: '2026-03-15 10:30:00',
            created_at: '2025-01-10 08:00:00'
          },
          {
            id: 2,
            name: 'Dr. Mohammad Rahman',
            email: 'principal@drmc.edu.bd',
            phone: '+8801711222222',
            role: 'principal',
            status: 'active',
            school_id: 2,
            school_name: 'Dhaka Residential Model College',
            last_login_at: '2026-03-14 14:20:00',
            created_at: '2024-11-15 09:00:00'
          },
          {
            id: 3,
            name: 'Ayesha Begum',
            email: 'admin@idealschool.edu.bd',
            phone: '+8801811000002',
            role: 'school_admin',
            status: 'active',
            school_id: 3,
            school_name: 'Ideal School and College',
            last_login_at: '2026-03-10 11:45:00',
            created_at: '2024-08-20 10:15:00'
          }
        ]
      };
    }
  },

  // Create new school admin
  createSchoolAdmin: async (adminData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/superadmin/school-admins`, adminData, { timeout: 2000 });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const savedAdmins = localStorage.getItem('schoolAdmins');
      let admins = savedAdmins ? JSON.parse(savedAdmins) : [];
      const newAdmin = {
        id: admins.length + 1,
        ...adminData,
        created_at: new Date().toISOString().split('T')[0],
        last_login: null
      };
      admins.push(newAdmin);
      localStorage.setItem('schoolAdmins', JSON.stringify(admins));
      return { success: true, data: newAdmin };
    }
  },

  // Update school admin
  updateSchoolAdmin: async (adminData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/superadmin/school-admins`, adminData, { timeout: 2000 });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const savedAdmins = localStorage.getItem('schoolAdmins');
      let admins = savedAdmins ? JSON.parse(savedAdmins) : [];
      
      // If localStorage is empty, initialize with default data
      if (admins.length === 0) {
        admins = [
          {
            id: 1,
            name: 'Prof. Kazi Faruq Ahmed',
            email: 'principal@maneschool.site.je',
            phone: '+8801711111111',
            role: 'principal',
            status: 'active',
            school_id: 1,
            school_name: 'Mane School and College',
            last_login_at: '2026-03-15 10:30:00',
            created_at: '2025-01-10 08:00:00'
          },
          {
            id: 2,
            name: 'Dr. Mohammad Rahman',
            email: 'principal@drmc.edu.bd',
            phone: '+8801711222222',
            role: 'principal',
            status: 'active',
            school_id: 2,
            school_name: 'Dhaka Residential Model College',
            last_login_at: '2026-03-14 14:20:00',
            created_at: '2024-11-15 09:00:00'
          },
          {
            id: 3,
            name: 'Ayesha Begum',
            email: 'admin@idealschool.edu.bd',
            phone: '+8801811000002',
            role: 'school_admin',
            status: 'active',
            school_id: 3,
            school_name: 'Ideal School and College',
            last_login_at: '2026-03-10 11:45:00',
            created_at: '2024-08-20 10:15:00'
          }
        ];
      }
      
      admins = admins.map(admin => {
        if (admin.id === adminData.id) {
          return { ...admin, ...adminData };
        }
        return admin;
      });
      localStorage.setItem('schoolAdmins', JSON.stringify(admins));
      return { success: true, data: adminData };
    }
  },

  // Delete school admin
  deleteSchoolAdmin: async (adminId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/superadmin/school-admins?id=${adminId}`, { timeout: 2000 });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const savedAdmins = localStorage.getItem('schoolAdmins');
      if (savedAdmins) {
        let admins = JSON.parse(savedAdmins);
        admins = admins.filter(admin => admin.id !== adminId);
        localStorage.setItem('schoolAdmins', JSON.stringify(admins));
        return { success: true };
      }
      throw error;
    }
  },

  // Toggle school admin status
  toggleSchoolAdminStatus: async (adminId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/superadmin/school-admins/toggle`, { id: adminId }, { timeout: 2000 });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const savedAdmins = localStorage.getItem('schoolAdmins');
      if (savedAdmins) {
        let admins = JSON.parse(savedAdmins);
        admins = admins.map(admin => {
          if (admin.id === adminId) {
            return { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' };
          }
          return admin;
        });
        localStorage.setItem('schoolAdmins', JSON.stringify(admins));
        return { success: true };
      }
      throw error;
    }
  },

  // Authenticate school admin
  authenticateSchoolAdmin: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, { timeout: 2000 });
      return response.data;
    } catch (error) {
      // Fallback to localStorage for demo
      const savedAdmins = localStorage.getItem('schoolAdmins');
      if (savedAdmins) {
        const schoolAdmins = JSON.parse(savedAdmins);
        const schoolAdmin = schoolAdmins.find(admin => admin.email === email && admin.password === password);
        if (schoolAdmin) {
          return { 
            success: true, 
            data: { 
              email, 
              role: 'school_admin', 
              name: schoolAdmin.name,
              school_id: schoolAdmin.school_id
            }
          };
        }
      }
      throw error;
    }
  }
};
