import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePollutionContext } from "./PollutionContext"; // Ensure this is correctly imported

const NGOLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");

  const { setCurrentUser } = usePollutionContext();
  const navigate = useNavigate();

  const open_cage_apiKey = "52f2129621cb4d4aa6f632266162fe0f"; // Move to server-side

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

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      email,
      password,
      latitude,
      longitude,
    };

    const url = "http://localhost:5000/api/ngoauth/login";

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
        alert("Login successful");

        if (data.token) {
          localStorage.setItem("jwt_token", data.token);
        }

        if (data.user) {
          const user = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            latitude,
            longitude,
          };

          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
         
        }
        setFormData({
          email: "",
          password: "",
        });
      } else {
        alert(data.message || "Login failed");
      }
      navigate('/ngo/dashboard')
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          NGO Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/ngoRegister" className="text-green-700 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NGOLogin;
