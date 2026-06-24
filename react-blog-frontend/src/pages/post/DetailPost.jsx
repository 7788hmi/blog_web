import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { deletePost, fetchPostDetails } from "../../api";

const DetailPost = () => {
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id: postId } = useParams();

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          const data = await fetchPostDetails(postId);
          setPost(data.data);
        } catch (error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
      };

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post?.file_url) {
      setFileUrl(post.file_url);
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      setShowModal(false);
      toast.success("Post deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      navigate("/home");
    } catch (error) {
      setShowModal(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
    }
  };

  const handleEdit = () => {
    navigate(`/posts/edit-post/${postId}`);
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button button-block"
        onClick={handleEdit}
      >
        Edit Post
      </button>
      <button
        className="button button-block"
        onClick={() => setShowModal(true)}
      >
        Delete Post
      </button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">Category: {post?.categoryTitle}</h5>
        <h5 className="post-category">
          Created at: {moment(post?.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="post-category">
          Updated at: {moment(post?.updated_at).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <p className="post-desc">{post?.content}</p>
        <img src={fileUrl} alt="Post" />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
