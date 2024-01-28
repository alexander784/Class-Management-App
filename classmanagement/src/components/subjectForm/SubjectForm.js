import React, { useState, useEffect  } from 'react';
import './SubjectForm.css'

const SubjectForm = ({ onSubmit, initialData }) => {


    const [formData, setFormData] = useState({
        name: '',
        code: '',
        year: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // onSubmit will be a function provided by the parent component
            // It can be used for both adding and editing subjects
            onSubmit(formData);
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

            <button type="submit">{initialData ? 'Update Subject' : 'Add Subject'}</button>
        </form>
    );
};

export default SubjectForm;
