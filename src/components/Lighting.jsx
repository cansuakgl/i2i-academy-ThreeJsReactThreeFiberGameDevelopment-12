function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight
        args={["#f8fbff", "#7c8a6b", 0.45]}
      />

      <directionalLight
        position={[0, 18, 0]}
        intensity={1.75}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.00012}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={45}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
    </>
  );
}

export default Lighting;
