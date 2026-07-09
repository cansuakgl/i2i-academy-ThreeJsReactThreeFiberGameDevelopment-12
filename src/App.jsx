import "./App.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import Ground from "./components/Ground";
import Lighting from "./components/Lighting";
import Player from "./components/Player";
import Obstacle from "./components/Obstacle";
import HUD from "./components/HUD";

const ARENA_LIMIT = 8.5;
const PLAYER_SIZE = 1;
const OBSTACLE_SIZE = 1.1;
const OBSTACLE_HEIGHT = OBSTACLE_SIZE / 2;
const OBSTACLE_START_Z = -12;
const OBSTACLE_END_Z = 12;
const OBSTACLE_SPEED = 7;

function GameLoop({ gameOver, obstaclesRef, playerRef, onGameOver, onPass }) {
  useFrame((_, delta) => {
    if (gameOver || !playerRef.current) {
      return;
    }

    const playerPosition = playerRef.current.position;
    const nextObstacles = [];
    let collided = false;

    for (const obstacle of obstaclesRef.current) {
      const nextZ = obstacle.z + obstacle.speed * delta;
      const halfSize = obstacle.size / 2;

      const collidesX =
        Math.abs(playerPosition.x - obstacle.x) <
        PLAYER_SIZE / 2 + halfSize;
      const collidesY =
        Math.abs(playerPosition.y - obstacle.y) <
        PLAYER_SIZE / 2 + halfSize;
      const collidesZ =
        Math.abs(playerPosition.z - nextZ) <
        PLAYER_SIZE / 2 + halfSize;

      if (collidesX && collidesY && collidesZ) {
        collided = true;
        break;
      }

      if (nextZ <= OBSTACLE_END_Z) {
        nextObstacles.push({
          ...obstacle,
          z: nextZ,
        });
      } else {
        onPass(obstacle.id);
      }
    }

    if (collided) {
      onGameOver();
      return;
    }

    obstaclesRef.current = nextObstacles;
  });

  return null;
}

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const playerRef = useRef();
  const obstaclesRef = useRef([]);
  const obstacleIdRef = useRef(0);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    if (gameOver) {
      return undefined;
    }

    const interval = setInterval(() => {
      obstacleIdRef.current += 1;

      const nextObstacle = {
        id: obstacleIdRef.current,
        x: Math.random() * ARENA_LIMIT * 2 - ARENA_LIMIT,
        y: OBSTACLE_HEIGHT,
        z: OBSTACLE_START_Z,
        size: OBSTACLE_SIZE,
        speed: OBSTACLE_SPEED,
      };

      setObstacles((current) => [...current, nextObstacle]);
    }, 850);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      return undefined;
    }

    const syncInterval = setInterval(() => {
      setObstacles([...obstaclesRef.current]);
    }, 1000 / 30);

    return () => clearInterval(syncInterval);
  }, [gameOver]);

  function handlePassedObstacle(id) {
    obstaclesRef.current = obstaclesRef.current.filter((obstacle) => obstacle.id !== id);
    setObstacles([...obstaclesRef.current]);
    setScore((currentScore) => currentScore + 1);
  }

  function restart() {
    setScore(0);
    setGameOver(false);
    setObstacles([]);
    obstaclesRef.current = [];
    obstacleIdRef.current = 0;

    if (playerRef.current) {
      playerRef.current.position.set(0, 0.5, 0);
    }
  }

  return (
    <>
      <HUD
        score={score}
        gameOver={gameOver}
        restart={restart}
      />

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 10, 14],
          fov: 50,
        }}
      >
        <color attach="background" args={["skyblue"]} />

        <Lighting />

        <Ground />

        <Player
          playerRef={playerRef}
          disabled={gameOver}
          limit={ARENA_LIMIT}
        />

        {obstacles.map((o) => (
          <Obstacle
            key={o.id}
            position={[o.x, o.y, o.z]}
            size={o.size}
          />
        ))}

        <GameLoop
          obstaclesRef={obstaclesRef}
          playerRef={playerRef}
          gameOver={gameOver}
          onGameOver={() => setGameOver(true)}
          onPass={handlePassedObstacle}
        />
      </Canvas>
    </>
  );
}

export default App;
