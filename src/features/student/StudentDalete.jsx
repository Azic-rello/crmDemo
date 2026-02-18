import React, { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteStudent } from '../../service/Api';

const StudentDalete = ({ id, refresh }) => {
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await deleteStudent(id);
      message.success("O'chirildi");
      if (typeof refresh === 'function') refresh(); 
    } catch (error) {
      message.error("Xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm title="O'chirilsinmi?" onConfirm={confirmDelete} okText="Ha" cancelText="Yo'q">
      <Button danger icon={<DeleteOutlined />} loading={loading} size="small" />
    </Popconfirm>
  );
};

export default StudentDalete;