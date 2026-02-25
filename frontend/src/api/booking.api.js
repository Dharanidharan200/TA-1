import axios from "./axios";

export const createBookingApi = (data) =>
  axios.post("/bookings", data);

export const approveBookingApi = (id) =>
  axios.patch(`/bookings/approve/${id}`);