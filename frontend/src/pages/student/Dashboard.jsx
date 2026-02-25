import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/global.css";

export default function StudentQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // react-router hook

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuizzes = async () => {
    const res = await axios.get("http://localhost:5000/quiz/assigned", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuizzes(res.data);
  };

  const startQuiz = () => {
    // Redirect to student quiz page
    alert('Are you sure want to start the Quiz')
    navigate(`/student/quiz/`);
  };

  return (
    <div>
      <h2>My Quizzes</h2>

      <table className="course-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz Name</th>
            <th>Description</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, i) => (
            <tr key={q.id}>
              <td>{i + 1}</td>
              <td>{q.quiz.title}</td>
              <td>{q.quiz.course?.description}</td>
              <td>{q.quiz.course?.title || "N/A"}</td>
              <td>
                <button
                  className="start-btn"
                  onClick={() => startQuiz()}
                >
                  Start Quiz
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}