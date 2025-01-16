import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Loader from '../loader/Loader';

const BlogInput = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    photo: null,
  });

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/getblog`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({ ...prevFormData, photo: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(''); // Clear preview if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const { title, description, date, photo } = formData;

    // Validate fields
    if (!title || !description || !date) {
      setError('Please fill all fields.');
      return;
    }

    const documentData = new FormData();
    documentData.append('title', title);
    documentData.append('description', description);
    documentData.append('date', date);
    if (photo) {
      documentData.append('photo', photo);
    }

    try {
      if (selectedBlog) {
        // Update blog
        await axios.put(`${apiUrl}/updateblog/${selectedBlog.blogId}`, documentData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Blog updated successfully!');
      } else {
        // Create new blog
        await axios.post(`${apiUrl}/createblog`, documentData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Blog created successfully!');
      }
      handleReset(); // Reset form after submission
      fetchBlogs(); // Refresh blog list
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit the blog. Please try again.';
      setError(errorMessage);
      console.error('Error submitting the blog:', errorMessage);
    }
    finally {
      setLoading(false); // End loading
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      photo: null,
    });
    setPhotoPreview(''); // Reset photo preview
    setError(null);
    setSelectedBlog(null); // Reset selected blog
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      date: blog.date.split('T')[0], // Format date for input
      photo: null, // Set to null as we are not changing it right now
    });
    setPhotoPreview(''); // Clear the preview when editing an existing blog
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/blog/${id}`);
      alert('Blog deleted successfully!');
      fetchBlogs(); // Refresh blog list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2>Blog Submission Form</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-column">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-column">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter blog description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-column">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
        <div className="form-column">

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter blog description"
              value={formData.description}
              onChange={handleChange}
              required
            />         
            {/* <ReactQuill
        id="description"
        name="description"
        value={formData.description}
        onChange={(value) => handleChange({ target: { name: 'description', value } })}  // Adapt to use handleChange
        placeholder="Enter blog description"
        required
      /> */}
             </div>

          </div>
        <div className="form-group-row">
          {/* <div className="form-column">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-column">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                <img
  src={photoPreview}
  alt="Document Preview"
  style={{
    maxWidth: '200px',  // Maximum width
    maxHeight: '200px', // Maximum height
    width: 'auto',      // Auto width to preserve the aspect ratio
    height: 'auto',     // Auto height to preserve the aspect ratio
    objectFit: 'contain', // Ensures the image fits within the box without being cropped
    borderRadius: '8px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  }}
/>

              </div>
            )}
            {/* Show existing photo if available and no new photo is selected */}
            {selectedBlog && selectedBlog.photo && !formData.photo && !photoPreview && (
              <div style={{ marginTop: '10px' }}>
                <img
  src={`${process.env.REACT_APP_API_BASE_URL}/${selectedBlog.photo.replace(/\\/g, '/')}`} // Dynamically construct the URL
  alt="Existing Photo"
  style={{
    maxWidth: '200px',  // Maximum width
    maxHeight: '200px', // Maximum height
    width: 'auto',      // Auto width to preserve the aspect ratio
    height: 'auto',     // Auto height to preserve the aspect ratio
    objectFit: 'contain', // Ensures the image fits within the box without being cropped
    borderRadius: '8px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  }}
/>

              </div>
            )}
          </div>
        </div>
        <div className="form-actions" style={{marginLeft:"20px"}}>
          <button type="submit" style={{marginRight:"10px"}}>
            {selectedBlog ? 'Update' : 'Submit'}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <br />
      <br />
      <h2>Blog List</h2>
      <br />
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.blogId}>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{new Date(blog.date).toLocaleDateString()}</td>
              <td>
                {blog.photo && (
                  <img
                    // src={blog.photo.replace(/\\/g, '/')} // Ensure this is formatted correctly
                    src={`${process.env.REACT_APP_API_BASE_URL}/${blog.photo.replace(/\\/g, '/')}`} 

                    alt="Blog Photo"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <Button style={{ marginRight: '5px' }} color="primary" onClick={() => handleEdit(blog)}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button color="danger" onClick={() => handleDelete(blog.blogId)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export default BlogInput;
