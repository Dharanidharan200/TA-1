import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({});
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        form
      );

      const authData = {
        token: res.data.token,
        user: {
          role: res.data.role,
        },
      };
      localStorage.setItem("role", authData.user.role);
      login(authData);

      if (authData.user.role === "ADMIN")
        nav("/admin");
      else if (
        authData.user.role === "INSTRUCTOR"
      )
        nav("/instructor");
      else nav("/student");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Login</h2>

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
          Login
        </button>

        {/* REGISTER BUTTON */}
        <p className="auth-footer">
          New Student?{" "}
          <span
            className="link"
            onClick={() =>
              nav("/register")
            }
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}