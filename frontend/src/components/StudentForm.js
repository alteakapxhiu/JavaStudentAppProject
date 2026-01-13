import React, { useState, useEffect } from 'react';

function StudentForm({ studentToEdit, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    enrollmentYear: new Date().getFullYear(),
    active: true
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      enrollmentYear: new Date().getFullYear(),
      active: true
    });
    if (onCancel) onCancel();
  };

  return (
    <div className="student-form">
      <h2>{studentToEdit ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Enrollment Year:</label>
          <input
            type="number"
            name="enrollmentYear"
            value={formData.enrollmentYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit">{studentToEdit ? 'Update' : 'Create'}</button>
          <button type="button" onClick={handleReset}>
            {studentToEdit ? 'Cancel' : 'Reset'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
