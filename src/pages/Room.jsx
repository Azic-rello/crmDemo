import { useState } from "react";
import RoomAdd from "../features/room/RoomAdd";
import RoomEdit from "../features/room/RoomEdit";
import RoomDelete from "../features/room/RoomDalete";
import { AiOutlineEdit } from "react-icons/ai";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const addRoom = (room) => setRooms([...rooms, room]);
  const deleteRoom = (id) => setRooms(rooms.filter(r => r.id !== id));
  const editRoom = (id) => setEditingId(id);
  const updateRoom = (updatedRoom) => { setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r)); setEditingId(null); };
  const cancelEdit = () => setEditingId(null);

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <RoomAdd addRoom={addRoom} />

      {rooms.map(room => 
        editingId === room.id ? (
          <RoomEdit key={room.id} room={room} updateRoom={updateRoom} cancelEdit={cancelEdit} />
        ) : (
          <div key={room.id} className="bg-gray-900 text-white p-4 rounded shadow-md mb-4">
            <h3 className="font-bold text-lg">{room.name}</h3>
            <p>Guruh darajasi: {room.level}</p>
            <p>Ustoz: {room.teacher}</p>
            <p>Vaqti: {room.startTime} - {room.endTime}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => editRoom(room.id)} className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 p-2 rounded">
                <AiOutlineEdit /> Tahrirlash
              </button>
              <RoomDelete roomId={room.id} deleteRoom={deleteRoom} />
            </div>
          </div>
        )
      )}
    </div>
  );
}