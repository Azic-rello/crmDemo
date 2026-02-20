import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit, FaArrowLeft, FaSave, FaTrash } from 'react-icons/fa';
import StudentDelete from './StudentDelete';
import axios from 'axios';
import { data } from '../../constants';

const { groups, teachers, rooms } = data;

const StudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Talabani yuklashda xatolik:", error);
        alert("Talaba topilmadi!");
        navigate('/admin/student');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedStudent = {
        ...formData,
        groupId: Number(formData.groupId),
        teacherId: Number(formData.teacherId),
        roomId: Number(formData.roomId)
      };

      await axios.put(`http://localhost:3000/students/${id}`, updatedStudent);
      console.log("Yangilandi:", updatedStudent);
      navigate('/admin/student');
    } catch (error) {
      console.error("Yangilashda xatolik:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      console.log("O'chirildi ID:", id);
      setIsDeleteModalOpen(false);
      navigate('/admin/student');
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Yuklanmoqda...</div>;
  if (!formData) return <div className="p-10 text-center">Ma'lumot yo'q</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

        <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <FaUserEdit size={24} />
            <h1 className="text-2xl font-bold">Talabani Tahrirlash</h1>
          </div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors">
            <FaArrowLeft /> Orqaga
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">

          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Shaxsiy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Ism</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Familiya</label>
              <input
                type="text"
                name="surname"
                value={formData.surname || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-semibold"
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 pt-4">O'quv Jarayoni</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-1">
              <label className="text-sm text-gray-500">Guruh</label>
              <select
                name="groupId"
                value={formData.groupId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-medium"
              >
                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-500">O'qituvchi</label>
              <select
                name="teacherId"
                value={formData.teacherId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-medium"
              >
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name} {t.surname}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-500">Xona</label>
              <select
                name="roomId"
                value={formData.roomId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 font-medium"
              >
                {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t font-semibold">
            <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="text-red-500 hover:text-red-700 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
              <FaTrash /> O'chirish
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center gap-2">
              <FaSave /> Saqlash
            </button>
          </div>
        </form>
      </div>

      <StudentDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        studentName={`${formData.name} ${formData.surname}`}
      />
    </div>
  );
};

export default StudentEdit;