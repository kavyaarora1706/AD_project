import { useState } from "react";
import Navbar from "../components/Navbar";

function FairPrice() {
  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    unit: "quintal",
    location: "",
    harvestDate: "",
    marketPrice: ""
  });

  const [result, setResult] = useState(null);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function calculatePrice(e) {
    e.preventDefault();

    const marketPrice = Number(form.marketPrice);
    const quantity = Number(form.quantity);

    if (!marketPrice || !quantity) {
      alert("Please enter valid price and quantity.");
      return;
    }

    let adjustment = 0;
    let reason = [];

    if (quantity >= 100) {
      adjustment += 0.03;
      reason.push("large quantity");
    }

    if (form.location.toLowerCase().includes("pune")) {
      adjustment += 0.02;
      reason.push("local market demand");
    }

    if (form.harvestDate) {
      const harvest = new Date(form.harvestDate);
      const today = new Date();
      const days = (harvest - today) / (1000 * 60 * 60 * 24);

      if (days > 60) {
        adjustment += 0.04;
        reason.push("future harvest availability");
      }
    }

    const recommendedPrice = marketPrice * (1 + adjustment);
    const lowerPrice = recommendedPrice * 0.95;
    const upperPrice = recommendedPrice * 1.05;

    setResult({
      recommended: Math.round(recommendedPrice),
      lower: Math.round(lowerPrice),
      upper: Math.round(upperPrice),
      reason
    });
  }

  return (
    <>
      <Navbar />

      <div className="fair-price-page">
        <div className="fair-price-container">
          <div className="fair-price-intro">
            <span className="ai-badge">AI PRICE ASSISTANT</span>
            <h1>Find a Fair Contract Price</h1>
            <p>
              Get a recommended price using market price,
              quantity, location and harvest timing.
            </p>
          </div>

          <form className="fair-price-card" onSubmit={calculatePrice}>
            <h2>Crop Details</h2>

            <label>Crop</label>
            <select name="crop" value={form.crop} onChange={handleChange} required>
              <option value="">Select Crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Soybean">Soybean</option>
              <option value="Maize">Maize</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="e.g. 500"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <label>Unit</label>
            <select name="unit" value={form.unit} onChange={handleChange}>
              <option value="kg">Kg</option>
              <option value="quintal">Quintal</option>
              <option value="ton">Ton</option>
            </select>

            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Pune"
              value={form.location}
              onChange={handleChange}
              required
            />

            <label>Expected Harvest Date</label>
            <input
              type="date"
              name="harvestDate"
              value={form.harvestDate}
              onChange={handleChange}
              required
            />

            <label>Current Market Price</label>
            <input
              type="number"
              name="marketPrice"
              placeholder="₹ per unit"
              value={form.marketPrice}
              onChange={handleChange}
              required
            />

            <button type="submit">Calculate Fair Price</button>
          </form>

          {result && (
            <div className="price-result">
              <div className="result-heading">
                <span>AI Recommendation</span>
                <h2>{form.crop}</h2>
              </div>

              <div className="recommended-price">
                <p>Recommended Contract Price</p>
                <h1>
                  ₹{result.recommended}
                  <span>/{form.unit}</span>
                </h1>
              </div>

              <div className="price-range">
                <div>
                  <span>Minimum</span>
                  <strong>₹{result.lower}</strong>
                </div>
                <div>
                  <span>Recommended</span>
                  <strong>₹{result.recommended}</strong>
                </div>
                <div>
                  <span>Maximum</span>
                  <strong>₹{result.upper}</strong>
                </div>
              </div>

              <div className="price-explanation">
                <h3>Why this price?</h3>
                <p>
                  The recommendation starts from the current
                  market price and adjusts it based on the
                  available crop information.
                </p>

                {result.reason.length > 0 ? (
                  <ul>
                    {result.reason.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    The recommendation is based mainly on
                    the current market price.
                  </p>
                )}
              </div>

              <button
                className="use-price-btn"
                onClick={() => {
                  localStorage.setItem(
                    "recommendedPrice",
                    JSON.stringify({
                      crop: form.crop,
                      price: result.recommended,
                      unit: form.unit
                    })
                  );

                  alert("Recommended price saved!");
                }}
              >
                Use This Price
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FairPrice;
