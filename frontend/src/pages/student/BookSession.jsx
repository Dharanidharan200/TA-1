import { useState } from "react";
import { createBookingApi } from "../../api/booking.api";

export default function BookSession() {
  const [data, setData] = useState({});

  const submit = async () => {
    await createBookingApi(data);
    alert("Requested");
  };

  return (
    <div>
      <h2>Book</h2>

      <input
        type="datetime-local"
        onChange={(e) =>
          setData({ ...data, start_time: e.target.value })
        }
      />

      <input
        type="datetime-local"
        onChange={(e) =>
          setData({ ...data, end_time: e.target.value })
        }
      />

      <button onClick={submit}>Book</button>
    </div>
  );
}