function ContractCard({ contract }) {
	return (
		<div className="contract-card">
			<div>
				<h3>{contract.cropName}</h3>
				<p>Farmer: {contract.farmer}</p>
				<p>Buyer: {contract.buyer}</p>
				<p>Quantity: {contract.quantity} {contract.unit}</p>
				<p>Agreed Price: ₹{contract.price}/{contract.unit}</p>
				<p>Harvest Date: {contract.harvestDate}</p>
			</div>

			<div className="contract-status">{contract.status}</div>
		</div>
	);
}

export default ContractCard;
