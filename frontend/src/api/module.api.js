import axios from "./axios";

export const createModuleApi = (data) =>
  axios.post("/modules", data);