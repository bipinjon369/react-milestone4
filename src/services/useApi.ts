import axios from 'axios';

const useApi = (url: string = '') => {
    /**
     * Fetches the access token for the current authenticated user using AWS Amplify's `Auth` module.
     * @returns The access token string.
     * @throws If the user is not authenticated or the token cannot be retrieved.
     */
    const baseURL = url ?? 'https://api.escuelajs.co/api/v1/';
    /**
     * Makes a GET request to the specified endpoint with authorization headers.
     * @returns An object with `error` and `data` properties.
     */
    const getAPI = async (endpoint: string) => {
        try {
            const { data } = await axios.get(`${baseURL}${endpoint}`);
            return { error: false, data };
        } catch (error) {
            console.log('error', error)
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific error
                return { error: true, data: error.response };
            } else {
                // Handle non-Axios errors
                return { error: true, data: 'An unexpected error occurred' };
            }
        }
    };

    /**
     * Makes a POST request to the specified endpoint with authorization headers and a payload.
     * @returns An object with `error` and `data` properties.
     */
    const PostAPI = async (endpoint: string, payload: any) => {
        try {
            const { data } = await axios.post(`${baseURL}${endpoint}`, payload);
            return { error: false, data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific error
                return { error: true, data: error };
            } else {
                // Handle non-Axios errors
                return { error: true, data: 'An unexpected error occurred' };
            }
        }
    };

    /**
     * Makes a PATCH request to the specified endpoint with authorization headers and a payload.
     * @returns An object with `error` and `data` properties.
     */
    const PatchAPI = async (endpoint: string, payload?: any) => {
        try {
            const data = await axios.patch(`${baseURL}${endpoint}`, payload);
            return { error: false, data: data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return { error: true, data: error };
            } else {
                // Handle non-Axios errors
                return { error: true, data: 'An unexpected error occurred' };
            }
        }
    };
    /**
     * Makes a PUT request to the specified endpoint with authorization headers and a payload.
     * @returns An object with `error` and `data` properties.
     */
    const PutAPI = async (endpoint: any, payload?: any, header = true) => {
        try {
            const data = await axios.put(`${baseURL}${endpoint}`, payload);
            return { error: false, data: data.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific error
                return { error: true, data: error };
            } else {
                // Handle non-Axios errors
                return { error: true, data: 'An unexpected error occurred' };
            }
        }
    };    return { getAPI, PostAPI, PatchAPI, PutAPI };
};

export default useApi;
