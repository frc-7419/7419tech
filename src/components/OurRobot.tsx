// 'use client'

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const OurRobot = () => {
//   // const mountRef = useRef<HTMLDivElement>(null);
//   // const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const mount = mountRef.current;
//   //   if (!mount) return;

//   //   // Scene setup
//   //   const scene = new THREE.Scene();
//   //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   //   const renderer = new THREE.WebGLRenderer({ antialias: false });
//   //   renderer.setSize(window.innerWidth, window.innerHeight);
//   //   renderer.setPixelRatio(window.devicePixelRatio * 0.5); // Lower pixel ratio for performance
//   //   mount.appendChild(renderer.domElement);

//   //   // Orbit controls
//   //   const controls = new OrbitControls(camera, renderer.domElement);
//   //   controls.enableDamping = true;
//   //   controls.dampingFactor = 0.25;
//   //   controls.enableZoom = true;

//   //   // Load a CAD model
//   //   const loader = new GLTFLoader();
//   //   loader.load('/static/mentors/Assembly 1.gltf', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
//   //     const model = gltf.scene;
//   //     scene.add(model);

//   //     // Add wireframe
//   //     model.traverse((child) => {
//   //       if ((child as THREE.Mesh).isMesh) {
//   //         const mesh = child as THREE.Mesh;
//   //         const wireframe = new THREE.WireframeGeometry(mesh.geometry);
//   //         const line = new THREE.LineSegments(wireframe);
//   //         mesh.add(line);
//   //       }
//   //     });

//   //     setLoading(false); // Model loaded, hide loading message
//   //   }, undefined, (error: any) => {
//   //     console.error(error);
//   //     setLoading(false); // Hide loading message even if there's an error
//   //   });

//   //   // Add text
//   //   const textDiv = document.createElement('div');
//   //   textDiv.style.position = 'absolute';
//   //   textDiv.style.top = '10px';
//   //   textDiv.style.width = '100%';
//   //   textDiv.style.textAlign = 'center';
//   //   textDiv.style.color = 'white';
//   //   textDiv.style.fontSize = '24px';
//   //   textDiv.style.fontWeight = 'bold';
//   //   textDiv.innerHTML = 'Our Robot';
//   //   mount.appendChild(textDiv);

//   //   // Adjust camera position to start near the object
//   //   camera.position.set(0, 0, 2);

//   //   // Animation loop
//   //   let frameId: number;
//   //   const animate = () => {
//   //     frameId = requestAnimationFrame(animate);
//   //     controls.update();
//   //     renderer.render(scene, camera);
//   //   };
//   //   animate();

//   //   // Handle window resize
//   //   const handleResize = () => {
//   //     camera.aspect = window.innerWidth / window.innerHeight;
//   //     camera.updateProjectionMatrix();
//   //     renderer.setSize(window.innerWidth, window.innerHeight);
//   //   };
//   //   window.addEventListener('resize', handleResize);

//   //   // Cleanup on unmount
//   //   return () => {
//   //     cancelAnimationFrame(frameId);
//   //     mount.removeChild(renderer.domElement);
//   //     mount.removeChild(textDiv);
//   //     window.removeEventListener('resize', handleResize);
//   //   };
//   // }, []);

//   return (
//     // <div ref={mountRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
//     //   {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Loading...</div>}
//     // </div>
//     <div className = "bg-red-400">
//       <center>
//       <Image src="/static/robot/7419robotpic.jpeg" alt="urmom" width = "500" height = "500" className="rounded"
//       style={{ borderRadius: '5%' }}
//       />

//         <h1 className = "border-dashed border-blue-50">Our Robot</h1>
//       </center>

//     </div>
//   );
// };

// export default OurRobot;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../app/styles/carousel.css"

const descriptions = [
  "The robot has a mounted Arducam camera. Using the PhotonVision library, our robot is able to identify AprilTags and their rotation and position relative to the robot. This allows the robot to estimate its pose on the field with incredible accuracy.",
  "Some key features of swerve drive are that the robot can move in all directions. This allows us to facilitate  precise movements in complex environments.",
  "Many functions of the robot, including raising the shooter, intaking a note, and running the shooter wheels to velocity, are automated to reduce stress on the driver.",
];


const OurRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      },
    },
  };
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <ChevronLeft className="bg-black text-white w-8 h-8 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />,
    nextArrow: <ChevronRight className="bg-black text-white w-8 h-8 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
  }
  
  const carouselImages = [
    "/static/robot/DSC06883.JPG",
    "/static/robot/CSC_7650.JPG",
    "/static/robot/DSC_7623.JPG",
    "/static/robot/DSC06884.JPG",
    "/static/robot/DSC06887.JPG"
  ]

  return (
    <motion.div
      className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4 overflow-hidden"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.header className="text-center mb-12" variants={itemVariants}>
        <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl ">Our Robot</h1>
        <p className="text-lg text-gray-600">
          A glimpse into our innovative robot technology.
        </p>
      </motion.header>

      <motion.div className="w-full max-w-md mb-8" variants={itemVariants}>
        
        <Card className="aspect-video w-full bg-gray-50 overflow-hidden rounded-xl border-[#ffc14a]/20">
          <Slider {...carouselSettings}>
                {carouselImages.map((src, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={src}
                      alt={`Robot image ${index + 1}`}
                      fill
                      className="object-cover z-20"
                    />
                  </div>
                ))}
          </Slider>
        </Card>
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-[#ffc14a]/10 rounded-full blur-3xl" />
        <div className="absolute -z-10 bottom-0 right-24 w-96 h-96 bg-[#ffc14a]/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="max-w-3xl text-center px-4 md:px-8"
        variants={itemVariants}
      >
        <p className="text-gray-700 text-lg mb-6">
          Our robot is designed to solve the complex problems in each year's FRC
          game. Featuring swerve and advanced vision systems, it is engineered
          for agility and precision.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          The robot showcases an innovative combination of hardware and software
          that enables it to interact seamlessly with its surroundings. As we
          continue to improve its capabilities, we aim to push the boundaries of
          robotics and automation.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 space-y-8 w-full max-w-4xl bg-[#ffb41a] p-8 rounded-3xl "
        variants={itemVariants}
      >
        <h3 className="text-3xl font-semibold text-center text-white">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Advanced Vision", "Swerve Drive", "Automatic Features"].map(
            (feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6  flex flex-col  text-center">item-center
                    <h4 className="text-xl font-semibold mb-2">{feature}</h4>
                    <p className="text-gray-600">{descriptions[index]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      <motion.div className="mt-12" variants={itemVariants}>
        <Button className="px-6 py-3 text-lg">
          <a href={"https://github.com/frc-7419/Reefscape2025"}>See Robot Code</a>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OurRobot;
