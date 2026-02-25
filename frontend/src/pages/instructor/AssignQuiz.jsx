import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignQuiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [students, setStudents] = useState([]);
    const [quizId, setQuizId] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            if (!token) {
                alert("Please login again");
                return;
            }

            // Fetch quizzes (Instructor only)
            const q = await axios.get(
                "http://localhost:5000/quiz",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Fetch students
            const s = await axios.get(
                "http://localhost:5000/users?role=STUDENT&approved=true",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setQuizzes(q.data);
            setStudents(s.data.rows || s.data);
        } catch (err) {
            console.error("Fetch Error:", err.response?.data || err.message);

            if (err.response?.status === 401) {
                alert("Session expired. Please login again.");
            }
        }
    };

    const assign = async () => {
        try {
            if (!quizId) {
                alert("Please select a quiz");
                return;
            }

            if (selectedStudents.length === 0) {
                alert("Please select at least one student");
                return;
            }

            await axios.post(
                "http://localhost:5000/quiz/assign",
                {
                    quizId,
                    studentIds: selectedStudents,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Quiz Assigned Successfully ✅");

            // Reset selections
            setQuizId("");
            setSelectedStudents([]);
        } catch (err) {
            console.error("Assign Error:", err.response?.data || err.message);

            if (err.response?.status === 401) {
                alert("Unauthorized. Please login again.");
            } else if (err.response?.status === 403) {
                alert("Access denied. Only instructors can assign quizzes.");
            }
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-title">Assign Quiz</div>

            {/* Quiz Dropdown */}
            <select
                className="select"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
            >
                <option value="">Select Quiz</option>

                {quizzes.map((q) => (
                    <option key={q.id} value={q.id}>
                        {q.title}
                    </option>
                ))}
            </select>

            {/* Student Multi Select */}
            <select
                className="select"
                value={selectedStudents[0] || ""}
                onChange={(e) =>
                    setSelectedStudents(e.target.value ? [e.target.value] : [])
                }
            >
                <option value="">Select Student</option>
                {students.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name} [{s.email}]
                    </option>
                ))}
            </select>

            <button className="quiz-btn" onClick={assign}>
                Assign Quiz
            </button>
        </div>
    );
}