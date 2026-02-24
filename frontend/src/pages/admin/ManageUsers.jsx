import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/Layout";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data || []);
  };

  return (
    <Layout>
      <div className="card">
        <h2>All Users</h2>

        {users.map((u) => (
          <div key={u.id}>
            {u.email} — {u.role}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ManageUsers;