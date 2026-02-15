
import { useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function GroupEdit({ group, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(group.name || "");
  const [teacher, setTeacher] = useState(group.teacher || "");
  const [students, setStudents] = useState((group.students || []).join(", ")); 
  const [time, setTime] = useState(group.time || "");

  const handleSave = () => {
    axios.put(`http://localhost:5000/groups/${group.id || group._id}`, {
      name,
      teacher,
      students: students.split(",").map(s => s.trim()),
      time
    })
    .then(() => {
      onUpdated();   
      
      setOpen(false); 
      
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <button
        className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                   text-white font-bold rounded-2xl shadow-xl
                   hover:scale-105 hover:brightness-110 transition-transform duration-300"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="text-center">
          Edit Group
        </DialogTitle>

        <DialogContent className="flex flex-col gap-5 py-6">
          <input
            className="border border-gray-300 rounded-2xl px-5 py-3 shadow-md
                       focus:outline-none focus:ring-4 focus:ring-purple-300
                       transition duration-300"
            placeholder="Group Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-2xl px-5 py-3 shadow-md
                       focus:outline-none focus:ring-4 focus:ring-pink-300
                       transition duration-300"
            placeholder="Teacher"
            value={teacher}
            onChange={e => setTeacher(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-2xl px-5 py-3 shadow-md
                       focus:outline-none focus:ring-4 focus:ring-red-300
                       transition duration-300"
            placeholder="Students (comma separated)"
            value={students}
            onChange={e => setStudents(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-2xl px-5 py-3 shadow-md
                       focus:outline-none focus:ring-4 focus:ring-blue-300
                       transition duration-300"
            placeholder="Time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </DialogContent>

        <DialogActions className="flex justify-between px-6 pb-6">
          <button
            className="px-5 py-2 rounded-2xl border border-gray-300 text-gray-700
                       hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                       text-white font-bold rounded-2xl shadow-xl
                       hover:scale-105 hover:brightness-110 transition-transform duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}