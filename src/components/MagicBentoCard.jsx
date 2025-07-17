import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function Bento3DCard({ children, style, className }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [pointer, setPointer] = useState([0, 0]);

  useFrame(() => {
    if (!mesh.current) return;
    // Animate rotation to pointer
    mesh.current.rotation.y += ((pointer[0] * 0.3 - mesh.current.rotation.y) * 0.15);
    mesh.current.rotation.x += ((-pointer[1] * 0.3 - mesh.current.rotation.x) * 0.15);
  });

  return (
    <mesh
      ref={mesh}
      onPointerMove={(e) => {
        const x = (e.uv.x - 0.5) * 2;
        const y = (e.uv.y - 0.5) * 2;
        setPointer([x, y]);
      }}
      onPointerOut={() => setPointer([0, 0])}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? 1.06 : 1}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[2.5, 1.2, 32, 32]} />
      <meshStandardMaterial color="white" transparent opacity={0.01} />
      <Html
        center
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        className={className}
      >
        <div
          style={{
            minWidth: "7rem",
            minHeight: "4rem",
            borderRadius: "1rem",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
            background: "inherit",
            ...style,
          }}
        >
          {children}
        </div>
      </Html>
    </mesh>
  );
}

const MagicBentoCard = (props) => (
  <div style={{ width: "220px", height: "110px", position: props.style?.position || "absolute", ...props.style }}>
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 5]} intensity={0.7} />
      <Bento3DCard {...props} />
    </Canvas>
  </div>
);

export default MagicBentoCard; 