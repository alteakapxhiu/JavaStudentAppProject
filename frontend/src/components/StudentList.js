import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="student-list">
      <h2>Students List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Enrollment Year</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.enrollmentYear}</td>
                <td>{student.active ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => onEdit(student)}>Edit</button>
                  <button onClick={() => onDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
