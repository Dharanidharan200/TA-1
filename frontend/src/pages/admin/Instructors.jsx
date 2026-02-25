import { useState, useEffect } from "react";
import {
    registerInstructorApi,
    getInstructorsApi,
    deleteInstructorApi,
} from "../../api/admin.api";

export default function Instructors() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [instructors, setInstructors] =
        useState([]);

    /* Fetch Instructors */
    const fetchInstructors = async () => {
        const res = await getInstructorsApi();

        // If paginated
        const data =
            res.data.rows || res.data;

        setInstructors(data);
    };

    /* Create Instructor */
    const createInstructor = async () => {
        if (!form.email || !form.password) {
            alert("Fill all fields");
            return;
        }

        await registerInstructorApi({
            ...form,
            role: "INSTRUCTOR",
        });

        setForm({
            email: "",
            password: "",
        });

        fetchInstructors();
    };

    /* Delete Instructor */
    const deleteInstructor = async (id) => {
        if (!window.confirm("Delete?")) return;

        await deleteInstructorApi(id);
        fetchInstructors();
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    return (
        <div>
            <h2>Instructor Management</h2>

            {/* Create Form */}
            <div
                style={{
                    marginBottom: 20,
                    display: "flex",
                    gap: 10,
                }}
            >
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />
                <input
                    placeholder="Email"
                    value={form.email}
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
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                />

                <button onClick={createInstructor}>
                    Create
                </button>
            </div>

            {/* Table */}
            <table className="course-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {instructors.map((ins, i) => (
                        <tr key={ins.id}>
                            <td>{i + 1}</td>
                            <td>{ins.name}</td>
                            <td>{ins.email}</td>
                            <td>{ins.role}</td>
                            <td>
                                {new Date(
                                    ins.createdAt
                                ).toLocaleString()}
                            </td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteInstructor(ins.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}