import { useState } from "react";
import Navbar from "../components/Navbar";

function DeliveryTracking() {
  const [contracts, setContracts] = useState(
    JSON.parse(localStorage.getItem("contracts")) || []
  );

  function updateStatus(id, newStatus) {
    const updatedContracts = contracts.map((contract) =>
      contract.id === id
        ? { ...contract, deliveryStatus: newStatus }
        : contract
    );

    setContracts(updatedContracts);

    localStorage.setItem(
      "contracts",
      JSON.stringify(updatedContracts)
    );
  }

  const statuses = [
    "Active",
    "Ready for Delivery",
    "In Transit",
    "Delivered",
    "Completed"
  ];

  return (
    <>
      <Navbar />

      <div className="delivery-page">
        <h1>Delivery Tracking</h1>
        <p>Track the status of your contracted crops.</p>

        {contracts.length === 0 ? (
          <div className="empty-state">
            <h3>No active contracts</h3>
            <p>Your delivery tracking will appear here.</p>
          </div>
        ) : (
          <div className="delivery-list">
            {contracts.map((contract) => {
              const currentStatus =
                contract.deliveryStatus || "Active";

              return (
                <div className="delivery-card" key={contract.id}>
                  <div className="delivery-header">
                    <div>
                      <h2>{contract.cropName}</h2>
                      <p>
                        {contract.quantity} {contract.unit}
                      </p>
                    </div>

                    <span className="status-badge">
                      {currentStatus}
                    </span>
                  </div>

                  <div className="delivery-info">
                    <p>
                      <strong>Farmer:</strong> {contract.farmer}
                    </p>

                    <p>
                      <strong>Buyer:</strong> {contract.buyer}
                    </p>

                    <p>
                      <strong>Harvest Date:</strong>{" "}
                      {contract.harvestDate}
                    </p>

                    <p>
                      <strong>Agreed Price:</strong> ₹
                      {contract.price}/{contract.unit}
                    </p>
                  </div>

                  <div className="tracking">
                    {statuses.map((status, index) => {
                      const currentIndex =
                        statuses.indexOf(currentStatus);

                      return (
                        <div
                          className={`tracking-step ${
                            index <= currentIndex ? "completed" : ""
                          }`}
                          key={status}
                        >
                          <div className="tracking-dot">
                            {index <= currentIndex ? "✓" : ""}
                          </div>

                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="delivery-actions">
                    {currentStatus === "Active" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            contract.id,
                            "Ready for Delivery"
                          )
                        }
                      >
                        Mark Ready
                      </button>
                    )}

                    {currentStatus === "Ready for Delivery" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            contract.id,
                            "In Transit"
                          )
                        }
                      >
                        Start Delivery
                      </button>
                    )}

                    {currentStatus === "In Transit" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            contract.id,
                            "Delivered"
                          )
                        }
                      >
                        Mark Delivered
                      </button>
                    )}

                    {currentStatus === "Delivered" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            contract.id,
                            "Completed"
                          )
                        }
                      >
                        Complete Contract
                      </button>
                    )}

                    {currentStatus === "Completed" && (
                      <p className="completed-text">
                        ✓ Contract completed successfully
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default DeliveryTracking;
