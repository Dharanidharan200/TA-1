import { useState, useEffect } from "react";
import { getCoursesApi } from "../../api/course.api";
import {
  createQuizApi,
  addQuestionApi,
  getQuestionsByQuizApi,
  getQuizzesByCourseApi, // you need to create this API call
} from "../../api/quiz.api";

export default function CreateQuiz() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [quiz, setQuiz] = useState({
    title: "",
    courseId: "",
  });

  const [question, setQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCoursesApi();
      setCourses(res?.data?.rows || []);
    } catch (err) {
      console.error("Failed to fetch courses", err);
      alert("Failed to load courses");
    }
  };

  // Fetch quizzes when course changes
  useEffect(() => {
    if (quiz.courseId) fetchQuizzes(quiz.courseId);
  }, [quiz.courseId]);

  const fetchQuizzes = async (courseId) => {
    try {
      const res = await getQuizzesByCourseApi(courseId);
      setQuizzes(res?.data || []);
      setQuizId(null);
      setQuestions([]);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    }
  };

  const createQuiz = async () => {
    if (!quiz.title || !quiz.courseId) {
      alert("Select course & enter title");
      return;
    }

    try {
      setLoading(true);
      const res = await createQuizApi(quiz);
      const id = res?.data?.id || res?.data?.quiz?.id;

      if (!id) {
        alert("Quiz ID not returned from server");
        return;
      }

      setQuizId(id);
      alert("Quiz created successfully!");
      fetchQuestions(id);
    } catch (err) {
      console.error("Failed to create quiz", err);
      alert("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (id) => {
    try {
      const res = await getQuestionsByQuizApi(id);
      setQuestions(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    }
  };

  const addQuestion = async () => {
    if (!quizId) {
      alert("Create/select a quiz first");
      return;
    }

    if (
      !question.question ||
      !question.optionA ||
      !question.optionB ||
      !question.optionC ||
      !question.optionD ||
      !question.correctAnswer
    ) {
      alert("Fill all question fields");
      return;
    }

    try {
      setLoading(true);
      await addQuestionApi({ ...question, quizId });
      alert("Question added successfully");
      setQuestion({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
      fetchQuestions(quizId);
    } catch (err) {
      console.error("Failed to add question", err);
      alert("Error adding question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-title">Create or Select Quiz</div>

      {/* COURSE */}
      <div className="quiz-form-group">
        <label>Select Course</label>
        <select
          className="select"
          value={quiz.courseId}
          onChange={(e) => setQuiz({ ...quiz, courseId: e.target.value, title: "" })}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* QUIZ SELECTION */}
      {quiz.courseId && (
        <div className="quiz-form-group">
          <label>Select Existing Quiz (or enter new title)</label>
          <select
            className="select"
            value={quizId || ""}
            onChange={(e) => {
              const id = e.target.value;
              setQuizId(id || null);
              if (id) {
                const selectedQuiz = quizzes.find((q) => q.id.toString() === id);
                setQuiz({ ...quiz, title: selectedQuiz.title });
                fetchQuestions(id);
              } else {
                setQuiz({ ...quiz, title: "" });
                setQuestions([]);
              }
            }}
          >
            <option value="">-- New Quiz --</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* QUIZ TITLE */}
      {!quizId && (
        <div className="quiz-form-group">
          <label>Quiz Title</label>
          <input
            placeholder="Enter quiz title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </div>
      )}

      {!quizId && (
        <button className="quiz-btn" onClick={createQuiz} disabled={loading}>
          {loading ? "Processing..." : "Create Quiz"}
        </button>
      )}

      {/* QUESTION BUILDER */}
      {quizId && (
        <div className="assign-box">
          <h3>Add MCQ Question</h3>

          <div className="question-card">
            <input
              placeholder="Question"
              value={question.question}
              onChange={(e) => setQuestion({ ...question, question: e.target.value })}
            />
            <input
              placeholder="Option A"
              value={question.optionA}
              onChange={(e) => setQuestion({ ...question, optionA: e.target.value })}
            />
            <input
              placeholder="Option B"
              value={question.optionB}
              onChange={(e) => setQuestion({ ...question, optionB: e.target.value })}
            />
            <input
              placeholder="Option C"
              value={question.optionC}
              onChange={(e) => setQuestion({ ...question, optionC: e.target.value })}
            />
            <input
              placeholder="Option D"
              value={question.optionD}
              onChange={(e) => setQuestion({ ...question, optionD: e.target.value })}
            />

            <select
              value={question.correctAnswer}
              onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
            >
              <option value="">Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            <button className="quiz-btn" onClick={addQuestion} disabled={loading}>
              {loading ? "Processing..." : "Add Question"}
            </button>
          </div>

          {/* DISPLAY QUESTIONS */}
          {questions.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <h3>Questions for `{quiz.title}`</h3>
              {questions.map((q, index) => (
                <div key={q.id} className="question-card" style={{ marginBottom: 20 }}>
                  <strong>
                    {index + 1}. {q.question}
                  </strong>
                  <p>A) {q.optionA}</p>
                  <p>B) {q.optionB}</p>
                  <p>C) {q.optionC}</p>
                  <p>D) {q.optionD}</p>
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Correct: {q.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}