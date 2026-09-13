import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function BuyerDashboard() {
	const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
	const offers = JSON.parse(localStorage.getItem("offers")) || [];
	const activeContracts = contracts.filter(
		(contract) => contract.status === "Active"
	);
	const completedOrders = contracts.filter(
		(contract) =>
			contract.status === "Completed" ||
			contract.deliveryStatus === "Completed"
	);
	const buyerOffers = offers.filter(
		(offer) => offer.buyer === JSON.parse(localStorage.getItem("user"))?.name
	);

	return (
		<>
			<Navbar />

			<div className="dashboard">
				<h1>Buyer Dashboard</h1>
				<p>Find farmers and secure reliable produce.</p>

				<div className="dashboard-grid">
					<div className="stat-card">
						<h3>Active Contracts</h3>
						<p>{activeContracts.length}</p>
					</div>

					<div className="stat-card">
						<h3>Pending Offers</h3>
						<p>{buyerOffers.filter((offer) => offer.status === "Pending").length}</p>
					</div>

					<div className="stat-card">
						<h3>Completed Orders</h3>
						<p>{completedOrders.length}</p>
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
