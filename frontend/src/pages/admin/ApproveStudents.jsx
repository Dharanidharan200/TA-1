import { useEffect, useState } from "react";
import {
  getPendingStudentsApi,
  approveStudentApi,
} from "../../api/admin.api";

export default function ApproveStudents() {
  const [students, setStudents] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  /* FETCH PENDING STUDENTS */
  const fetchStudents = async () => {
    try {
      const res =
        await getPendingStudentsApi();

      setStudents(res.data.rows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* APPROVE ACTION */
  const approveStudent = async (id) => {
    const confirmApprove =
      window.confirm(
        "Approve this student?"
      );

    if (!confirmApprove) return;

    await approveStudentApi(id);

    // Refresh list
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student Approvals</h2>

      {loading && <p>Loading...</p>}

      {!loading && students.length === 0 && (
        <p>No pending approvals</p>
      )}

      {!loading && students.length > 0 && (
        <table className="course-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>

                <td>{s.email}</td>

                <td>
                  {new Date(
                    s.createdAt
                  ).toLocaleString()}
                </td>

                <td>
                  <span className="status-pending">
                    Pending
                  </span>
                </td>

                <td>
                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveStudent(s.id)
                    }
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}