import useApi from './useApi';
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
    const url = `https://fakestoreapi.com/`;
    const { getAPI } = useApi(url);
    console.log('Uploading file:', file);
    // Generate random product ID between 1 and 20
    const randomId = Math.floor(Math.random() * 20) + 1;
    const urlParams = `products/${randomId}`;
    // Fetch product from Fake Store API
    const productData = await getAPI(urlParams);
    const product: FakeStoreProduct = productData.data;
    
    // Return the image URL from the API response
    return product.image;
  } catch (error) {
    console.error('Error in mock upload:', error);
    throw new Error('Failed to upload file');
  }
};