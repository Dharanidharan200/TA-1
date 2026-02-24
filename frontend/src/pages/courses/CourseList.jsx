import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data.rows || []);
  };

  return (
    <Layout>

      <div className="card">
        <h2>Courses</h2>
        <Link to="/create-course">
          <button>Create Course</button>
        </Link>
      </div>

      {courses.map((c) => (
        <div key={c.id} className="card">
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))}

    </Layout>
  );
};

export default CourseList;