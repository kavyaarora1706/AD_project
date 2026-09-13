import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />

      <section className="hero">

        <div className="hero-content">

          <h1>
            Secure Markets.
            <br />
            Better Futures.
          </h1>

          <p>
            A platform connecting farmers with verified buyers
            through transparent contract farming.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="btn">
              Get Started
            </Link>

            <Link
              to="/buyer/crops"
              className="btn secondary"
            >
              Browse Crops
            </Link>

          </div>

        </div>

      </section>
    </>
  );
}

export default LandingPage;