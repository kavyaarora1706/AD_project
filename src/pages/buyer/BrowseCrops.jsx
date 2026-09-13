import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CropCard from "../../components/CropCard";

function BrowseCrops() {
	const [crops, setCrops] = useState([]);

	useEffect(() => {
		const savedCrops = JSON.parse(localStorage.getItem("crops")) || [];
		setCrops(savedCrops);
	}, []);

	function handleOffer(crop) {
		const offer = prompt(`Enter your offer price for ${crop.name}:`);

		if (!offer) return;

		alert(`Offer of ₹${offer} submitted for ${crop.name}`);
	}

	return (
		<>
			<Navbar />

			<div className="marketplace">
				<h1>Available Crops</h1>
				<p>Find farmers and negotiate directly.</p>

				<div className="crop-grid">
					{crops.length === 0 ? (
						<p>No crops listed yet.</p>
					) : (
						crops.map((crop) => (
							<CropCard key={crop.id} crop={crop} onOffer={handleOffer} />
						))
					)}
				</div>
			</div>
		</>
	);
}

export default BrowseCrops;
