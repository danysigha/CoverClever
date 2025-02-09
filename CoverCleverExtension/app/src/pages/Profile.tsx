import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';

interface ProfileProps {
  email: string;
}

const Profile: React.FC<ProfileProps> = ({ email }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("userToken"); // Clear token on logout
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      setError("An error occurred while logging out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar/>
      <h1 className="page-title">Profile Settings</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6 max-w-md mx-auto">
        <p className="text-lg font-medium mb-2">Current Account:</p>
        <p className="text-xl text-gray-700">{email}</p>
      </div>

      <div className="text-center">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 transition duration-300"
        >
          {loading ? "Logging Out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
