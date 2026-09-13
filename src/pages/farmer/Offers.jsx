import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { addNotification } from "../../utils/notifications";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [counterOfferId, setCounterOfferId] = useState(null);

  useEffect(() => {
    setOffers(JSON.parse(localStorage.getItem("offers")) || []);
  }, []);

  function updateOffer(id, changes) {
    const offer = offers.find((item) => item.id === id);
    const updatedOffers = offers.map((offer) =>
      offer.id === id ? { ...offer, ...changes } : offer
    );
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));

    if (offer && changes.status === "Accepted") {
      const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
      const existingContract = contracts.find(
        (contract) => contract.offerId === offer.id
      );

      if (!existingContract) {
        const crops = JSON.parse(localStorage.getItem("crops")) || [];
        const crop = crops.find((item) => item.id === offer.cropId);
        const newContract = {
          id: Date.now(),
          offerId: offer.id,
          cropName: offer.cropName,
          farmer: offer.farmer || "Farmer",
          buyer: offer.buyer,
          quantity: offer.quantity,
          unit: offer.unit,
          price: offer.price,
          harvestDate: crop?.harvestDate || "Not specified",
          status: "Active",
          deliveryStatus: "Active",
          paymentStatus: "Payment Pending"
        };

        localStorage.setItem(
          "contracts",
          JSON.stringify([...contracts, newContract])
        );
      }

      addNotification("Offer Accepted", `Your offer for ${offer.cropName} was accepted.`, "contract");
    }

    if (offer && changes.status === "Rejected") {
      addNotification("Offer Rejected", `Your offer for ${offer.cropName} was rejected.`, "offer");
    }

    if (offer && changes.status === "Countered") {
      addNotification("Counter Offer", `A counter offer was sent for ${offer.cropName}.`, "offer");
    }
  }

  function handleCounterOffer(event, offer) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const price = formData.get("counterPrice");

    if (!price) return;

    updateOffer(offer.id, {
      price,
      message: formData.get("counterMessage") || offer.message,
      status: "Countered"
    });
    setCounterOfferId(null);
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Incoming Offers</h1>
        <p>Review buyer offers and continue the conversation.</p>

        <div className="offers-list">
          {offers.length === 0 ? (
            <p>No offers received yet.</p>
          ) : (
            offers.map((offer) => (
              <article className="offer-card" key={offer.id}>
                <div>
                  <h3>{offer.cropName}</h3>
                  <p>Buyer: {offer.buyer}</p>
                  <p>Quantity: {offer.quantity} {offer.unit}</p>
                  <p>Message: {offer.message}</p>
                </div>

                <div className="offer-meta">
                  <span className="offer-status">{offer.status}</span>
                  <p>Offer: ₹{offer.price}/{offer.unit}</p>

                  {offer.status === "Pending" || offer.status === "Countered" ? (
                    <>
                      <div className="offer-actions">
                        <button type="button" onClick={() => updateOffer(offer.id, { status: "Accepted" })}>Accept</button>
                        <button type="button" className="danger" onClick={() => updateOffer(offer.id, { status: "Rejected" })}>Reject</button>
                        <button type="button" className="secondary" onClick={() => setCounterOfferId(offer.id)}>Counter</button>
                      </div>

                      {counterOfferId === offer.id && (
                        <form className="counter-form" onSubmit={(event) => handleCounterOffer(event, offer)}>
                          <input name="counterPrice" type="number" min="1" step="0.01" placeholder="New price" required />
                          <input name="counterMessage" placeholder="Message" />
                          <button type="submit">Send</button>
                        </form>
                      )}
                    </>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Offers;
