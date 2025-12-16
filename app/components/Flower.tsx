// A colorful flower component built with React Three Fiber
// This demonstrates how to create complex 3D objects by combining simple shapes
// Flowers are made of a stem (cylinder) and petals (spheres arranged in a circle)

import React, { useMemo } from 'react';
import * as THREE from 'three';

// Define the Flower component as a function that accepts group properties
// React.ComponentProps<'group'> means it accepts any props that a regular group would accept
export function Flower(props: React.ComponentProps<'group'>) {
  // Generate a random color for the flower petals
  // This makes each flower unique
  // useMemo ensures the color is only generated once when the component is created
  const petalColors = ['#ff6b9d', '#ffa500', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#f44336'];
  const petalColor = useMemo(() => {
    return petalColors[Math.floor(Math.random() * petalColors.length)];
  }, []);
  
  return (
    // group is a container that holds multiple 3D objects together
    // This allows us to position, rotate, and scale the entire flower as one unit
    <group {...props}>
      {/* 
        FLOWER STEM
        A green cylinder that represents the stem of the flower
      */}
      <mesh position={[0, 0.5, 0]}>
        {/* 
          cylinderGeometry creates a cylindrical shape
          args={[radiusTop, radiusBottom, height, radialSegments]}
          - radiusTop: 0.02 (narrow top)
          - radiusBottom: 0.02 (narrow bottom, same as top for straight stem)
          - height: 1 (1 unit tall)
          - radialSegments: 8 (8 sides around the cylinder)
        */}
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        {/* 
          Green material for the stem
          meshStandardMaterial responds to lighting realistically
        */}
        <meshStandardMaterial 
          color="#2d5016"   // Dark green color
          metalness={0.1}    // Slightly metallic
          roughness={0.8}    // Rough surface (like plant material)
        />
      </mesh>
      
      {/* 
        FLOWER PETALS
        Multiple spheres arranged in a circle to create the flower head
        We create 6 petals positioned around the top of the stem
      */}
      {[...Array(6)].map((_, i) => {
        // Calculate the angle for each petal (spread evenly in a circle)
        // 2 * Math.PI is a full circle (360 degrees)
        // Divide by 6 to get 6 evenly spaced positions
        const angle = (i / 6) * Math.PI * 2;
        // Calculate x and z positions using trigonometry (cos and sin)
        // This creates a circular arrangement
        const x = Math.cos(angle) * 0.15; // 0.15 units from center
        const z = Math.sin(angle) * 0.15;
        
        return (
          <mesh 
            key={i} 
            position={[x, 1.1, z]}  // Position at top of stem (y = 1.1)
          >
            {/* 
              sphereGeometry creates a round ball shape
              args={[radius, widthSegments, heightSegments]}
              - radius: 0.08 (size of each petal)
              - widthSegments: 8 (smoothness around the sphere)
              - heightSegments: 8 (smoothness top to bottom)
            */}
            <sphereGeometry args={[0.08, 8, 8]} />
            {/* 
              Colorful material for petals
              Each flower gets a random color from our array
            */}
            <meshStandardMaterial 
              color={petalColor}  // Random color from our array
              metalness={0.2}     // Slightly shiny
              roughness={0.6}     // Moderately smooth
            />
          </mesh>
        );
      })}
      
      {/* 
        FLOWER CENTER
        A small yellow sphere in the middle of the petals
        This represents the flower's center/stamen
      */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#ffeb3b"   // Bright yellow center
          metalness={0.3}   // Slightly metallic
          roughness={0.5}  // Smooth surface
        />
      </mesh>
    </group>
  );
}

