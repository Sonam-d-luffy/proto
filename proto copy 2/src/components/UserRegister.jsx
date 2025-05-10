import React, { useState } from 'react';
import { usePollutionContext } from './PollutionContext';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    age: ''
  });

  const { setCurrentUser } = usePollutionContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address, phone, age } = formData;

    if (!name || !email || !password || !address || !phone || !age) {
      alert('Please fill all the fields');
      return;
    }

    const payload = { name, email, password, address, phone, age };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        if (data.token) {
          localStorage.setItem('jwt_token', data.token);
        }

        if (data.user) {
          const user = {
            id: data.user._id,  // Ensure correct MongoDB ID field
            name: data.user.name,
            email: data.user.email
          };

          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log('Registered user:', user);
        }
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          phone: '',
          age: ''
        })
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">User Registration</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
            { label: 'Age', name: 'age', type: 'number' }
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;