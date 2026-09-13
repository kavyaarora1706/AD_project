import Navbar from "../../components/Navbar";
import ContractCard from "../../components/ContractCard";

function MyContracts() {
	const contracts = JSON.parse(localStorage.getItem("contracts")) || [];

	return (
		<>
			<Navbar />

			<div className="contracts-page">
				<h1>My Contracts</h1>
				<p>Track your active and completed farming contracts.</p>

				<div className="contracts-list">
					{contracts.length === 0 ? (
						<p>No contracts yet.</p>
					) : (
						contracts.map((contract) => (
							<ContractCard key={contract.id} contract={contract} />
						))
					)}
				</div>
			</div>
		</>
	);
}

export default MyContracts;
