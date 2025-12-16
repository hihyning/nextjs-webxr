// A small ground-covering plant component built with React Three Fiber
// This demonstrates how to create simple decorative plants
// Small plants are made of a few small spheres arranged together

import React, { useMemo } from 'react';

// Define the SmallPlant component as a function that accepts group properties
export function SmallPlant(props: React.ComponentProps<'group'>) {
  // Random green shades to add variety
  // useMemo ensures the color is only generated once when the component is created
  const greenShades = ['#4caf50', '#2d5016', '#66bb6a', '#388e3c'];
  const plantColor = useMemo(() => {
    return greenShades[Math.floor(Math.random() * greenShades.length)];
  }, []);
  
  return (
    // group container for the small plant
    <group {...props}>
      {/* 
        SMALL PLANT CLUSTER
        Multiple small spheres arranged in a cluster
        This creates a bushy, ground-covering plant effect
        useMemo ensures the cluster is only created once
      */}
      {useMemo(() => {
        const clusterSize = 5 + Math.floor(Math.random() * 4);
        return [...Array(clusterSize)].map((_, i) => {
          // Random positions within a small area to create a natural cluster
          const x = (Math.random() - 0.5) * 0.2; // Random x within small range
          const z = (Math.random() - 0.5) * 0.2; // Random z within small range
          const y = Math.random() * 0.15; // Random height for variation
        
        return (
          <mesh 
            key={i} 
            position={[x, y, z]}
          >
            {/* 
              sphereGeometry creates a small round plant part
              args={[radius, widthSegments, heightSegments]}
              - radius: 0.05 + random variation (small spheres)
              - widthSegments: 6 (fewer segments for performance)
              - heightSegments: 6 (fewer segments for performance)
            */}
            <sphereGeometry args={[0.05 + Math.random() * 0.03, 6, 6]} />
            {/* 
              Green material for the plant
            */}
            <meshStandardMaterial 
              color={plantColor}  // Random green shade
              metalness={0.1}    // Not very metallic
              roughness={0.8}    // Rough surface like plant material
            />
          </mesh>
        );
        });
      }, [plantColor])}
    </group>
  );
}

