import axios from "axios";

const API_URL = "http://localhost:5000/teachers"; // yoki sening server manziling

export const getTeachers = () => axios.get(API_URL);

export const addTeacher = (data) => axios.post(API_URL, data);

export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);

export const updateTeacher = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const API = axios.create({
  baseURL: "http://localhost:5000",
});
