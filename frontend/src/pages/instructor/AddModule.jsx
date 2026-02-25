import axios from "../../api/axios";
import { useState } from "react";

export default function AddModule() {
  const [data, setData] = useState({});

  const submit = async () => {
    await axios.post("/modules", data);
    alert("Module Added");
  };

  return (
    <div>
      <h2>Add Module</h2>

      <input
        placeholder="Course ID"
        onChange={(e) =>
          setData({ ...data, courseId: e.target.value })
        }
      />

      <input
        placeholder="Title"
        onChange={(e) =>
          setData({ ...data, title: e.target.value })
        }
      />

      <button onClick={submit}>Add</button>
    </div>
  );
}