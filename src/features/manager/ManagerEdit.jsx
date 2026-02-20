import { useState } from "react";
import { API } from "../../service/Api";

export default function ManagerEdit({ manager, onUpdated, onCancel }) {
  const [name, setName] = useState(manager.name);
  const [email, setEmail] = useState(manager.email);
  const [phone, setPhone] = useState(manager.phone);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/managers/${manager.id}`, {
      ...manager,
      name,
      email,
      phone,
    });
    onUpdated();
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-yellow-50 p-4 rounded-xl shadow-md space-y-3 mb-6"
    >
      <h3 className="text-lg font-semibold"> Manager tahrirlash</h3>

      <input
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div className="flex gap-2">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Yangilash
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Bekor
        </button>
      </div>
    </form>
  );
}
