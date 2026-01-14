import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">VQSSLots</div>
          <p style={{ color: '#a8c5ff', fontSize: '0.95rem' }}>
            Next-generation gaming platform powered by neon glass aesthetics.
          </p>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Leaderboard</a></li>
            <li><a href="#">Tournaments</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Affiliates</h3>
          <ul>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Commission Structure</a></li>
            <li><a href="#">Marketing Materials</a></li>
            <li><a href="#">Partner Dashboard</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 VQSSLots. All rights reserved.</p>
      </div>
    </footer>
  );
}
