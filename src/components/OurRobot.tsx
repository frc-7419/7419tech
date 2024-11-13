'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const OurRobot = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 0.5); // Lower pixel ratio for performance
    mount.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Load a CAD model
    const loader = new GLTFLoader();
    loader.load('/static/mentors/Assembly 1.gltf', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
      const model = gltf.scene;
      scene.add(model);

      // Add wireframe
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const wireframe = new THREE.WireframeGeometry(mesh.geometry);
          const line = new THREE.LineSegments(wireframe);
          mesh.add(line);
        }
      });

      setLoading(false); // Model loaded, hide loading message
    }, undefined, (error: any) => {
      console.error(error);
      setLoading(false); // Hide loading message even if there's an error
    });

    // Add text
    const textDiv = document.createElement('div');
    textDiv.style.position = 'absolute';
    textDiv.style.top = '10px';
    textDiv.style.width = '100%';
    textDiv.style.textAlign = 'center';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '24px';
    textDiv.style.fontWeight = 'bold';
    textDiv.innerHTML = 'Our Robot';
    mount.appendChild(textDiv);

    // Adjust camera position to start near the object
    camera.position.set(0, 0, 2);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      mount.removeChild(renderer.domElement);
      mount.removeChild(textDiv);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Loading...</div>}
    </div>
  );
};

export default OurRobot;