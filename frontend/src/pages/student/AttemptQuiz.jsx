import { useState } from "react";
import { attemptQuizApi } from "../../api/quiz.api";

export default function AttemptQuiz({
  // eslint-disable-next-line react/prop-types
  lessonId,
}) {
  const [answers] = useState({});

  const submit = async () => {
    const res = await attemptQuizApi({
      lessonId,
      answers,
    });

    alert("Score: " + res.data.score);
  };

  return (
    <button onClick={submit}>
      Submit Quiz
    </button>
  );
}