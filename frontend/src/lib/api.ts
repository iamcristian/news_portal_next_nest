import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await api.post("/auth/register", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await api.post("/auth/login", data);
};

export const fetchNews = async (token: string) => {
  return await api.get("/news", {
    headers: {
      Authorization: `Bearer ${token}`, // Añadir el token a la cabecera
    },
  });
};


export default api;
