import React, { useState } from 'react';

const FileUpload = ({ courseId }) => {
    const [file, setFile] = useState(null);
    const apiUrl = process.env.REACT_APP_API_BASE_URL

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Get the first file
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await fetch(`/courses/${courseId}/add-pdf`, {
                method: 'POST',
                body: formData,
                // You might need to include headers for authentication if your API requires it
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            alert('File uploaded successfully!');
            // console.log(result);
        } catch (error) {
            alert('Error uploading file: ' + error.message);
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
        </form>
    );
};

export default FileUpload;
