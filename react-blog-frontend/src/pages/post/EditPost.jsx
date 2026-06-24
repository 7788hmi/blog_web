import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { fetchPostDetails, updatePost } from "../../api";
import { useAuth } from "../../components/context/AuthContext";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const EditPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPostDetails(id);
        const data = response.data;
        setFormData({
          title: data.title || "",
          desc: data.content || "",
          category: data.category_id || "",
        });
      } catch (error) {
        toast.error("Failed to fetch post details", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        const data = response.data.data;
        setCategories(data);
      } catch (error) {
        toast.error("Failed to fetch categories", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getPost();
    getCategories();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(id, formData.title, formData.desc, formData.category, auth?.token);
      setLoading(false);
      toast.success("Post updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      navigate(`/posts/detail-post/${id}`);
    } catch (err) {
      setLoading(false);
      setError("Failed to update post");
      toast.error("Failed to update post", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Edit Post</h2>
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
              value={`${loading ? "Updating..." : "Update"}`}
            />
          </div>
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditPost;
