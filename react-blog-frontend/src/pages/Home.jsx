import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../api"; // Import the fetchPosts function
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(currentPage, searchValue);
        setPosts(data.data.posts);
        setTotalPage(data.data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getPosts();
  }, [currentPage, searchValue]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setCatLoading(true);
        const response = await axios.get("/category?page=1&limit=1000");
        const data = response.data.data;
        setCategories(data.categories);
        setCatLoading(false);
      } catch (error) {
        setCatLoading(false);
        toast.error("Failed to load categories", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Categories on left side */}
        <div className="col-md-3">
          <h4>Categories</h4>
          {catLoading ? (
            <p>Loading categories...</p>
          ) : (
            <ul className="list-group">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category.id}
                    className="list-group-item"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate(`/posts?categoryId=${category.id}`)}
                  >
                    <div>{category.title}</div>
                    <div style={{ fontSize: "smaller", color: "gray" }}>
                      {category.description}
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No categories found</li>
              )}
            </ul>
          )}
        </div>

        {/* Posts and controls in center */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Blog</h2>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/posts/new-post")}
              >
                + Add New Post
              </button>
              <button
                className="btn btn-secondary me-2"
                onClick={() => navigate("/categories/new-category")}
              >
                + Add New Category
              </button>
              <button
                className="btn btn-info"
                onClick={() => navigate("/categories")}
              >
                See All Categories
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <input
            className="form-control mb-3"
            type="text"
            name="search"
            placeholder="🔍 Search here..."
            onChange={handleSearch}
          />

          {/* Post List */}
          <div className="row">
              {loading ? (
                <div>Loading...</div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                <div
                    className="col-md-6 mb-3"
                    key={post.id}
                    onClick={() => navigate(`/posts/detail-post/${post.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="post-card h-100 text-center">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="card-img"
                        />
                      )}
                      <h5 className="card-title">{post.title}</h5>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts found</p>
              )}
          </div>

          {/* Pagination */}
          {pageCount.length > 0 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePrev}>
                    Previous
                  </button>
                </li>
                {pageCount.map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPage ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={handleNext}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
