import axios from 'axios';
import  { useState } from 'react'

const ComplaintForm = ({onLogout}) => {


      const [formData, setFormData] = useState({
        problem: '',
        department: '',
        description: '',
        location: '',
        image: null
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = async (e) => {
        const file=e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setFormData({ ...formData, image:base64 });
      };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const base64Image = formData.image;
        const emailid = localStorage.getItem('email');
        const data = {
          email:emailid,
          problem: formData.problem,
          department: formData.department,
          description: formData.description,
          location: formData.location,
          image: base64Image
        };    
        const response = await axios.post('https://ccserver-2d2c.onrender.com/api/user/complain', data);
    
        console.log(response.data); 
        alert(`form sumbitted `);
        setFormData({
          problem: '',
          department: '',
          description: '',
          location: '',
          image: null
        });
      } catch (error) {
        console.error(error.response.data.message); // Log error or handle failure
        alert(`${error.response.data.message}`)
      }
    };
    
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
  return (
     <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="problem"
      placeholder="Problem Name"
      value={formData.problem}
      onChange={handleChange}
    />
    <select
      name="department"
      value={formData.department}
      onChange={handleChange}
    >
      <option value="" disabled>Select Department</option>
      <option value="TransportManagement">TransportManagement</option>
     <option value="Electricity">Electricity</option>
     <option value="Wastemanagement">Waste management</option>
     {/* <option value="Publictransportation">Public transportation</option> */}
    
    </select>
    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
    />
    <input
      type="text"
      name="location"
      placeholder="Location"
      value={formData.location}
      onChange={handleChange}
    />
    <input
      type="file"
      name="image"
      label='Image'
      accept='.jpeg,.png,.jpg'
      onChange={handleImageChange}
    />
    <button type="submit">Submit</button>
  </form>
  )
}

export default ComplaintForm