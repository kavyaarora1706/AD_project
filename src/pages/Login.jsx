import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please register first.");
      return;
    }

    if (user.phone !== phone) {
      alert("User not found.");
      return;
    }

    if (user.role === "farmer") {
      navigate("/farmer/dashboard");
    } else {
      navigate("/buyer/dashboard");
    }
  }

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleLogin}
      >

        <h2>Welcome Back</h2>

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;