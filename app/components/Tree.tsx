// A simple tree component built with React Three Fiber
// This demonstrates how to create trees using cones and cylinders
// Trees have a brown trunk (cylinder) and green foliage (cone)

import React, { useMemo } from 'react';

// Define the Tree component as a function that accepts group properties
export function Tree(props: React.ComponentProps<'group'>) {
  // Random size variation to make trees look more natural
  // Each tree will be slightly different in size
  // useMemo ensures the size is only calculated once when the component is created
  const sizeVariation = useMemo(() => {
    return 0.8 + Math.random() * 0.6; // Between 0.8 and 1.4
  }, []);
  
  return (
    // group container for the entire tree
    <group {...props}>
      {/* 
        TREE TRUNK
        A brown cylinder that represents the main trunk of the tree
      */}
      <mesh position={[0, sizeVariation * 0.4, 0]}>
        {/* 
          cylinderGeometry creates the trunk
          args={[radiusTop, radiusBottom, height, radialSegments]}
          - radiusTop: 0.05 (slightly narrower at top)
          - radiusBottom: 0.07 (wider at bottom for stability)
          - height: sizeVariation * 0.8 (proportional to tree size)
          - radialSegments: 8 (8 sides for smoothness)
        */}
        <cylinderGeometry args={[0.05, 0.07, sizeVariation * 0.8, 8]} />
        {/* 
          Brown material for the trunk
        */}
        <meshStandardMaterial 
          color="#654321"   // Brown color like tree bark
          metalness={0.1}   // Not very metallic
          roughness={0.9}  // Rough surface like bark
        />
      </mesh>
      
      {/* 
        TREE FOLIAGE
        A green cone that represents the leafy top of the tree
        Positioned at the top of the trunk
      */}
      <mesh position={[0, sizeVariation * 0.8 + 0.4, 0]}>
        {/* 
          coneGeometry creates the leafy top
          args={[radius, height, radialSegments]}
          - radius: 0.4 * sizeVariation (proportional to tree size)
          - height: 0.8 * sizeVariation (proportional to tree size)
          - radialSegments: 8 (8 sides for smoothness)
        */}
        <coneGeometry args={[0.4 * sizeVariation, 0.8 * sizeVariation, 8]} />
        {/* 
          Green material for the foliage
        */}
        <meshStandardMaterial 
          color="#2d5016"   // Dark green color for leaves
          metalness={0.1}   // Slightly metallic
          roughness={0.8}   // Rough surface like leaves
        />
      </mesh>
    </group>
  );
}

