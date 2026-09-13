import { useState } from "react";
import Navbar from "../components/Navbar";

function PaymentTracking() {
  const [contracts, setContracts] = useState(
    JSON.parse(localStorage.getItem("contracts")) || []
  );

  function updatePayment(id, newStatus) {
    const updatedContracts = contracts.map((contract) =>
      contract.id === id
        ? {
            ...contract,
            paymentStatus: newStatus,
            paymentDate:
              newStatus === "Payment Received"
                ? new Date().toLocaleDateString()
                : contract.paymentDate
          }
        : contract
    );

    setContracts(updatedContracts);

    localStorage.setItem(
      "contracts",
      JSON.stringify(updatedContracts)
    );
  }

  return (
    <>
      <Navbar />

      <div className="payment-page">
        <h1>Payment Tracking</h1>
        <p>Track payments for your farming contracts.</p>

        {contracts.length === 0 ? (
          <div className="empty-state">
            <h3>No contracts found</h3>
            <p>Payments will appear here once a contract is created.</p>
          </div>
        ) : (
          <div className="payment-list">
            {contracts.map((contract) => {
              const paymentStatus =
                contract.paymentStatus || "Payment Pending";

              const totalAmount =
                Number(contract.quantity) *
                Number(contract.price);

              return (
                <div className="payment-card" key={contract.id}>
                  <div className="payment-header">
                    <div>
                      <h2>{contract.cropName}</h2>

                      <p>
                        {contract.quantity} {contract.unit}
                      </p>
                    </div>

                    <span className="payment-status">
                      {paymentStatus}
                    </span>
                  </div>

                  <div className="payment-details">
                    <p>
                      <strong>Farmer:</strong>{" "}
                      {contract.farmer}
                    </p>

                    <p>
                      <strong>Buyer:</strong>{" "}
                      {contract.buyer}
                    </p>

                    <p>
                      <strong>Price:</strong> ₹
                      {contract.price}/{contract.unit}
                    </p>

                    <p>
                      <strong>Total Amount:</strong> ₹
                      {totalAmount}
                    </p>

                    {contract.paymentDate && (
                      <p>
                        <strong>Payment Date:</strong>{" "}
                        {contract.paymentDate}
                      </p>
                    )}
                  </div>

                  <div className="payment-actions">
                    {paymentStatus === "Payment Pending" && (
                      <button
                        onClick={() =>
                          updatePayment(
                            contract.id,
                            "Payment Initiated"
                          )
                        }
                      >
                        Initiate Payment
                      </button>
                    )}

                    {paymentStatus === "Payment Initiated" && (
                      <button
                        onClick={() =>
                          updatePayment(
                            contract.id,
                            "Payment Received"
                          )
                        }
                      >
                        Mark Payment Received
                      </button>
                    )}

                    {paymentStatus === "Payment Received" && (
                      <p className="payment-complete">
                        ✓ Payment completed successfully
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

export default PaymentTracking;
