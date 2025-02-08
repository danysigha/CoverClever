import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        first_name,
        last_name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration success!");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>First name: </label>
        <input
          type="text"
          placeholder="Enter first name..."
          value={data.first_name}
          onChange={(e) => setData({ ...data, first_name: e.target.value })}
        />
        <label>Last name: </label>
        <input
          type="text"
          placeholder="Enter last name..."
          value={data.last_name}
          onChange={(e) => setData({ ...data, last_name: e.target.value })}
        />
        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password: </label>
        <input
          type="password"
          placeholder="Enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
