import axios from 'axios';

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const uploadToS3 = async (file: File): Promise<string> => {
  try {
    // Generate random product ID between 1 and 20
    const randomId = Math.floor(Math.random() * 20) + 1;
    
    // Fetch product from Fake Store API
    const response = await axios.get(`https://fakestoreapi.com/products/${randomId}`);
    const product: FakeStoreProduct = response.data;
    
    // Return the image URL from the API response
    return product.image;
  } catch (error) {
    console.error('Error in mock upload:', error);
    throw new Error('Failed to upload file');
  }
};