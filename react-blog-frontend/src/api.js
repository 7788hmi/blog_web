import axios from 'axios';

// Create an Axios instance with default configuration
// Use environment variable or detect production vs development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: baseURL,
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

// Optionally, you can add request/response interceptors
api.interceptors.request.use(
  (config) => {
    // Modify request config if needed
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle response data
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;

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

// Example usage in a component
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

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createCategory = async (title, description) => {
  try {
    const response = await api.post(
      "/categories",
      { title, description }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchPosts = async (page = 1, searchValue = '', categoryId = null) => {
  try {
    let url = `/posts?page=${page}&q=${searchValue}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post details:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updatePost = async (id, title, content, category_id) => {
  try {
    const response = await api.put(`/posts/${id}`, { title, content, category_id });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error.response ? error.response.data : error.message);
    throw error;
  }
};
