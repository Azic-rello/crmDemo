
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
    <div>GroupEdit</div>
  )
}

export default GroupEdit