import { createBookingApi } from "../../api/booking.api";

export default function Bookings() {
  const book = async () => {
    await createBookingApi({
      instructorId: 1,
      start_time: "2026-02-26T10:00",
      end_time: "2026-02-26T11:00",
    });

    alert("Booking Requested");
  };

  return <button onClick={book}>Book</button>;
}