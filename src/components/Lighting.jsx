function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} />

      <directionalLight
        position={[6, 14, 8]}
        intensity={1.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00015}
        shadow-normalBias={0.03}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
    </>
  );
}

export default Lighting;
