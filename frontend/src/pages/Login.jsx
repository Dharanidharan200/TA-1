import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        // REGISTER API
        await api.post("/auth/register", data);
        alert("Registered successfully");
        setIsRegister(false);
        reset();
      } else {
        // LOGIN API
        const res = await api.post("/auth/login", data);

        const token = res.data.token;
        const role = res.data.role;

        login({
          token,
          user: { role },
        });

        navigate("/dashboard");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2>{isRegister ? "Register" : "Login"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Enter password"
          />

          {/* Role only for register */}
          {isRegister && (
            <select {...register("role")}>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          )}

          <button type="submit">
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        {/* Toggle Link */}
        <p className="toggle-text">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? " Login" : " Register"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;