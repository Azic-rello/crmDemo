
import { useEffect, useState } from "react";
import axios from "axios";
import GroupAdd from "../features/group/GroupAdd";
import GroupDelete from "../features/group/GroupDalete"; 
import GroupEdit from "../features/group/GroupEdit";

export default function Group() {
  const [groups, setGroups] = useState([]);

  const fetchGroups = () => {
    axios.get("http://localhost:5000/groups")
      .then(res => setGroups(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/groups/${id}`)
      .then(() => fetchGroups())
      .catch(err => console.log(err));
  };

  return (
    <div className="p-12 min-h-screen ">
      <h1 className="text-6xl font-extrabold mb-12 text-center text-white">
        Groups
      </h1>

      <div className="mb-12 flex justify-center">
        <GroupAdd onAdded={fetchGroups} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {groups.map(group => (
          <div
            key={group.id || group._id}
            className="bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 
                       rounded-[40px] shadow-2xl 
                       transform hover:-translate-y-3 hover:scale-105 
                       transition-all duration-500"
          >
            <div className="p-12 bg-white rounded-[40px]">
              <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                {group.name || "No Name"}
              </h2>

              <p className="text-2xl font-semibold text-gray-800 mb-3">
                👩‍🏫 Teacher: {group.teacher || "No Teacher"}
              </p>

              <p className="text-xl text-gray-700 mb-3">
                👥 Students: {group.students?.length > 0 
                  ? group.students.join(", ") 
                  : "No students"}
              </p>

              <p className="text-xl font-bold text-purple-600 mb-8">
                ⏰ Time: {group.time ?? "Not set"}
              </p>

              <div className="flex space-x-6">
                <GroupEdit group={group} onUpdated={fetchGroups} />
                <GroupDelete onDelete={() => handleDelete(group.id || group._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

