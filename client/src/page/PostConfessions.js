import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

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

  const [confirmPost, setConfirmPost] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmPost) {
      setConfirmPost(true);
      return;
    }

    const { name, branch, year, confession } = formData;

    try {
      const response = await fetch(
        'https://i2it-confessions-server.onrender.com/confession-Message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, branch, year, confession }),
        }
      );
      const res_data = await response.json();

      if (response.ok) {
        toast.success(res_data.message);
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error('Error posting confession:', error);
      toast.error('Something went wrong. Please try again later.');
    }

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
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Share Your Confession
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Enter Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="confession"
              className="block text-sm font-medium text-gray-700"
            >
              Confession Message
            </label>
            <textarea
              id="confession"
              name="confession"
              value={formData.confession}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Write your confession here"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {confirmPost ? 'Confirm & Post' : 'Post Confession'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
