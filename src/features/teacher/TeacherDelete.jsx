import { deleteTeacher } from "../../service/Api";

const TeacherDelete = ({ id, refresh }) => {
  const handleDelete = async () => {
    try {
      await deleteTeacher(id);
      refresh(); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("O‘chirishda xato bo‘ldi");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
    >
      Delete
    </button>
  );
};

export default TeacherDelete;
