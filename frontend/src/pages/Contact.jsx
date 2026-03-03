import "./Contact.css";

export default function Contact() {
  return (
    <div className="container">
      <header className="contact-hero">
        <h1>Connect With US</h1>
        <p>Send a signal — our system will respond</p>
      </header>

      <section className="contact-layout">
        {/* LEFT INFO */}
        <div className="contact-info glass-card">
          <h2>Communication Channel</h2>
          <p>
            We’re always listening. Whether it’s feedback, collaboration,
            or innovation — transmit your message.
          </p>

          <div className="info-item">
            <span>📡 Email</span>
            <p>mohitjavle123@gmail.com</p>
          </div>

          <div className="info-item">
            <span>🌐 Network</span>
            <p>Global · Always Online</p>
          </div>

          <div className="info-item">
            <span>⚡ Response Time</span>
            <p>&lt; 24 hours</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form glass-card">
          <h2>Transmit Message</h2>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message…" rows="5"></textarea>

          <button type="submit">Send Signal</button>
        </form>
      </section>
    </div>
  );
}
