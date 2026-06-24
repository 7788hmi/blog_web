import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createPost, uploadFile } from "../api/api";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const AddPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        if (data.status) {
          setCategories(data.data);
        } else {
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createPost(
        formData.title, 
        formData.desc, 
        formData.category,
        fileId  // Pass the file ID to createPost
      );
      console.log('Post created successfully:', data);
      
      setFormData(initialFormData);
      setFormError(initialFormError);
      setFileId(null);  // Reset file ID
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      setError('Failed to create post');
      toast.error('Failed to create post', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setExtensionError("No file selected");
      return;
    }

    const type = file.type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);

      try {
        setIsDisable(true);
        const response = await uploadFile(file);  // Use uploadFile function
        setFileId(response.data.id);  // Store the file ID

        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        const response = error.response;
        const data = response ? response.data : null;
        const message = data && data.message ? data.message : "Failed to upload file";
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Only .png or .jpg or .jpeg file allowed");
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              onChange={handleFileChange}
              disabled={isDisable}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="error">{formError.category}</p>
            )}
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              disabled={loading}
              value={`${loading ? "Adding..." : "Add"}`}
            />
          </div>
        </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddPost;
