import React, { useEffect, useRef } from "react";
import * as PANOLENS from "panolens";
import * as THREE from "three";
import "./VRView.css";

function VRView({ panoramaUrl }) {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!panoramaUrl || !containerRef.current) return;

    // Create panorama
    const panorama = new PANOLENS.ImagePanorama(panoramaUrl);

    // Create viewer
    const viewer = new PANOLENS.Viewer({
      container: containerRef.current,
      controlBar: true,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      cameraFov: 80,
    });

    viewer.add(panorama);
    viewerRef.current = viewer;

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
      }
    };
  }, [panoramaUrl]);

  return (
    <div className="vr-container">
      <div ref={containerRef} className="panorama-viewer"></div>
      <div className="vr-controls">
        <button className="vr-button">Enter VR Mode</button>
      </div>
    </div>
  );
}

export default VRView;
