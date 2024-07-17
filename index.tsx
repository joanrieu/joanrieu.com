import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Mesh } from "three";

function Lights() {
  return (
    <>
      <ambientLight intensity={50} color={[1, 0, 0]} />
      <pointLight position={[0, 0, 1]} intensity={100} color={[0, 0, 1]} />
      <pointLight position={[10, 10, 10]} intensity={500} color={[0, 1, 0]} />
    </>
  );
}

function Box(props) {
  const meshRef = useRef<Mesh>();
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z =
      (Math.sin(time * 0.5 + props.position[0] * 0.1) * Math.PI) / 2;
  });
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 0.05]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function CameraMover() {
  useFrame((state, delta) => {
    const camera = state.camera;
    const x = state.pointer.x;
    const y = state.pointer.y;
    camera.position.x *= 0.9;
    camera.position.x += 0.1 * x;
    camera.position.y *= 0.9;
    camera.position.y += 0.1 * y;
    camera.position.z *= 0.9;
    camera.position.z += 0.1 * (5 - (x ** 2 + y ** 2));
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Background() {
  const positions = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ];
  const spacing = 1.2;
  return (
    <Canvas>
      <CameraMover />
      <Lights />
      {positions.map((y) =>
        positions.map((x) => (
          <Box key={[x, y]} position={[x * spacing, y * spacing, 0]} />
        ))
      )}
    </Canvas>
  );
}

const el = document.getElementById("background");
createRoot(el).render(<Background />);
