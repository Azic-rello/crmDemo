import { useEffect, useState } from "react";
import { getTeachers } from "../service/Api";
import TeacherAdd from "../features/teacher/TeacherAdd";
import TeacherDelete from "../features/teacher/TeacherDelete";
import TeacherEdit from "../features/teacher/TeacherEdit";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await getTeachers();
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Teacher
        </h1>

        <TeacherAdd refresh={fetchTeachers} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {teacher.firstName} {teacher.lastName}
              </h2>

              <p className="text-gray-600 mt-2">
                <span className="font-medium">Fan:</span> {teacher.subject}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Tel:</span> {teacher.phone}
              </p>

              <div className="flex gap-3 mt-4">
                <TeacherEdit teacher={teacher} refresh={fetchTeachers} />
                <TeacherDelete id={teacher.id} refresh={fetchTeachers} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
