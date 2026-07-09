function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
      />
    </>
  );
}

export default Lighting;