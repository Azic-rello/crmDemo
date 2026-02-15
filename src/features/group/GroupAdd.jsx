
import { useState } from "react";
import axios from "axios";

export default function GroupAdd({ onAdded }) {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!name || !teacher) return alert("Name and Teacher are required");

    axios
      .post("http://localhost:5000/groups", {
        name,
        teacher,
        students: students.split(",").map(s => s.trim()),
        time
      })
      .then(() => {
        setName("");
        setTeacher("");
        setStudents("");
        setTime("");
        onAdded();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-white p-10 rounded-3xl shadow-2xl flex flex-col gap-6">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Add New Group</h2>

      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl p-5 text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
      />

      <input
        type="text"
        placeholder="Teacher"
        value={teacher}
        onChange={e => setTeacher(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl p-5 text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
      />

      <input
        type="text"
        placeholder="Students (comma separated)"
        value={students}
        onChange={e => setStudents(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl p-5 text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
      />

      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl p-5 text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-extrabold py-5 text-xl rounded-2xl hover:bg-blue-600 transition"
      >
        Add Groups
      </button>
    </div>
  );
}

