import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

const branches = ['IT', 'CS', 'E&TC'];
const years = ['First', 'Second', 'Third', 'Fourth'];

const PostForm = ({ onClose }) => {
  const formRef = useRef();


  const [formData, setFormData] = useState({
    name: '',
    branch: branches[0],
    year: years[0],
    confession: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending data to the server)
    console.log(formData.name);
    // Close the form
    onClose();
  };

  return (
    <div
      ref={formRef}
      onClick={(e) => {
        if (formRef.current === e.target) {
          onClose();
        }
      }}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'
    >
      <div className='bg-white p-6 rounded-lg w-96'>
        <button onClick={onClose} className='absolute top-4 right-4 text-white'>
          <X />
        </button>
        <h2 className='text-2xl font-bold mb-4'>Confession Form</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='branch'>
              Branch
            </label>
            <select
              id='branch'
              name='branch'
              value={formData.branch}
              onChange={handleChange}
              className='border rounded w-full py-2 px-3'
              required
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='year'>
              Year
            </label>
            <select
              id='year'
              name='year'
              value={formData.year}
              onChange={handleChange}
              className='border rounded w-full py-2 px-3'
              required
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confession'>
              Confession Message
            </label>
            <textarea
              id='confession'
              name='confession'
              value={formData.confession}
              onChange={handleChange}
              className='border rounded w-full py-2 px-3'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;