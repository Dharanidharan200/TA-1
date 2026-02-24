import { useForm } from "react-hook-form";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post("/courses", data);
    navigate("/courses");
  };

  return (
    <Layout>
      <div className="card">
        <h2>Create Course</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" />
          <input {...register("description")} placeholder="Description" />
          <button type="submit">Create</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;