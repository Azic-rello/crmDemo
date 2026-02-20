import { useState } from "react";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";

export default function RoomEdit({ room, updateRoom, cancelEdit }) {
  const [name, setName] = useState(room.name);
  const [level, setLevel] = useState(room.level);
  const [teacher, setTeacher] = useState(room.teacher);
  const [startTime, setStartTime] = useState(room.startTime);
  const [endTime, setEndTime] = useState(room.endTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRoom({ ...room, name, level, teacher, startTime, endTime });
  };

  return (
    <div className="p-6 from-gray-800 to-gray-900 text-white rounded-lg shadow-lg mb-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Xona Tahrirlash</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Xona nomi</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Guruh darajasi</label>
          <input
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ustoz Ismi</label>
          <input
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Boshlanish vaqti</label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tugash vaqti</label>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 p-3 rounded-md flex-1 font-semibold transition-colors"
          >
            <AiOutlineSave /> Saqlash
          </button>
          <button
            onClick={cancelEdit}
            type="button"
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 p-3 rounded-md flex-1 font-semibold transition-colors"
          >
            <AiOutlineClose /> Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
}