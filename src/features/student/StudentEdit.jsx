import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const StudentEdit = ({ student, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(student);
    }
  }, [student, isModalOpen, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await updateStudent(student.id, values);
      message.success("Talaba ma'lumotlari yangilandi!");
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      console.error("Error updating student:", error);
      message.error("Xatolik yuz berdi.");
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
      <Button icon={<EditOutlined />} onClick={showModal} />
      <Modal
        title="Talabani tahrirlash"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" name="edit_student_form">
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: 'Ismni kiriting!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: 'Familiyani kiriting!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Yosh"
            rules={[{ required: true, message: 'Yoshni kiriting!' }]}
          >
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
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

export default StudentEdit;
