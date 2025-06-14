import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

export const fetchProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export default api;