function Player() {
  return (
    <mesh
      position={[0, 0.5, 0]}
      castShadow
    >
      <boxGeometry />

      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

export default Player;