// src/api/axios.ts
import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Development environment
  // baseURL: "https://cover-clever.onrender.com", // Production environment
  withCredentials: true,
});

// Add interceptor to add token to all requests
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add interceptor to handle token from login response
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  const authHeader = response.headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    localStorage.setItem('token', token);
  }
  return response;
});

export default axiosInstance;