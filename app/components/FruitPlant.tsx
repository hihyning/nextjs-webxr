// A fruit-bearing plant component built with React Three Fiber
// This demonstrates how to create trees with fruits using cones and spheres
// Fruit plants have a trunk (cylinder), leaves (cone), and fruits (spheres)

import React, { useMemo } from 'react';

// Define the FruitPlant component as a function that accepts group properties
export function FruitPlant(props: React.ComponentProps<'group'>) {
  // Different fruit colors to make variety in the garden
  // useMemo ensures these values are only generated once when the component is created
  const fruitColors = ['#ff4444', '#ff8800', '#ffaa00', '#ff6b35'];
  const fruitColor = useMemo(() => {
    return fruitColors[Math.floor(Math.random() * fruitColors.length)];
  }, []);
  
  // Random height variation to make plants look more natural
  // useMemo ensures the height is only calculated once
  const heightVariation = useMemo(() => {
    return 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
  }, []);
  
  return (
    // group container for the entire fruit plant
    <group {...props}>
      {/* 
        PLANT TRUNK/STEM
        A brown cylinder that represents the main stem of the fruit plant
      */}
      <mesh position={[0, heightVariation * 0.5, 0]}>
        {/* 
          cylinderGeometry creates the trunk
          args={[radiusTop, radiusBottom, height, radialSegments]}
          - radiusTop: 0.03 (slightly narrower at top)
          - radiusBottom: 0.04 (wider at bottom for stability)
          - height: heightVariation (varies per plant)
          - radialSegments: 8 (8 sides)
        */}
        <cylinderGeometry args={[0.03, 0.04, heightVariation, 8]} />
        {/* 
          Brown material for the trunk/stem
        */}
        <meshStandardMaterial 
          color="#8b4513"   // Brown color like tree bark
          metalness={0.1}   // Not very metallic
          roughness={0.9}   // Rough surface like bark
        />
      </mesh>
      
      {/* 
        PLANT LEAVES/TOP
        A green cone that represents the leafy top of the plant
        Positioned at the top of the trunk
      */}
      <mesh position={[0, heightVariation + 0.3, 0]}>
        {/* 
          coneGeometry creates a cone shape
          args={[radius, height, radialSegments]}
          - radius: 0.25 (width of the leafy top)
          - height: 0.6 (height of the leaves)
          - radialSegments: 8 (8 sides for smoothness)
        */}
        <coneGeometry args={[0.25, 0.6, 8]} />
        {/* 
          Green material for the leaves
        */}
        <meshStandardMaterial 
          color="#4caf50"   // Green color for leaves
          metalness={0.1}   // Slightly metallic
          roughness={0.7}  // Moderately rough like leaves
        />
      </mesh>
      
      {/* 
        FRUITS
        Multiple colorful spheres attached to the plant
        We create 4-6 fruits positioned around the leafy top
        useMemo ensures the fruit array is only created once
      */}
      {useMemo(() => {
        const fruitCount = 4 + Math.floor(Math.random() * 3);
        return [...Array(fruitCount)].map((_, i) => {
          // Calculate random positions around the plant
          // This makes fruits appear at different heights and angles
          const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
          const radius = 0.15 + Math.random() * 0.1; // Distance from center
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = heightVariation + 0.2 + Math.random() * 0.4; // Random height
        
        return (
          <mesh 
            key={i} 
            position={[x, y, z]}
          >
            {/* 
              sphereGeometry creates a round fruit
              args={[radius, widthSegments, heightSegments]}
              - radius: 0.06 (size of each fruit)
              - widthSegments: 8 (smoothness)
              - heightSegments: 8 (smoothness)
            */}
            <sphereGeometry args={[0.06, 8, 8]} />
            {/* 
              Colorful material for fruits
              Each plant gets a random fruit color
            */}
            <meshStandardMaterial 
              color={fruitColor}  // Random fruit color
              metalness={0.3}     // Slightly shiny like fruit skin
              roughness={0.4}     // Smooth surface
            />
          </mesh>
        );
        });
      }, [heightVariation, fruitColor])}
    </group>
  );
}

