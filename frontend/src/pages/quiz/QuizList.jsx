import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const res = await api.get("/quiz");
    setQuizzes(res.data || []);
  };

  return (
    <Layout>

      <div className="card">
        <h2>Quizzes</h2>
      </div>

      {quizzes.map((q) => (
        <div key={q.id} className="card">
          <h3>{q.title}</h3>
          <Link to={`/quiz/${q.id}`}>
            <button>Attempt</button>
          </Link>
        </div>
      ))}

    </Layout>
  );
};

export default QuizList;