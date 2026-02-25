import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/register",
        {
          ...form,
          role: "STUDENT",
        }
      );

      alert(
        "Registered successfully. Wait for admin approval."
      );

      nav("/");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* GO BACK ARROW */}
        <div
          className="back-arrow"
          onClick={() => nav("/")}
        >
          ← Back to Login
        </div>

        <h2>Student Register</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button onClick={submit}>
          Register
        </button>
      </div>
    </div>
  );
}