import { useState, useEffect } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);

  const [form, setForm] = useState({
    instructorId: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    const res = await api.get("/users/instructors");
    setInstructors(res.data || []);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    await api.post("/bookings", form);
    alert("Booking Requested");
    navigate("/bookings");
  };

  return (
    <Layout>
      <div className="card">
        <h2>Create Booking</h2>

        {/* Instructor Dropdown */}
        <label>Select Instructor</label>
        <select
          name="instructorId"
          onChange={handleChange}
        >
          <option value="">Select</option>

          {instructors.map((i) => (
            <option key={i.id} value={i.id}>
              {i.email}
            </option>
          ))}
        </select>

        <label>Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          onChange={handleChange}
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
        />

        <button onClick={submit}>
          Submit Booking
        </button>
      </div>
    </Layout>
  );
};

export default CreateBooking;