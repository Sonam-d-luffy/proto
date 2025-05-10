import React, { useState, useEffect } from "react";
import { usePollutionContext } from "./PollutionContext"; // Make sure this is correctly defined
import { useNavigate } from "react-router-dom";

const NGOSignup = () => {
  const [formData, setFormData] = useState({
    darpanId: "",
    email: "",
    password: "",
    organizationName: "",
    areaOfOperation: "",
    mission: "",
  });
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  
  const { setCurrentUser } = usePollutionContext();
  const navigate = useNavigate();
  
  const open_cage_apiKey = '52f2129621cb4d4aa6f632266162fe0f';  // Move this to server-side

  // Get location name from latitude and longitude
  const getLocationName = async (lat, long) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${open_cage_apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results[0]) {
        setAddress(data.results[0].formatted);
      } else {
        setAddress("Location not found");
      }
    } catch (error) {
      console.error(error);
      setAddress("Location lookup failed");
    }
  };

  // Get user's geolocation on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLatitude(coords.lat);
        setLongitude(coords.lng);
        getLocationName(coords.lat, coords.lng);
        localStorage.setItem("ngoCoords", JSON.stringify(coords));
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    if (!formData.organizationName || !formData.darpanId || !formData.mission || !formData.areaOfOperation || !latitude || !longitude) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      ...formData,
      areaOfOperation: formData.areaOfOperation.split(",").map((s) => s.trim()), // convert to array
      latitude,
      longitude,
    };

    const url = "http://localhost:5000/api/ngoauth/signup"; // You can change this for login as needed

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful");

        if (data.token) {
          localStorage.setItem("jwt_token", data.token);
        }

        if (data.ngo) {
          const user = {
            id: data.ngo._id,
            name: data.ngo.organizationName,
            email: data.ngo.email,
            role: "ngo",
            latitude: data.ngo.latitude,
            longitude: data.ngo.longitude,
          };
          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        setFormData({
          darpanId: "",
          email: "",
          password: "",
          organizationName: "",
          areaOfOperation: "",
          mission: "",
        })

      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">NGO Registration</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Darpan ID", name: "darpanId", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Organisation Name", name: "organizationName", type: "text" },
            { label: "Area of Operation", name: "areaOfOperation", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                required
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Mission</label>
            <textarea
              name="mission"
              required
              value={formData.mission}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              rows={4}
            />
          </div>

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

export default NGOSignup;
