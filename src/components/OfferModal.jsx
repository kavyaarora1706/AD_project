function OfferModal({ crop, onClose, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit({
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      message: formData.get("message")
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-kicker">Make an offer</p>
            <h2 id="offer-title">{crop.name}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close offer form">x</button>
        </div>

        <p className="modal-subtitle">Available: {crop.quantity} {crop.unit} at ₹{crop.expectedPrice}/{crop.unit}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="offer-price">Your price (₹ per {crop.unit})</label>
          <input id="offer-price" name="price" type="number" min="1" step="0.01" placeholder="e.g. 28" required />

          <label htmlFor="offer-quantity">Quantity ({crop.unit})</label>
          <input id="offer-quantity" name="quantity" type="number" min="1" max={crop.quantity} step="0.01" placeholder={`Up to ${crop.quantity}`} required />

          <label htmlFor="offer-message">Message to farmer</label>
          <textarea id="offer-message" name="message" rows="4" placeholder="Add delivery details or a note" required />

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            <button type="submit">Send Offer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OfferModal;
