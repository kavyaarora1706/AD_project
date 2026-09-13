import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCrop() {

  const navigate = useNavigate();

  const [crop, setCrop] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    expectedPrice: "",
    harvestDate: "",
    location: ""
  });

  function handleChange(e) {
    setCrop({
      ...crop,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const existingCrops =
      JSON.parse(localStorage.getItem("crops")) || [];

    const newCrop = {
      id: Date.now(),
      ...crop,
      status: "Available"
    };

    localStorage.setItem(
      "crops",
      JSON.stringify([
        ...existingCrops,
        newCrop
      ])
    );

    alert("Crop listed successfully!");

    navigate("/farmer/dashboard");
  }

  return (
    <div className="form-page">

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        <h2>List Your Crop</h2>

        <label>Crop Name</label>

        <input
          name="name"
          placeholder="e.g. Wheat"
          value={crop.name}
          onChange={handleChange}
          required
        />

        <label>Quantity</label>

        <input
          type="number"
          name="quantity"
          placeholder="e.g. 500"
          value={crop.quantity}
          onChange={handleChange}
          required
        />

        <label>Unit</label>

        <select
          name="unit"
          value={crop.unit}
          onChange={handleChange}
        >
          <option value="kg">Kg</option>
          <option value="quintal">Quintal</option>
          <option value="ton">Ton</option>
        </select>

        <label>Expected Price</label>

        <input
          type="number"
          name="expectedPrice"
          placeholder="₹ per unit"
          value={crop.expectedPrice}
          onChange={handleChange}
          required
        />

        <label>Expected Harvest Date</label>

        <input
          type="date"
          name="harvestDate"
          value={crop.harvestDate}
          onChange={handleChange}
          required
        />

        <label>Location</label>

        <input
          name="location"
          placeholder="Village / District"
          value={crop.location}
          onChange={handleChange}
          required
        />

        <button type="submit">
          List Crop
        </button>

      </form>

    </div>
  );
}

export default AddCrop;