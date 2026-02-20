import { AiOutlineDelete } from "react-icons/ai";

export default function RoomDelete({ roomId, deleteRoom }) {
  return (
    <button onClick={() => deleteRoom(roomId)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 p-2 rounded">
      <AiOutlineDelete /> O'chirish
    </button>
  );
}