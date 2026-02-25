import axios from "./axios";

/* CREATE */
export const createCourseApi = (data) =>
  axios.post("/courses", data);

/* READ */
export const getCoursesApi = () =>
  axios.get("/courses");

/* DELETE */
export const deleteCourseApi = (id) =>
  axios.delete(`/courses/${id}`);