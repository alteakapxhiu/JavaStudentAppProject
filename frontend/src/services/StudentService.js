const API_URL = 'http://localhost:8080/api/students';

const StudentService = {
  // Get all students or filter by active status
  getAllStudents: async (active = null) => {
    const url = active !== null ? `${API_URL}?active=${active}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  // Get student by ID
  getStudentById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Student not found');
    return response.json();
  },

  // Create new student
  createStudent: async (student) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return response.json();
  },

  // Update student
  updateStudent: async (id, student) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    return response.json();
  },

  // Delete student
  deleteStudent: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete student');
  }
};

export default StudentService;
