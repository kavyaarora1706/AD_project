import Navbar from "../components/Navbar";

function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const crops = JSON.parse(localStorage.getItem("crops")) || [];
  const contracts = JSON.parse(localStorage.getItem("contracts")) || [];

  const activeContracts = contracts.filter(
    (contract) =>
      contract.status === "Active" ||
      contract.deliveryStatus === "In Transit"
  );

  const completedContracts = contracts.filter(
    (contract) =>
      contract.status === "Completed" ||
      contract.deliveryStatus === "Completed"
  );

  const totalValue = contracts.reduce(
    (total, contract) =>
      total +
      Number(contract.quantity || 0) *
        Number(contract.price || 0),
    0
  );

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Monitor the contract farming ecosystem.</p>
          </div>

          <span className="admin-badge">ADMIN</span>
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <span>👨‍🌾</span>
            <h3>Farmers</h3>
            <strong>{users.filter((user) => user.role === "farmer").length}</strong>
          </div>

          <div className="admin-stat">
            <span>🌾</span>
            <h3>Crop Listings</h3>
            <strong>{crops.length}</strong>
          </div>

          <div className="admin-stat">
            <span>📄</span>
            <h3>Total Contracts</h3>
            <strong>{contracts.length}</strong>
          </div>

          <div className="admin-stat">
            <span>🔄</span>
            <h3>Active Contracts</h3>
            <strong>{activeContracts.length}</strong>
          </div>

          <div className="admin-stat">
            <span>✓</span>
            <h3>Completed</h3>
            <strong>{completedContracts.length}</strong>
          </div>

          <div className="admin-stat">
            <span>₹</span>
            <h3>Contract Value</h3>
            <strong>₹{totalValue.toLocaleString()}</strong>
          </div>
        </div>

        <div className="admin-section">
          <h2>Recent Contracts</h2>

          {contracts.length === 0 ? (
            <p>No contracts available.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Farmer</th>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {contracts.slice(0, 10).map((contract) => (
                    <tr key={contract.id}>
                      <td>{contract.cropName}</td>
                      <td>{contract.farmer}</td>
                      <td>{contract.buyer}</td>
                      <td>{contract.quantity} {contract.unit}</td>
                      <td>₹{contract.price}</td>
                      <td><span className="table-status">{contract.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
