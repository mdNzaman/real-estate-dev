import React from "react";

function VRMode({ vrTourUrl }) {
  return (
    <div className="vr-mode">
      <h3>VR Tour</h3>
      <a href={vrTourUrl} target="_blank" rel="noopener noreferrer">
        View 360° Tour
      </a>
    </div>
  );
}

export default VRMode;
