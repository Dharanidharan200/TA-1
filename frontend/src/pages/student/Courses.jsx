import { useEffect, useState } from "react";
import { getCoursesApi } from "../../api/course.api";

export default function Courses() {
  // eslint-disable-next-line no-unused-vars
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesApi().then((res) =>
      setCourses(res.data)
    );
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {/* {courses.map((c) => (
        <div key={c.id}>{c.title}</div>
      ))} */}
    </div>
  );
}