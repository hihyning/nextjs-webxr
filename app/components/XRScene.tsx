// This directive tells Next.js that this component runs on the client-side
// It's needed because we're using browser-specific features like WebXR
'use client';

// Import required components for XR functionality
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore, VRButton, ARButton } from '@react-three/xr';
import { OrbitControls, Grid } from '@react-three/drei';
import { Model as PottedPlant } from './PottedPlant';
import { Cube } from './Cube';
import { Flower } from './Flower';
import { FruitPlant } from './FruitPlant';
import { Tree } from './Tree';
import { SmallPlant } from './SmallPlant';

// Props interface for the XRScene component
interface XRSceneProps {
  onExitXR?: () => void; // Optional callback to exit XR mode
}

// Create XR store for managing XR state
const xrStore = createXRStore();

// XR Scene component that provides both VR and AR experiences
export function XRScene({ onExitXR }: XRSceneProps = {}) {
  return (
    // Container div that takes up the full viewport
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* 
        VR and AR Buttons
        These are the built-in buttons from @react-three/xr
        They only appear if the device supports WebXR
      */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        {/* VR Button - enters immersive VR mode */}
        <VRButton store={xrStore} />
        {/* AR Button - enters augmented reality mode */}
        <ARButton store={xrStore} />
      </div>

      {/* 
        Exit XR Button
        Allows users to return to the regular 3D view
      */}
      {onExitXR && (
        <button
          onClick={onExitXR}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Exit XR Mode
        </button>
      )}

      {/* 
        Canvas is the main React Three Fiber component that creates a 3D scene
        It sets up WebGL context and handles rendering
        camera prop sets the initial camera position [x, y, z]
      */}
      <Canvas camera={{ position: [5, 5, 5] }}>
        {/* 
          XR Provider
          This component provides XR context to all child components
        */}
        <XR store={xrStore}>
          {/* 
            XR CONTROLLERS AND HANDS
            These components handle VR/AR input devices
            Note: Controllers and Hands components are available but may require additional setup
          */}
        
        {/* 
          LIGHTING SETUP
          We use multiple light sources to create depth and visual interest
        */}
        
        {/* Ambient light provides soft, overall illumination without direction */}
        <ambientLight intensity={0.4} />
        
        {/* Directional light simulates sunlight - comes from one direction */}
        <directionalLight 
          position={[10, 10, 5]}  // Position in 3D space [x, y, z]
          intensity={1.0}         // How bright the light is
          castShadow              // Enable this light to cast shadows
        />
        
        {/* Point light radiates in all directions from a single point */}
        <pointLight 
          position={[-10, -10, -5]}  // Positioned opposite to main light
          intensity={0.5}            // Dimmer than main light
          color="#ffffff"            // Pure white light
        />
        
        {/* Spot light creates a cone of light, like a flashlight */}
        <spotLight
          position={[0, 10, 0]}  // Directly above the scene
          angle={0.3}            // Width of the light cone
          penumbra={1}           // Softness of light edges (0 = sharp, 1 = very soft)
          intensity={0.3}        // Gentle fill light
          castShadow             // Enable shadow casting
        />
        
        {/* 
          3D OBJECTS
          These are our interactive 3D elements in the scene
        */}
        
        {/* Static orange cube positioned at the origin (0, 0, 0) */}
        <Cube />
        
        {/* 
          MAIN POTTED PLANT
          Interactive potted plant in the center of the garden
          This is the focal point that can be clicked to teleport
        */}
        <PottedPlant scale={10} />
        
        {/* 
          GARDEN PLANTS
          We create a lush, full garden by placing many plants around the potted plant
          The plants are arranged in circles and random positions to create a natural garden feel
        */}
        
        {/* 
          FLOWERS - First ring around the potted plant
          Flowers add color and variety to the garden
          Positioned in a circle at varying distances
        */}
        {[...Array(20)].map((_, i) => {
          // Calculate angle for circular arrangement
          const angle = (i / 20) * Math.PI * 2;
          // Vary the distance from center for natural look
          const distance = 2.5 + Math.random() * 1.5;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          // Random rotation for variety
          const rotation = Math.random() * Math.PI * 2;
          
          return (
            <Flower 
              key={`flower-${i}`}
              position={[x, -1, z]}
              rotation={[0, rotation, 0]}
            />
          );
        })}
        
        {/* 
          FRUIT PLANTS - Second ring around the potted plant
          Fruit plants add height and colorful fruits to the garden
          Positioned further out than flowers
        */}
        {[...Array(15)].map((_, i) => {
          // Calculate angle for circular arrangement
          const angle = (i / 15) * Math.PI * 2;
          // Further out than flowers
          const distance = 4 + Math.random() * 2;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          // Random rotation for variety
          const rotation = Math.random() * Math.PI * 2;
          
          return (
            <FruitPlant 
              key={`fruit-${i}`}
              position={[x, -1, z]}
              rotation={[0, rotation, 0]}
            />
          );
        })}
        
        {/* 
          TREES - Third ring around the potted plant
          Trees add height and structure to the garden
          Positioned even further out to create a backdrop
        */}
        {[...Array(12)].map((_, i) => {
          // Calculate angle for circular arrangement
          const angle = (i / 12) * Math.PI * 2;
          // Further out than fruit plants
          const distance = 6.5 + Math.random() * 2;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          // Random rotation for variety
          const rotation = Math.random() * Math.PI * 2;
          
          return (
            <Tree 
              key={`tree-${i}`}
              position={[x, -1, z]}
              rotation={[0, rotation, 0]}
            />
          );
        })}
        
        {/* 
          SMALL PLANTS - Ground cover throughout the garden
          Small plants fill in the spaces between larger plants
          Randomly scattered throughout the garden area
        */}
        {[...Array(40)].map((_, i) => {
          // Random positions within the garden area
          // Keep them away from the very center where the potted plant is
          const angle = Math.random() * Math.PI * 2;
          const distance = 1.5 + Math.random() * 7; // From 1.5 to 8.5 units from center
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          
          return (
            <SmallPlant 
              key={`small-${i}`}
              position={[x, -1, z]}
            />
          );
        })}
        
        {/* 
          ADDITIONAL FLOWERS - Scattered throughout for extra color
          More flowers randomly placed to create a dense, colorful garden
        */}
        {[...Array(25)].map((_, i) => {
          // Random positions throughout the garden
          const angle = Math.random() * Math.PI * 2;
          const distance = 1.5 + Math.random() * 6;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          const rotation = Math.random() * Math.PI * 2;
          
          return (
            <Flower 
              key={`flower-extra-${i}`}
              position={[x, -1, z]}
              rotation={[0, rotation, 0]}
            />
          );
        })}
        
        {/* 
          ADDITIONAL FRUIT PLANTS - More fruit plants for abundance
          Extra fruit plants scattered throughout to make the garden feel full
        */}
        {[...Array(18)].map((_, i) => {
          // Random positions throughout the garden
          const angle = Math.random() * Math.PI * 2;
          const distance = 2 + Math.random() * 5;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          const rotation = Math.random() * Math.PI * 2;
          
          return (
            <FruitPlant 
              key={`fruit-extra-${i}`}
              position={[x, -1, z]}
              rotation={[0, rotation, 0]}
            />
          );
        })}
        
        {/* 
          SCENE HELPERS
          Visual aids that help users understand the 3D space
        */}
        
        {/* Grid floor provides spatial reference and depth perception */}
        <Grid 
          args={[20, 20]}           // Grid dimensions: 20x20 units
          position={[0, -1, 0]}     // Positioned 1 unit below origin
          cellSize={1}              // Each cell is 1x1 unit
          cellThickness={0.5}       // Thin lines for individual cells
          cellColor="#6f6f6f"       // Gray color for cell lines
          sectionSize={5}           // Major grid lines every 5 cells
          sectionThickness={1}      // Thicker lines for major sections
          sectionColor="#9d4b4b"    // Reddish color for section lines
          fadeDistance={25}         // Grid fades out at this distance
          fadeStrength={1}          // How quickly the fade happens
        />
        
        {/* 
          CAMERA CONTROLS
          OrbitControls allows users to navigate around the 3D scene
          - Left click + drag: Rotate camera around the scene
          - Right click + drag: Pan the camera
          - Scroll wheel: Zoom in and out
          Note: These controls are disabled in VR/AR mode
        */}
        <OrbitControls 
          enablePan={true}      // Allow panning (moving the camera)
          enableZoom={true}     // Allow zooming in/out
          enableRotate={true}   // Allow rotating around the scene
        />
        </XR>
      </Canvas>
    </div>
  );
}
