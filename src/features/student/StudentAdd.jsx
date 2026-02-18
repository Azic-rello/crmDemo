import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { addStudent } from './StudentApi';

const StudentAdd = ({ refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await addStudent(values);

      message.success("Talaba muvaffaqiyatli qo'shildi!");
      
      form.resetFields();
      setIsModalOpen(false);

      // 4. Ro'yxatni yangilash (Xatolikni oldini olish uchun tekshiruv bilan)
      if (typeof refresh === 'function') {
        refresh();
      } else {
        console.warn("Refresh funksiyasi prop sifatida uzatilmagan!");
      }

    } catch (error) {
      console.error("Error adding student:", error);
      
      // Tarmoq xatosi yoki server o'chiqligi haqida aniqroq xabar
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        message.error("Server bilan aloqa yo'q! json-server yoqilganini tekshiring.");
      } else {
        message.error("Xatolik yuz berdi, ma'lumotlarni tekshirib qaytadan urinib ko'ring.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<UserAddOutlined />}>
        Add Student
      </Button>
      <Modal
        title="Yangi talaba qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Qo'shish"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical" name="add_student_form">
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: 'Ismni kiriting!' }]}
          >
            <Input placeholder="Masalan: Ali" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: 'Familiyani kiriting!' }]}
          >
            <Input placeholder="Masalan: Valiyev" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Yosh"
            rules={[{ required: true, message: 'Yoshni kiriting!' }]}
          >
            <InputNumber min={7} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="course"
            label="Kurs"
            rules={[{ required: true, message: 'Kursni kiriting!' }]}
          >
            <InputNumber min={1} max={5} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StudentAdd;