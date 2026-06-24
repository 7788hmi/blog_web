// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import addCategoryValidator from "../../validators/addCategoryValidator";
// import { createCategory } from '../../api';
// import { useAuth } from '../../components/context/AuthContext';

// const initialFormData = {
//   title: "",
//   desc: "",
// };

// const initialFormError = {
//   title: "",
// };

// const NewCategory = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [formError, setFormError] = useState(initialFormError);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Get the authentication data (and token) from context
//   const auth = useAuth();
//   const token = auth?.token;


  

  
//     // Debug: log the auth object and token
//     useEffect(() => {
//       console.log("Auth object:", auth);
//       console.log("Token:", token);
//     }, [auth, token]);
  

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = addCategoryValidator({ title: formData.title });
//     if (errors.title) {
//       setFormError(errors);
//       return;
//     }
//     try {
//       setLoading(true);
//       const data = await createCategory(formData.title, formData.desc, token);
//       toast.success(data.message, {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: true,
//       });
//       setFormData(initialFormData);
//       setFormError(initialFormError);
//       navigate("/categories");
//     } catch (error) {
//       toast.error("Failed to create category. Please try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button className="button button-block" onClick={() => navigate(-1)}>
//         Go Back
//       </button>
//       <div className="form-container">
//         <form className="inner-container" onSubmit={handleSubmit}>
//           <h2 className="form-title">New Category</h2>
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               className="form-control"
//               type="text"
//               name="title"
//               placeholder="Technology"
//               value={formData.title}
//               onChange={handleChange}
//             />
//             {formError.title && <p className="error">{formError.title}</p>}
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               className="form-control"
//               name="desc"
//               placeholder="Lorem ipsum"
//               value={formData.desc}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <div className="form-group">
//             <input
//               className="button"
//               type="submit"
//               value={loading ? "Adding..." : "Add"}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewCategory;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import addCategoryValidator from "../../validators/addCategoryValidator";
import { createCategory } from '../../api';
import { useAuth } from '../../components/context/AuthContext';

const initialFormData = {
  title: "",
  desc: "",
};

const initialFormError = {
  title: "",
};

const NewCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = addCategoryValidator({ title: formData.title });
    if (errors.title) {
      setFormError(errors);
      return;
    }
    try {
      setLoading(true);
      // Create a category without an auth token
      const data = await createCategory(formData.title, formData.desc);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      setFormData(initialFormData);
      setFormError(initialFormError);
      navigate("/categories");
    } catch (error) {
      toast.error("Failed to create category. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={loading ? "Adding..." : "Add"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;