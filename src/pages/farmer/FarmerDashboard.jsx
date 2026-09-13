import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function FarmerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>
          Welcome, {user?.name || "Farmer"} 👋
        </h1>

        <p>
          Manage your crops and secure buyers.
        </p>

        <div className="dashboard-grid">

          <div className="stat-card">
            <h3>My Crops</h3>
            <p>4</p>
          </div>

          <div className="stat-card">
            <h3>Active Contracts</h3>
            <p>2</p>
          </div>

          <div className="stat-card">
            <h3>Pending Offers</h3>
            <p>3</p>
          </div>

          <div className="stat-card">
            <h3>Total Earnings</h3>
            <p>₹82,500</p>
          </div>

        </div>

        <div className="dashboard-actions">

          <Link
            to="/farmer/add-crop"
            className="btn"
          >
            + Add Crop
          </Link>

          <Link
            to="/farmer/contracts"
            className="btn secondary"
          >
            View Contracts
          </Link>

        </div>

      </div>
    </>
  );
}

export default FarmerDashboard;