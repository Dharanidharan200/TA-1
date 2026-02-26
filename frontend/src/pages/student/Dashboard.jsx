import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignedQuizzesApi, getUserResultsApi } from "../../api/quiz.api";
import "../../styles/global.css";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [scores, setScores] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchQuizzes();
    fetchScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all assigned quizzes
  const fetchQuizzes = async () => {
    try {
      const res = await getAssignedQuizzesApi();
      setQuizzes(res.data);
    } catch (err) {
      console.error("Failed to fetch quizzes:", err);
    }
  };

  // Fetch all attempts and calculate highest score per quiz
  const fetchScores = async () => {
    try {
      const res = await getUserResultsApi(userId); // returns array of attempts
      const attempts = res.data;

      // Map quizId => highest score
      const scoreMap = {};
      attempts.forEach((a) => {
        if (!scoreMap[a.quizId] || a.score > scoreMap[a.quizId]) {
          scoreMap[a.quizId] = a.score;
        }
      });

      setScores(scoreMap);
    } catch (err) {
      console.error("Failed to fetch scores:", err);
    }
  };

  // Navigate to quiz page
  const startQuiz = (quizId) => {
    if (window.confirm("Are you sure you want to start this quiz?")) {
      sessionStorage.setItem("selectedQuizId", quizId);
      navigate("/student/quiz");
    }
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
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, i) => {
            const quizId = q.quiz.id;
            const score = scores[quizId] ?? "N/A";

            return (
              <tr key={quizId}>
                <td>{i + 1}</td>
                <td>{q.quiz.title}</td>
                <td>{q.quiz.course?.description || "N/A"}</td>
                <td>{q.quiz.course?.title || "N/A"}</td>
                <td>{score}</td>
                <td>
                  <button
                    className="start-btn"
                    onClick={() => startQuiz(quizId)}
                  >
                    Start Quiz
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}