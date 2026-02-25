import axios from "./axios";

export const approveStudentApi = (id) =>
  axios.patch(`/users/approve/${id}`);

export const approveBookingApi = (id) =>
  axios.patch(`/bookings/approve/${id}`);

/* Register Instructor */
export const registerInstructorApi = (data) =>
  axios.post("/auth/register", data);

/* Get all instructors */
export const getInstructorsApi = () =>
  axios.get("/users?role=INSTRUCTOR");

/* Delete Instructor */
export const deleteInstructorApi = (id) =>
  axios.delete(`/users/${id}`);

export const getPendingStudentsApi = () =>
  axios.get(
    "/users?role=STUDENT&approved=false"
  );

  
