import { API } from "../../service/Api";

export default function ManagerDelete({ id, onDeleted }) {
  const handleDelete = async () => {
    if (window.confirm("O‘chirishni xohlaysizmi?")) {
      await API.delete(`/managers/${id}`);
      onDeleted();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
    >
       O‘chirish
    </button>
  );
}
