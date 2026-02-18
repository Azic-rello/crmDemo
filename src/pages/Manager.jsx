import { useEffect, useState } from "react";
import {ManagerAdd, ManagerEdit, ManagerDalete} from "../index"
import { API } from "../service/Api";

export default function Manager() {
  const [managers, setManagers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchManagers = async () => {
    const res = await API.get("/managers");
    setManagers(res.data);
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6"> Managerlar</h2>

      <ManagerAdd onAdded={fetchManagers} />

      {editing && (
        <ManagerEdit
          manager={editing}
          onUpdated={() => {
            setEditing(null);
            fetchManagers();
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid gap-3">
        {managers.map((m) => (
          <div
            key={m.id}
            className="bg-white shadow rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-500">{m.email}</p>
              <p className="text-sm text-gray-500">{m.phone}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing(m)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Tahrirlash
              </button>
              <ManagerDalete id={m.id} onDeleted={fetchManagers} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
