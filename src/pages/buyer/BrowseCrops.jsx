import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CropCard from "../../components/CropCard";
import OfferModal from "../../components/OfferModal";

function BrowseCrops() {
	const [crops, setCrops] = useState([]);
	const [selectedCrop, setSelectedCrop] = useState(null);

	useEffect(() => {
		const savedCrops = JSON.parse(localStorage.getItem("crops")) || [];
		setCrops(savedCrops);
	}, []);

	function handleSubmitOffer(offerDetails) {
		const existingOffers = JSON.parse(localStorage.getItem("offers")) || [];
		const newOffer = {
			id: Date.now(),
			cropId: selectedCrop.id,
			cropName: selectedCrop.name,
			farmer: selectedCrop.farmer || "Listed farmer",
			buyer: JSON.parse(localStorage.getItem("user"))?.name || "Buyer",
			unit: selectedCrop.unit,
			...offerDetails,
			status: "Pending",
			createdAt: new Date().toISOString()
		};

		localStorage.setItem("offers", JSON.stringify([...existingOffers, newOffer]));
		setSelectedCrop(null);
		alert("Offer sent to the farmer!");
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
								<CropCard key={crop.id} crop={crop} onOffer={setSelectedCrop} />
						))
					)}
				</div>
			</div>

			{selectedCrop && (
				<OfferModal
					crop={selectedCrop}
					onClose={() => setSelectedCrop(null)}
					onSubmit={handleSubmitOffer}
				/>
			)}
		</>
	);
}

export default BrowseCrops;
