import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaArrowLeft, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../../constants';

const { groups, teachers, rooms } = data;

const StudentAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    image: '',
    groupId: '',
    teacherId: '',
    roomId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newStudent = {
        ...formData,

        groupId: Number(formData.groupId),
        teacherId: Number(formData.teacherId),
        roomId: Number(formData.roomId),
      };

      await axios.post('http://localhost:3000/students', newStudent);

      console.log("Ma'lumot saqlandi:", newStudent);
      navigate('/admin/student');

    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Ma'lumotni saqlashda xatolik bo'ldi. JSON Server ishlayotganini tekshiring!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-green-600 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <FaUserPlus size={24} />
            <h1 className="text-2xl font-bold">Yangi Talaba Yaratish</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors border border-green-500"
          >
            <FaArrowLeft />
            Orqaga
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Shaxsiy Ma'lumotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Ism</label>
              <input type="text" name="name" required onChange={handleChange} placeholder="Ism" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Familiya</label>
              <input type="text" name="surname" required onChange={handleChange} placeholder="Familiya" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Telefon</label>
              <input type="tel" name="phone" required onChange={handleChange} placeholder="+99890..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 pt-4">O'quv Markazi Ma'lumotlari (Bog'liqliklar)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Guruh</label>
              <select name="groupId" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900">
                <option value="">Guruhni tanlang</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name} ({group.major})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">O'qituvchi</label>
              <select name="teacherId" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900">
                <option value="">Ustozni tanlang</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname} ({teacher.subject})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Xona</label>
              <select name="roomId" required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900">
                <option value="">Xonani tanlang</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name} ({room.capacity} kishilik)</option>
                ))}
              </select>
            </div>

          </div>

          <div className="space-y-2 pt-4 border-t">
            <label className="block text-sm font-medium text-gray-700">Rasm URL (Avatar)</label>
            <input type="url" name="image" onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-200 focus:border-green-500 outline-none bg-white text-gray-900" />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
            >
              <FaSave />
              Saqlash
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentAdd;