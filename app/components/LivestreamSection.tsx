import '../styles/livestream.css';

export default function LivestreamSection() {
  return (
    <section className="livestream-section">
      <div className="livestream-container">
        <h2 className="livestream-title">Live Events</h2>
        <div className="livestream-player">
          <div className="livestream-placeholder">
            Livestream Player Ready (iframe can be embedded here)
          </div>
        </div>
      </div>
    </section>
  );
}
