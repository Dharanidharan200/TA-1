import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";

const Approvals = () => {
  const [students, setStudents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchBookings();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/admin/pending-students");
    setStudents(res.data || []);
  };

  const fetchBookings = async () => {
    const res = await api.get("/bookings?status=requested");
    setBookings(res.data || []);
  };

  const approveStudent = async (id) => {
    await api.put(`/admin/approve-student/${id}`);
    fetchStudents();
  };

  const approveBooking = async (id) => {
    await api.put(`/bookings/${id}/approve`);
    fetchBookings();
  };

  return (
    <Layout>

      <div className="card">
        <h2>Student Approvals</h2>

        {students.map((s) => (
          <div key={s.id}>
            {s.email}
            <button onClick={() => approveStudent(s.id)}>
              Approve
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Booking Approvals</h2>

        {bookings.map((b) => (
          <div key={b.id}>
            {b.startTime}
            <button onClick={() => approveBooking(b.id)}>
              Approve
            </button>
          </div>
        ))}
      </div>

    </Layout>
  );
};

export default Approvals;