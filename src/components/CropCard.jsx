function CropCard({ crop, onOffer }) {

  return (
    <div className="crop-card">

      <div className="crop-header">

        <h3>{crop.name}</h3>

        <span>
          {crop.status}
        </span>

      </div>

      <p>
        Quantity: {crop.quantity} {crop.unit}
      </p>

      <p>
        Expected Price:
        ₹{crop.expectedPrice}/{crop.unit}
      </p>

      <p>
        Harvest:
        {crop.harvestDate}
      </p>

      <p>
        📍 {crop.location}
      </p>

      <button onClick={() => onOffer(crop)}>
        Make Offer
      </button>

    </div>
  );
}

export default CropCard;