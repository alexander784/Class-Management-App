import React, { useState, useEffect } from 'react';
import './SubjectForm.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

const SubjectForm = ({ onSubmit, initialData }) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    year: '',
    compulsory: false,
    added_by: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name should be at least 3 characters';
    }

    if (formData.code.trim().length < 6) {
      newErrors.code = 'Code should be at least 6 characters';
    }

    const yearNumber = parseInt(formData.year, 10);
    if (isNaN(yearNumber) || yearNumber < 1 || yearNumber > 4) {
      newErrors.year = 'Year should be between 1 and 4';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const method = initialData ? 'PATCH' : 'POST';
        const url = initialData ? `http://127.0.0.1:5555/${initialData.id}` : 'http://127.0.0.1:5555/subjects';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(
            ()=>{
                navigate('/DashBoard/subjects');
            }
        );

        if (response.ok) {
          const updatedSubject = await response.json();
          onSubmit(updatedSubject);
         
        } else {
          console.error('Failed to submit the form:', response.statusText);
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>
          Code:
        </label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
        />
        {errors.code && <span className="error">{errors.code}</span>}
      </div>

      <div>
        <label>
          Year:
        </label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
        />
        {errors.year && <span className="error">{errors.year}</span>}
      </div>
      <div>
        <label>
          Compulsory:
        </label>
        <input
          type="checkbox"
          name="compulsory"
          checked={formData.compulsory}
          onChange={handleInputChange}
        />

        {errors.compulsory && <span className="error">{errors.compulsory}</span>}
      </div>

      <button type="submit">{initialData ? 'Update Subject' : 'Add Subject'}</button>
    </form>
  );
};

export default SubjectForm;