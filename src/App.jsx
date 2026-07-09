import { Canvas } from "@react-three/fiber";
import "./App.css";

import Ground from "./components/Ground";
import Lighting from "./components/Lighting";
import Player from "./components/Player";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [0, 5, 10],
          fov: 60,
        }}
      >
        <Lighting />
        <Ground />
        <Player />
      </Canvas>
    </>
  );
}

export default App;