import { useEffect, useState } from "react";
import axios from "axios";

export default function UserSelect({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data));
  }, []);

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/api/users", {
        name: newUser,
      });
      setUsers([...users, res.data]);
      setNewUser("");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="p-2 border rounded"
      >
        <option disabled value="">
          Select a user
        </option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
      <input
        className="p-2 border rounded"
        placeholder="Add user"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddUser}
      >
        Add
      </button>
    </div>
  );
}
