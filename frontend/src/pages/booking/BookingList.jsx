import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data || []);
  };

  return (
    <Layout>

      <div className="card">
        <h2>Bookings</h2>
        <Link to="/create-booking">
          <button>Create Booking</button>
        </Link>
      </div>

      {bookings.map((b) => (
        <div key={b.id} className="card">
          <p>Status: {b.status}</p>
          <p>Start: {b.startTime}</p>
          <p>End: {b.endTime}</p>
        </div>
      ))}

    </Layout>
  );
};

export default BookingList;