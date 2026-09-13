import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function BuyerDashboard() {
	return (
		<>
			<Navbar />

			<div className="dashboard">
				<h1>Buyer Dashboard</h1>
				<p>Find farmers and secure reliable produce.</p>

				<div className="dashboard-grid">
					<div className="stat-card">
						<h3>Active Contracts</h3>
						<p>5</p>
					</div>

					<div className="stat-card">
						<h3>Pending Offers</h3>
						<p>2</p>
					</div>

					<div className="stat-card">
						<h3>Completed Orders</h3>
						<p>12</p>
					</div>
				</div>

				<Link to="/buyer/crops" className="btn">
					Browse Crops
				</Link>

				<Link to="/delivery-tracking" className="btn secondary">
					Track Deliveries
				</Link>

				<Link to="/payments" className="btn secondary">
					Payment Tracking
				</Link>
			</div>
		</>
	);
}

export default BuyerDashboard;
