import { useState } from "react";
import { addTeacher } from "../../service/Api";

const TeacherAdd = ({ refresh }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    subject: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.phone || !form.subject)
      return;

    await addTeacher(form);

    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      subject: "",
    });

    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl flex flex-wrap gap-4"
    >
      <input
        name="firstName"
        placeholder="Ism"
        value={form.firstName}
        onChange={handleChange}
        className="flex-1 min-w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <input
        name="lastName"
        placeholder="Familiya"
        value={form.lastName}
        onChange={handleChange}
        className="flex-1 min-w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
        className="flex-1 min-w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <input
        name="subject"
        placeholder="Fan"
        value={form.subject}
        onChange={handleChange}
        className="flex-1 min-w-[180px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
      >
        Qo‘shish
      </button>
    </form>
  );
};

export default TeacherAdd;
