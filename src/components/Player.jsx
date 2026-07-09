import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Player({ playerRef, disabled, limit }) {
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

  useFrame((_, delta) => {
    if (!playerRef.current || disabled) {
      return;
    }

    const speed = 7 * delta;

    if (keys.current["w"]) playerRef.current.position.z -= speed;
    if (keys.current["s"]) playerRef.current.position.z += speed;
    if (keys.current["a"]) playerRef.current.position.x -= speed;
    if (keys.current["d"]) playerRef.current.position.x += speed;

    playerRef.current.position.x = Math.max(
      -limit,
      Math.min(limit, playerRef.current.position.x)
    );

    playerRef.current.position.z = Math.max(
      -limit,
      Math.min(limit, playerRef.current.position.z)
    );
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 0]} castShadow>
      <boxGeometry />
      <meshStandardMaterial color="#2563eb" metalness={0.1} roughness={0.35} />
    </mesh>
  );
}

export default Player;
