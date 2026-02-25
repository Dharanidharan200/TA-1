import axios from "./axios";

export const createLessonApi = (data) =>
  axios.post("/lessons", data);