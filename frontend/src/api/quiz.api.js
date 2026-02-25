import axios from "./axios";

export const createQuestionApi = (data) =>
  axios.post("/quiz/questions", data);

export const attemptQuizApi = (data) =>
  axios.post("/quiz/attempt", data);


export const createQuizApi = (data) => {
  return axios.post("/quiz", data);
};


export const getQuizzesApi = () => {
  return axios.get("/quiz");
};



export const addQuestionApi = (data) => {
  return axios.post("/quiz/questions", data);
};


export const assignQuizApi = (data) => {
  return axios.post("/quiz/assign", data);
};


export const getAssignedQuizzesApi = () => {
  return axios.get("/quiz/assigned");
};

export const submitQuizApi = (data) => {
  return axios.post("/quiz/attempt", data);
};

// frontend/api/quiz.api.js
export const getQuestionsByQuizApi = (quizId) => {
  const role = localStorage.getItem("role");
  return axios.get(`/quiz/${quizId}/questions`, {
    params: { role }, // send role as query param
  });
};
export const getQuizzesByCourseApi = async (courseId) => {
  return await axios.get(`/quiz/course/${courseId}`);
};