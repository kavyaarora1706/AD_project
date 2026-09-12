import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddCrop from "./pages/farmer/AddCrop";
import MyContracts from "./pages/farmer/MyContracts";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BrowseCrops from "./pages/buyer/BrowseCrops";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Farmer */}
        <Route
          path="/farmer/dashboard"
          element={<FarmerDashboard />}
        />

        <Route
          path="/farmer/add-crop"
          element={<AddCrop />}
        />

        <Route
          path="/farmer/contracts"
          element={<MyContracts />}
        />

        {/* Buyer */}
        <Route
          path="/buyer/dashboard"
          element={<BuyerDashboard />}
        />

        <Route
          path="/buyer/crops"
          element={<BrowseCrops />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;