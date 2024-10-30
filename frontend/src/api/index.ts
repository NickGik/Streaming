// src/api/index.ts

const API_BASE_URL = 'http://localhost:3000';

// const getToken = (): string | null => {
//   return localStorage.getItem('token'); 
// };

const createHeaders = (): HeadersInit => {
  // const token = getToken();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjU1NTU1IiwiaWQiOjEsImlhdCI6MTcyNDg1OTYyNSwiZXhwIjoxNzI1NDY0NDI1fQ.QNu27nMK2TQ2iw1jb6OQWJMt7eebaKvffV16wRv_20U';
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'GET',
    headers: createHeaders(),
  });
  return handleResponse<T>(response);
};

export const postRequest = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: 'DELETE',
    headers: createHeaders(),
  });
  return handleResponse<T>(response);
};


