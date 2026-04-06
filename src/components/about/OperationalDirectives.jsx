export default function OperationalDirectives() {
  return (
    <section className="directives-section">
      <div className="container">
        <div className="section-title">
          <h2>OPERATIONAL DIRECTIVES</h2>
          <div className="section-title-underline" />
        </div>

        <div className="directives-grid">
          {/* Mission */}
          <div className="directive-card">
            <div className="directive-tag">&gt;&gt; DIRECTIVE_001: MISSION</div>
            <h3>UNCOMPROMISING SAFETY</h3>
            <p className="directive-desc">
              Praise Security and Investigation Agency Inc. shall
              provide, teach, and train security personnel to fear
              God above all, to deliver consistent quality service,
              and to become well-disciplined, honest, and career-
              oriented security professionals — thereby ensuring
              continuous client satisfaction.
            </p>
          </div>

          {/* Vision */}
          <div className="directive-card">
            <div className="directive-tag">&gt;&gt; DIRECTIVE_002: VISION</div>
            <h3>THE STANDARD OF DEFENSE</h3>
            <p className="directive-desc">
              Praise Security and Investigation Agency Inc. shall
              be recognized as a competent and responsive
              organization in the security service industry —
              committed to the Glory of God and dedicated to
              serving His people and the nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
