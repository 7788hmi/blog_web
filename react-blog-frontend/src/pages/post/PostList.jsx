import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchPosts } from "../../api"; // Import the fetchPosts function
import { useNavigate, useLocation } from "react-router-dom";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to get query params
  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const categoryId = queryParams.get("categoryId");

    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(currentPage, searchValue, categoryId);
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
  }, [currentPage, searchValue, location.search]);

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
    <div>
      <button
        className="button button-block"
        onClick={() => navigate("new-post")}
      >
        Add New Post
      </button>
      <h2 className="table-title">Post list</h2>

      <input
        className="search-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      <div className="post-grid-container">
        {loading
          ? "Loading..."
          : posts.map((post) => (
              <div
                className={`post-card ${expandedPostId === post.id ? "expanded" : ""}`}
                key={post.id}
                onClick={() => {
                  if (expandedPostId === post.id) {
                    setExpandedPostId(null);
                  } else {
                    setExpandedPostId(post.id);
                  }
                }}
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="card-img"
                  />
                )}
                <h4 className="card-title">{post.title}</h4>
                {expandedPostId === post.id && (
                  <>
                    {post.date && (
                      <div className="post-date">{post.date}</div>
                    )}
                    {post.category && (
                      <div className="post-category">{post.category.toUpperCase()}</div>
                    )}
                    <p className="card-desc">
                      {post.excerpt
                        ? post.excerpt
                        : post.content.substring(0, 100) + "..."}
                    </p>
                  </>
                )}
              </div>
            ))}
      </div>

      {pageCount.length > 0 && (
        <div className="pag-container">
          <button
            className="pag-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageCount.map((pageNumber, index) => (
            <button
              className="pag-button"
              key={index}
              onClick={() => handlePage(pageNumber)}
              style={{
                backgroundColor: currentPage === pageNumber ? "#ccc" : "",
              }}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pag-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
