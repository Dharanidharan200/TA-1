import { useState, useEffect } from "react";
import {
  createCourseApi,
  getCoursesApi,
  deleteCourseApi,
} from "../../api/course.api";

export default function InstructorCourses() {
  /* FORM STATE */
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  /* COURSE LIST */
  const [courses, setCourses] = useState([]);

  /* FETCH COURSES */
  const fetchCourses = async () => {
    const res = await getCoursesApi();
    setCourses(res.data.rows);
  };

  /* CREATE COURSE */
  const createCourse = async () => {
    if (!form.title || !form.description) {
      alert("Fill all fields");
      return;
    }

    await createCourseApi(form);

    setForm({
      title: "",
      description: "",
    });

    fetchCourses();
  };

  /* DELETE COURSE */
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure?"
    );
    if (!confirmDelete) return;

    await deleteCourseApi(id);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Manage Courses</h2>

      {/* CREATE FORM */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
        }}
      >
        <input
          placeholder="Course Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button onClick={createCourse}>
          Create
        </button>
      </div>

      {/* TABLE */}
      <table className="course-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>
                {new Date(
                  c.createdAt
                ).toLocaleString()}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCourse(c.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}