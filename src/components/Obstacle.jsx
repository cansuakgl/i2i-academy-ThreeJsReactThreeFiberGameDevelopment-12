function Obstacle({ position, size }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#ef4444" metalness={0.1} roughness={0.45} />
    </mesh>
  );
}

export default Obstacle;
