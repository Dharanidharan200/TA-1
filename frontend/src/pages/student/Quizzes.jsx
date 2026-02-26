import { useState, useEffect } from "react";
import axios from "axios";
import { getQuestionsByQuizApi } from "../../api/quiz.api";
import "../../styles/global.css";

export default function StudentQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizCounts, setQuizCounts] = useState({});
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizInProgress, setQuizInProgress] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const quizIdFromDashboard = sessionStorage.getItem("selectedQuizId");
    setSelectedQuizId(quizIdFromDashboard);

    fetchQuizzesAndCounts(quizIdFromDashboard);

    if (quizIdFromDashboard) {
      handleStartQuiz(quizIdFromDashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuizzesAndCounts = async (quizIdFromDashboard = null) => {
    try {
      const res = await axios.get("http://localhost:5000/quiz/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let assignedQuizzes = res.data;

      if (quizIdFromDashboard) {
        assignedQuizzes = assignedQuizzes.filter(
          (q) => (q.quiz?.id || q.id) === quizIdFromDashboard
        );
      } else {
        assignedQuizzes = [];
      }

      setQuizzes(assignedQuizzes);

      const countsRes = await axios.get(
        `http://localhost:5000/quiz/counts/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuizCounts(countsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartQuiz = async (quizId) => {
    if (!quizId) return;

    try {
      setSelectedQuizId(quizId);
      setShowQuiz(true);
      setAnswers({});
      setQuizInProgress(true);

      // Increment attempt count on backend
      const attemptRes = await axios.post(
        "http://localhost:5000/quiz/quizCount",
        { quizId, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuizCounts((prev) => ({
        ...prev,
        [quizId]: { ...prev[quizId], attemptCount: attemptRes.data.attempts },
      }));

      const questionsRes = await getQuestionsByQuizApi(quizId);
      setQuestions(questionsRes?.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to start quiz");
      setQuizInProgress(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (questions.some((q) => !answers[q.id])) {
      alert("Please answer all questions before submitting!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/quiz/submit",
        {
          quizId: selectedQuizId,
          userId,
          answers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Submitted Successfully!");
      setShowQuiz(false);
      setQuizInProgress(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  };

  if (!selectedQuizId) {
    return <h3 style={{ color: "red" }}>Please select a quiz from Dashboard to start.</h3>;
  }

  return (
    <div>
      <h2>My Quiz</h2>

      <table className="course-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz Name</th>
            <th>Course</th>
            <th>Attempts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q, i) => {
            const quizId = q.quiz?.id || q.id;
            const quizTitle = q.quiz?.title || q.title;
            const courseTitle = q.quiz?.course?.title || "N/A";
            const attemptCount = quizCounts[quizId]?.attemptCount || 0;

            return (
              <tr key={quizId}>
                <td>{i + 1}</td>
                <td>{quizTitle}</td>
                <td>{courseTitle}</td>
                <td>{attemptCount}</td>
                <td>
                  <button
                    className="start-btn"
                    onClick={() => handleStartQuiz(quizId)}
                    disabled={quizInProgress && selectedQuizId === quizId}
                  >
                    Start Quiz
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showQuiz && (
        <div style={{ marginTop: 30 }}>
          <h3>Quiz Questions</h3>

          {questions.map((q, index) => (
            <div key={q.id} style={{ marginBottom: 20 }}>
              <strong>
                {index + 1}. {q.question}
              </strong>

              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                    />
                    {opt}) {q[`option${opt}`]}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button className="start-btn" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}