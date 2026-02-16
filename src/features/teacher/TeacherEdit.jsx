import React, { useState } from "react";
import { updateTeacher } from "../../service/Api";

const TeacherEdit = ({ teacher, refresh }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(teacher.firstName);
  const [lastName, setLastName] = useState(teacher.lastName);
  const [subject, setSubject] = useState(teacher.subject);
  const [phone, setPhone] = useState(teacher.phone);

  const handleUpdate = async () => {
    try {
      await updateTeacher(teacher.id, { firstName, lastName, subject, phone });
      setIsEdit(false);
      refresh();
    } catch (err) {
      console.error("Update error:", err);
      alert("Tahrirlashda xato bo‘ldi");
    }
  };

  if (isEdit) {
    return (
      <div className="flex flex-col gap-2">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border px-2 py-1 rounded text-black"
        />
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEdit(true)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition"
    >
      Edit
    </button>
  );
};

export default TeacherEdit;
