

export default function GroupDelete({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="px-5 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
                 text-white font-semibold rounded-lg shadow-lg 
                 hover:scale-105 hover:brightness-110 transition-transform duration-300"
    >
      Delete
    </button>
  );
}
