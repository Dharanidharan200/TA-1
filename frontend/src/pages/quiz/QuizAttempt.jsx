import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";

const QuizAttempt = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchQuiz = async () => {
    const res = await api.get(`/quiz/${id}`);
    setQuiz(res.data);
  };

  const submit = async () => {
    await api.post(`/quiz/${id}/attempt`, { answers });
    alert("Submitted");
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <Layout>

      <div className="card">
        <h2>{quiz.title}</h2>

        {quiz.questions.map((q) => (
          <div key={q.id}>
            <p>{q.question}</p>

            {q.options.map((o) => (
              <label key={o}>
                <input
                  type="radio"
                  name={q.id}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [q.id]: o,
                    })
                  }
                />
                {o}
              </label>
            ))}
          </div>
        ))}

        <button onClick={submit}>Submit</button>

      </div>

    </Layout>
  );
};

export default QuizAttempt;