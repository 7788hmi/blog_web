import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:3000', // Ensure this matches your backend URL
});

// Add request interceptor to include token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to upload a file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('image', file); // Assuming the file input name is 'image'

  try {
    const response = await api.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to create a new post
export const createPost = async (title, content, category_id, fileId) => {
  try {
    const response = await api.post('/posts', { 
      title, 
      content, 
      category_id,
      fileId  // Pass the file ID to associate with the post
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response ? error.response.data : error.message);
    throw error;
  }
};
