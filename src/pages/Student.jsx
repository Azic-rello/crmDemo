import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../constants';

const { groups, teachers, rooms } = data;

const Student = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students');
        setStudentsData(response.data);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    fetchData();
  }, []);
  const getGroupName = (groupId) => {
    const group = groups.find(g => Number(g.id) === Number(groupId));
    return group ? group.name : "-";
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => Number(t.id) === Number(teacherId));
    return teacher ? `${teacher.name} ${teacher.surname}` : "-";
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => Number(r.id) === Number(roomId));
    return room ? room.name : "-";
  };

  // Qidiruv funksiyasi
  const filteredStudents = studentsData.filter(student => {
    if (!searchTerm) return true;

    const fullName = `${student.name} ${student.surname}`.toLowerCase();
    const groupName = getGroupName(student.groupId).toLowerCase();
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || groupName.includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Talabalar Ro'yxati</h1>
          <button
            onClick={() => navigate('/admin/student/add')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-md shadow-green-200"
          >
            <FaUserPlus />
            <span>Qo'shish</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">

        {/* Qidirish va Filtr */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ism yoki guruh bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100 flex flex-col justify-between">

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.image || "https://ui-avatars.com/api/?background=random"}
                      alt={student.name}
                      className="w-14 h-14 rounded-full border-2 border-blue-50 object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">
                        {student.name} {student.surname}
                      </h3>
                      <p className="text-sm text-gray-500">{student.phone}</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">
                    {getGroupName(student.groupId)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">O'qituvchi:</span>
                    <span className="text-gray-800 font-semibold">{getTeacherName(student.teacherId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Xona:</span>
                    <span className="text-gray-800 font-semibold">{getRoomName(student.roomId)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/student/edit/${student.id}`)} // ID bilan tahrirlashga o'tish
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm font-semibold"
                  >
                    <FaUserEdit /> Tahrirlash
                  </button>
                  <button
                    onClick={() => navigate(`/admin/student/edit/${student.id}`)} // Tahrirlash sahifasida o'chirish tugmasi bor
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    title="O'chirish"
                  >
                    <FaTrash />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              So'rovingiz bo'yicha hech narsa topilmadi.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Student;