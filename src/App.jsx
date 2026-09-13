import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddCrop from "./pages/farmer/AddCrop";
import MyContracts from "./pages/farmer/MyContracts";
import Offers from "./pages/farmer/Offers";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BrowseCrops from "./pages/buyer/BrowseCrops";
import DeliveryTracking from "./pages/DeliveryTracking";
import PaymentTracking from "./pages/PaymentTracking";
import FairPrice from "./pages/FairPrice";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";

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

        <Route
          path="/farmer/offers"
          element={<Offers />}
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

        <Route
          path="/delivery-tracking"
          element={<DeliveryTracking />}
        />

        <Route
          path="/payments"
          element={<PaymentTracking />}
        />

        <Route
          path="/fair-price"
          element={<FairPrice />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;