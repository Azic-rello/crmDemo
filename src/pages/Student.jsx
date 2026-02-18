import React, { useState, useEffect } from 'react';
import { message, Card, Space, Spin } from 'antd';
import { getStudents } from '../service/Api'; // Yo'lni tekshiring
import StudentAdd from '../features/student/StudentAdd';
import StudentEdit from '../features/student/StudentEdit';
import StudentDalete from '../features/student/StudentDalete'; // Fayl nomingizga mos

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (error) {
      message.error("Ma'lumotni yuklashda xato!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px', background: '#001529', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ color: 'white' }}>Talabalar Bo'limi</h2>
        <StudentAdd refresh={fetchStudents} />
      </div>

      {loading ? <Spin size="large" /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {students.map((item) => (
            <Card key={item.id} size="small" style={{ backgroundColor: '#002140', color: 'white', border: '1px solid #1f1f1f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'white' }}>
                  {item.firstName} {item.lastName} - {item.course} kurs
                </span>
                
                <Space>
                  {/* Har bir qator uchun alohida Edit va Delete */}
                  <StudentEdit student={item} refresh={fetchStudents} />
                  <StudentDalete id={item.id} refresh={fetchStudents} />
                </Space>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Student;