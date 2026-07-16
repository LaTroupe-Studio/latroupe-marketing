/**
 * Animated line-art icons for the seven BIM service cards.
 * Animations are declared with global keyframes (consultancy.css) and are
 * paused by default; they run while the parent card is hovered
 * (.bimc-svc-card:hover .bimc-svcicon *).
 */

const stroke = {
  stroke: "#28170E",
  strokeWidth: 1.4,
  fill: "none",
  strokeLinejoin: "miter",
  strokeLinecap: "square",
} as const;

function ModellingIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <polygon points="180,50 280,105 180,160 80,105" fill="#AC6752" style={{ animation: "ltFaceTop 5.4s ease-in-out 1 both" }} />
      <polygon points="80,105 180,160 180,250 80,195" fill="#AC6752" />
      <polygon points="180,160 280,105 280,195 180,250" fill="#AC6752" />
      <g {...stroke}>
        <polygon points="80,105 180,160 180,250 80,195" />
        <polygon points="180,160 280,105 280,195 180,250" />
        <polygon points="180,50 280,105 180,160 80,105" />
        <line x1="180" y1="50" x2="180" y2="160" />
        <line x1="80" y1="105" x2="280" y2="105" />
        <line x1="80" y1="150" x2="180" y2="205" />
        <line x1="180" y1="205" x2="280" y2="150" />
      </g>
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <rect x="51" y="67" width="74" height="74" fill="#AC6752" style={{ animation: "ltGrid 9s steps(1,end) infinite" }} />
      <g {...stroke}>
        <rect x="51" y="67" width="74" height="74" />
        <rect x="143" y="67" width="74" height="74" />
        <rect x="235" y="67" width="74" height="74" />
        <rect x="51" y="159" width="74" height="74" />
        <rect x="143" y="159" width="74" height="74" />
        <rect x="235" y="159" width="74" height="74" />
        <path d="M63,131 L63,89 A42,42 0 0 1 105,131" />
        <line x1="180" y1="75" x2="180" y2="133" />
        <line x1="151" y1="104" x2="209" y2="104" />
        <circle cx="272" cy="104" r="22" />
        <line x1="63" y1="173" x2="113" y2="173" />
        <line x1="63" y1="219" x2="113" y2="219" />
        <line x1="88" y1="173" x2="88" y2="219" />
        <g transform="rotate(45 180 196)">
          <line x1="180" y1="167" x2="180" y2="225" />
          <line x1="151" y1="196" x2="209" y2="196" />
        </g>
        <path d="M252,225 L252,205 L272,205 L272,185 L292,185 L292,167" />
      </g>
    </svg>
  );
}

function ManagementIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <g {...stroke}>
        <g strokeDasharray="6 6" style={{ animation: "ltMarchIn 1.1s linear infinite" }}>
          <line x1="180" y1="148" x2="86" y2="82" />
          <line x1="180" y1="148" x2="274" y2="82" />
          <line x1="180" y1="150" x2="86" y2="220" />
          <line x1="180" y1="150" x2="274" y2="220" />
        </g>
        <rect x="52" y="66" width="54" height="38" />
        <path d="M52,66 L57,58 L79,58 L84,66" />
        <rect x="254" y="66" width="54" height="38" />
        <path d="M254,66 L259,58 L281,58 L286,66" />
        <rect x="52" y="204" width="54" height="38" />
        <path d="M52,204 L57,196 L79,196 L84,204" />
        <rect x="254" y="204" width="54" height="38" />
        <path d="M254,204 L259,196 L281,196 L286,204" />
        <path d="M135,112 L135,185 A45,13 0 0 0 225,185 L225,112" fill="#AC6752" />
        <ellipse cx="180" cy="112" rx="45" ry="13" fill="#AC6752" />
        <path d="M135,140 A45,13 0 0 0 225,140" />
        <path d="M135,163 A45,13 0 0 0 225,163" />
      </g>
    </svg>
  );
}

function BepIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <g {...stroke}>
        <rect x="96" y="50" width="168" height="200" />
        <rect x="96" y="50" width="168" height="34" fill="#AC6752" />
        <line x1="114" y1="67" x2="180" y2="67" />
        <line x1="130" y1="119" x2="130" y2="139" />
        <line x1="130" y1="157" x2="130" y2="177" />
        <line x1="130" y1="195" x2="130" y2="215" />
        <circle cx="130" cy="110" r="9" />
        <circle cx="130" cy="148" r="9" />
        <circle cx="130" cy="186" r="9" />
        <circle cx="130" cy="224" r="9" />
        <line x1="152" y1="110" x2="238" y2="110" />
        <line x1="152" y1="148" x2="238" y2="148" />
        <line x1="152" y1="186" x2="238" y2="186" />
        <line x1="152" y1="224" x2="210" y2="224" />
      </g>
      <circle cx="130" cy="110" r="9" fill="#AC6752" stroke="#28170E" strokeWidth="1.4" style={{ animation: "ltStep 8s ease-in-out infinite" }} />
    </svg>
  );
}

function CoordinationIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <g {...stroke}>
        <line x1="50" y1="90" x2="310" y2="90" />
        <line x1="50" y1="150" x2="310" y2="150" />
        <line x1="50" y1="210" x2="310" y2="210" />
        <g strokeDasharray="7 7">
          <line x1="110" y1="60" x2="110" y2="240" />
          <line x1="180" y1="60" x2="180" y2="240" />
          <line x1="250" y1="60" x2="250" y2="240" />
        </g>
        <g style={{ animation: "ltRoam 8s ease-in-out infinite" }}>
          <circle cx="180" cy="150" r="17" fill="#AC6752" />
          <line x1="180" y1="120" x2="180" y2="131" />
          <line x1="180" y1="169" x2="180" y2="180" />
          <line x1="150" y1="150" x2="161" y2="150" />
          <line x1="199" y1="150" x2="210" y2="150" />
          <line x1="159" y1="129" x2="167" y2="137" />
          <line x1="193" y1="163" x2="201" y2="171" />
          <line x1="201" y1="129" x2="193" y2="137" />
          <line x1="167" y1="163" x2="159" y2="171" />
        </g>
      </g>
    </svg>
  );
}

function EmbeddedIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <g {...stroke}>
        <circle cx="180" cy="150" r="112" strokeDasharray="6 8" />
        <line x1="162.4" y1="136.8" x2="120.8" y2="105.6" />
        <line x1="197.6" y1="136.8" x2="239.2" y2="105.6" />
        <line x1="162.4" y1="163.2" x2="120.8" y2="194.4" />
        <line x1="197.6" y1="163.2" x2="239.2" y2="194.4" />
        <circle cx="108" cy="96" r="16" />
        <circle cx="252" cy="96" r="16" />
        <circle cx="108" cy="204" r="16" />
        <circle cx="252" cy="204" r="16" />
        <circle cx="108" cy="96" r="13" fill="#AC6752" stroke="none" style={{ animation: "ltMem1 5.5s ease-in-out infinite" }} />
        <circle cx="252" cy="96" r="13" fill="#AC6752" stroke="none" style={{ animation: "ltMem2 5.5s ease-in-out infinite" }} />
        <circle cx="252" cy="204" r="13" fill="#AC6752" stroke="none" style={{ animation: "ltMem3 5.5s ease-in-out infinite" }} />
        <circle cx="108" cy="204" r="13" fill="#AC6752" stroke="none" style={{ animation: "ltMem4 5.5s ease-in-out infinite" }} />
        <circle cx="180" cy="150" r="22" fill="#AC6752" />
      </g>
    </svg>
  );
}

function DataIcon() {
  return (
    <svg className="bimc-svcicon" viewBox="0 0 360 300" aria-hidden="true">
      <g {...stroke}>
        <path d="M132,126 L132,92 L180,58 L228,92 L228,126 Z" />
        <rect x="148" y="102" width="16" height="16" fill="#AC6752" stroke="none" />
        <rect x="196" y="102" width="16" height="16" />
        <line x1="46" y1="150" x2="314" y2="150" strokeDasharray="8 8" style={{ animation: "ltMarch 1.6s linear infinite" }} />
        <g strokeDasharray="5 4">
          <path d="M132,174 L132,208 L180,242 L228,208 L228,174 Z" />
          <rect x="148" y="182" width="16" height="16" />
          <rect x="196" y="182" width="16" height="16" />
        </g>
        <g strokeDasharray="2 6">
          <line x1="150" y1="126" x2="150" y2="174" />
          <line x1="180" y1="126" x2="180" y2="174" />
          <line x1="210" y1="126" x2="210" y2="174" />
        </g>
      </g>
      <g fill="#AC6752" stroke="none">
        <circle cx="150" cy="126" r="3.4" style={{ animation: "ltFlow 2.4s linear infinite", animationDelay: "0s" }} />
        <circle cx="180" cy="126" r="3.4" style={{ animation: "ltFlow 2.4s linear infinite", animationDelay: "0.8s" }} />
        <circle cx="210" cy="126" r="3.4" style={{ animation: "ltFlow 2.4s linear infinite", animationDelay: "1.6s" }} />
      </g>
    </svg>
  );
}

/** Ordered to match content.services.items. */
export const serviceIcons = [
  ModellingIcon,
  ContentIcon,
  ManagementIcon,
  BepIcon,
  CoordinationIcon,
  EmbeddedIcon,
  DataIcon,
];
