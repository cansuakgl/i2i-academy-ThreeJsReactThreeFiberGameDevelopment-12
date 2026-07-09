import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Player() {
  const playerRef = useRef();

  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    const speed = 0.1;

    if (keys.current["w"])
      playerRef.current.position.z -= speed;

    if (keys.current["s"])
      playerRef.current.position.z += speed;

    if (keys.current["a"])
      playerRef.current.position.x -= speed;

    if (keys.current["d"])
      playerRef.current.position.x += speed;
  });

  return (
    <mesh
      ref={playerRef}
      position={[0, 0.5, 0]}
      castShadow
    >
      <boxGeometry />

      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

export default Player;