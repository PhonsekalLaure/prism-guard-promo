import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'INITIALIZING SECURE PROTOCOL...',
  'VERIFYING CREDENTIALS...',
  'LOADING DATABASE...',
  'ENCRYPTING CHANNEL...',
  'SYSTEM READY.',
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Drive progress from 0 → 100 over ~2.4 s with easing
    const start = performance.now();
    const duration = 2400;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));

      // Advance boot lines proportionally
      const lineCount = BOOT_LINES.length;
      setLineIndex(Math.min(Math.floor(eased * lineCount), lineCount - 1));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Brief pause then exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onDone?.(), 700);
        }, 400);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loading-screen${exiting ? ' loading-screen--exit' : ''}`}>
      {/* Animated grid lines */}
      <div className="ls-grid" />

      {/* Scanning line */}
      <div className="ls-scanline" />

      {/* Corner brackets */}
      <span className="ls-corner ls-corner--tl" />
      <span className="ls-corner ls-corner--tr" />
      <span className="ls-corner ls-corner--bl" />
      <span className="ls-corner ls-corner--br" />

      <div className="ls-center">
        {/* Shield icon */}
        <div className="ls-shield">
          <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer shield */}
            <path
              d="M40 4L8 18V42C8 60.4 22.1 77.6 40 82C57.9 77.6 72 60.4 72 42V18L40 4Z"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="rgba(9,50,105,0.6)"
              className="ls-shield-outer"
            />
            {/* Inner shield */}
            <path
              d="M40 14L18 24V42C18 55.4 27.8 67.4 40 71C52.2 67.4 62 55.4 62 42V24L40 14Z"
              stroke="rgba(230,178,21,0.4)"
              strokeWidth="1"
              fill="rgba(9,50,105,0.4)"
              className="ls-shield-inner"
            />
            {/* Checkmark / lock */}
            <path
              d="M28 42l8 8 16-16"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ls-check"
            />
          </svg>
        </div>

        {/* Logo wordmark */}
        <div className="ls-logo">
          PRAISE <span className="gold">SECURITY</span>
        </div>

        {/* Boot terminal lines */}
        <div className="ls-terminal">
          {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <div
              key={i}
              className={`ls-terminal-line${i === lineIndex ? ' ls-terminal-line--active' : ''}`}
            >
              <span className="ls-prompt">{'>'}</span> {line}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="ls-progress-wrap">
          <div className="ls-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="ls-progress-label">
          <span className="ls-pct">{progress}%</span>
          <span className="ls-status">SECURE CHANNEL ESTABLISHING</span>
        </div>
      </div>
    </div>
  );
}
