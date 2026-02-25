import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/global.css";

export default function StudentQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizStarted, setQuizStarted] = useState({}); // { quizId: count }
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // make sure userId is stored on login

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/quiz/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartQuiz = async (quizId) => {
    alert("Quiz Started!");

    try {
      // Call backend API to store attempt
      await axios.post(
        "http://localhost:5000/quiz/quizCount", // your backend endpoint
        {
          userId,
          quizId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local counter
      setQuizStarted((prev) => ({
        ...prev,
        [quizId]: prev[quizId] ? prev[quizId] + 1 : 1,
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to start quiz");
    }
  };

  return (
    <div>
      <h2>My Quizzes</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {quizzes.map((q) => (
          <li key={q.id} style={{ marginBottom: 15 }}>
            <button
              className="start-btn"
              onClick={() => handleStartQuiz(q.quiz.id)}
            >
              Start Quiz
            </button>

            {/* Show how many times user started this quiz */}
            {quizStarted[q.quiz.id] && (
              <span style={{ marginLeft: 10 }}>
                Started {quizStarted[q.quiz.id]} time
                {quizStarted[q.quiz.id] > 1 ? "s" : ""}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}