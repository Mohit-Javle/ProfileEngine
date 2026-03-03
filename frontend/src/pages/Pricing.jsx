import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const PLANS = [
  {
    id: "plan-1",
    name: "Starter",
    price: 29,
    features: ["Basic Profile", "Email Support", "10GB Storage"],
    isPopular: false
  },
  {
    id: "plan-2",
    name: "Pro",
    price: 59,
    features: ["Verified Badge", "Priority Support", "50GB Storage", "Analytics"],
    isPopular: true
  },
  {
    id: "plan-3",
    name: "Enterprise",
    price: 199,
    features: ["Custom Domain", "247 Support", "Unlimited Storage", "API Access"],
    isPopular: false
  }
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    paymentMethod: "Credit Card",
    dateTime: ""
  });

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    // Automate Date & Time
    const now = new Date();
    const automatedDateTime = now.toISOString().slice(0, 16);

    try {
      await axios.post("http://localhost:5000/api/orders", {
        email: formData.email,
        plan: selectedPlan.name,
        amount: selectedPlan.price,
        paymentMethod: formData.paymentMethod,
        date: automatedDateTime
      });

      // Show Success Animation
      setIsSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to complete purchase. Check console for details.");
    }
  };

  return (
    <div className="container">
      <header className="pricing-hero">
        <h1>Pricing Matrix</h1>
        <p>Choose the plan that matches your evolution</p>
      </header>

      <section className="pricing-grid">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`price-card ${plan.isPopular ? "featured" : ""}`}
          >
            {plan.isPopular && <span className="badge">Most Popular</span>}

            <h2>{plan.name}</h2>
            <p className="price">${plan.price}</p>

            <ul>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button onClick={() => handleSelectPlan(plan)}>
              Select Plan
            </button>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            {!isSuccess ? (
              <>
                <button className="close-btn" onClick={handleCloseModal}>×</button>
                <h2>Unlock {selectedPlan.name} Plan</h2>
                <p className="modal-price">Total Investment: ${selectedPlan.price}</p>

                <form onSubmit={handleSubmit} className="purchase-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Crypto (ETH/BTC)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-confirm">
                    Complete Purchase
                  </button>
                </form>
              </>
            ) : (
              <div className="success-view">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
                <h3>Payment Verified!</h3>
                <p>Welcome to the {selectedPlan.name} Plan.</p>
                <p className="redirect-text">Redirecting you to dashboard...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
