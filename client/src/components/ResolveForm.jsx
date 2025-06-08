import axios from 'axios';
import React, { useState } from 'react'

const ResolveForm = ({complaint_id}) => {
  const [formData, setFormData] = useState({
    description: '',
    image: null
  });


  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result.split(',')[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImageChange = async (e) => {
    const file=e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({ ...formData, image:base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const base64Image = formData.image;
        const data = {
          id:complaint_id,
          description: formData.description,
          image: base64Image
        };  

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/update`, data);
        console.log(response.data); 

        alert(`form sumbitted `);
        setFormData({
          description: '',
          image: null
        });
        
      } catch (error) {
        console.error(error.response.data.message); 
        alert(`${error.response.data.message}`)
      }

  };

  return (
    <div className="container home-container form-container" style={{marginTop:"3vh"}}>
    <form onSubmit={handleSubmit}>
        <textarea
        style={{margin:"25px 0px"}}
        type="text"
        placeholder='Description'
        id="description"
        value={formData.description}
        onChange={(e) => setFormData({...formData,description:e.target.value})}    
        required
        />
        <input
        style={{marginBottom:"25px"}}
        type="file"
        name="image"
        label='Image'
        accept='.jpeg,.png,.jpg'
        onChange={handleImageChange}
        />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ResolveForm