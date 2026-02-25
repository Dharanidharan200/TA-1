import { useState } from "react";
import { createCourseApi } from "../../api/course.api";

export default function CreateCourse() {
  const [title, setTitle] = useState("");

  const create = async () => {
    await createCourseApi({ title });
    alert("Created");
  };

  return (
    <div>
      <h2>Create Course</h2>

      <input
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={create}>Create</button>
    </div>
  );
}