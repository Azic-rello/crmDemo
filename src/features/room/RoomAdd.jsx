import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function RoomAdd({ addRoom }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !level || !teacher || !startTime || !endTime) return alert("Iltimos, barcha maydonlarni to'ldiring.");
    addRoom({ id: Date.now(), name, level, teacher, startTime, endTime });
    setName(""); setLevel(""); setTeacher(""); setStartTime(""); setEndTime("");
  };
  return (
    <div className="p-6  from-gray-800 to-gray-900 text-white rounded-lg shadow-lg mb-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Xona Qo'shish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Xona nomi</label>
          <input
            placeholder="Masalan: 101-xona"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          
          <input
            placeholder="Masalan: Boshlang'ich"
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font- medium mb-1">Ustoz ismi</label>
          <input
            placeholder="Masalan: Ali Valiyev"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        {/* dfhaslkj */}
        <div>
          <label className="block text-sm font-medium mb-1">Boshlanish Soati</label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tugash Soati</label>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded-md w-full font-semibold transition-colors"
        ><AiOutlinePlus /> Qo'shish</button> 
      </form>
    </div>
  );   
}