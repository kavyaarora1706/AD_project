import Navbar from "../../components/Navbar";
import ContractCard from "../../components/ContractCard";

function MyContracts() {
	const contracts = [
		{
			id: 1,
			cropName: "Wheat",
			farmer: "Rajesh Kumar",
			buyer: "FreshMart Pvt Ltd",
			quantity: "500 kg",
			price: "28/kg",
			status: "Active"
		},
		{
			id: 2,
			cropName: "Tomato",
			farmer: "Suresh Patil",
			buyer: "GreenBasket",
			quantity: "300 kg",
			price: "32/kg",
			status: "Payment Pending"
		}
	];

	return (
		<>
			<Navbar />

			<div className="contracts-page">
				<h1>My Contracts</h1>

				<div className="contracts-list">
					{contracts.map((contract) => (
						<ContractCard key={contract.id} contract={contract} />
					))}
				</div>
			</div>
		</>
	);
}

export default MyContracts;
