import { ConsultancyContent } from "./content";

/* Hover-animated line icons for the four "we adapt" rows. */
function HoursIcon() {
  return (
    <svg className="bimc-adapt-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="20.5" cy="24" r="10" stroke="#77330B" strokeWidth="0.9" />
      <circle cx="27.5" cy="24" r="10" stroke="#77330B" strokeWidth="0.9" />
      <path
        className="lens"
        d="M24 14.6 A10 10 0 0 1 24 33.4 A10 10 0 0 1 24 14.6 Z"
        fill="#AC6752"
        fillOpacity="0"
        stroke="#AC6752"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg className="bimc-adapt-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M14 14 H34 V34 H14 Z" stroke="#77330B" strokeWidth="0.9" strokeLinejoin="miter" />
      <circle cx="14" cy="14" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth="0.75" />
      <circle cx="34" cy="14" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth="0.75" />
      <circle cx="34" cy="34" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth="0.75" />
      <circle cx="14" cy="34" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth="0.75" />
      <g stroke="#AC6752" strokeWidth="0.7" strokeLinecap="butt">
        <line className="draw" x1="24" y1="24" x2="15.7" y2="15.7" pathLength={1} strokeDasharray="1" />
        <line className="draw" x1="24" y1="24" x2="32.3" y2="15.7" pathLength={1} strokeDasharray="1" />
        <line className="draw" x1="24" y1="24" x2="32.3" y2="32.3" pathLength={1} strokeDasharray="1" />
        <line className="draw" x1="24" y1="24" x2="15.7" y2="32.3" pathLength={1} strokeDasharray="1" />
      </g>
      <circle className="node" cx="24" cy="24" r="2.8" fill="#AC6752" />
    </svg>
  );
}

function InputsIcon() {
  return (
    <svg className="bimc-adapt-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="12" y="16" width="16" height="20" stroke="#77330B" strokeWidth="0.9" />
      <rect x="16" y="13" width="16" height="20" fill="#F7F6F5" stroke="#77330B" strokeWidth="0.9" />
      <g className="sheet">
        <rect x="20" y="10" width="16" height="20" fill="#F7F6F5" stroke="#AC6752" strokeWidth="0.9" />
        <line x1="24" y1="16" x2="32" y2="16" stroke="#AC6752" strokeWidth="0.75" strokeLinecap="square" />
        <line x1="24" y1="20" x2="32" y2="20" stroke="#AC6752" strokeWidth="0.75" strokeLinecap="square" />
        <line x1="24" y1="24" x2="29" y2="24" stroke="#AC6752" strokeWidth="0.75" strokeLinecap="square" />
      </g>
    </svg>
  );
}

function ControlIcon() {
  return (
    <svg className="bimc-adapt-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="12" y="14" width="24" height="20" stroke="#77330B" strokeWidth="0.9" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#77330B" strokeWidth="0.75" />
      <line x1="16" y1="24" x2="27" y2="24" stroke="#77330B" strokeWidth="0.75" />
      <line x1="16" y1="28" x2="30" y2="28" stroke="#77330B" strokeWidth="0.75" />
      <line className="scan" x1="11" y1="24" x2="37" y2="24" stroke="#AC6752" strokeWidth="1.0" strokeLinecap="square" />
    </svg>
  );
}

const adaptIcons = [HoursIcon, TeamIcon, InputsIcon, ControlIcon];

export default function Adapt({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-adapt">
      <div className="bimc-adapt-grid">
        <div className="bimc-adapt-panel">
          <div>
            <h2>{content.adapt.title}</h2>
            <p>{content.adapt.subtitle}</p>
          </div>
        </div>
        <div className="bimc-adapt-list">
          {content.adapt.items.map((item, i) => {
            const Icon = adaptIcons[i];
            return (
              <div key={item.title} className="bimc-adapt-row">
                {Icon && <Icon />}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
