import React, { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentService from './services/StudentService';

function App() {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadStudents();
  }, [filter]);

  const loadStudents = async () => {
    try {
      const filterValue = filter === 'all' ? null : filter === 'active';
      const data = await StudentService.getAllStudents(filterValue);
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Failed to load students');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (studentToEdit) {
        await StudentService.updateStudent(studentToEdit.id, formData);
        setSuccess('Student updated successfully!');
      } else {
        await StudentService.createStudent(formData);
        setSuccess('Student created successfully!');
      }
      setStudentToEdit(null);
      loadStudents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save student');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await StudentService.deleteStudent(id);
        setSuccess('Student deleted successfully!');
        loadStudents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete student');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleCancel = () => {
    setStudentToEdit(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="container">
        <StudentForm
          studentToEdit={studentToEdit}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <div className="filter-section">
          <label>Filter by Status: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Students</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
