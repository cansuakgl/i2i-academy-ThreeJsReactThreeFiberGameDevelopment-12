import "./App.css";
import { Canvas } from "@react-three/fiber";

import Ground from "./components/Ground";
import Lighting from "./components/Lighting";
import Player from "./components/Player";

function App() {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 8, 10],
        fov: 60,
      }}
    >
      <color attach="background" args={["#87CEEB"]} />

      <Lighting />

      <Ground />

      <Player />
    </Canvas>
  );
}

export default App;