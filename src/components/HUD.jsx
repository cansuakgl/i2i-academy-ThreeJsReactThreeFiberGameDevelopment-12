function HUD({ score, gameOver, restart }) {
  return (
    <div className="hud">
      <div className="hudCard">
        <p className="label">Cube Dash</p>
        <h2>Score: {score}</h2>
        <p className="hint">Move with WASD and dodge the cubes rushing across the arena.</p>
      </div>

      {gameOver && (
        <div className="gameOver">
          <h1>Game Over</h1>
          <p>You got hit by a cube charging across the arena.</p>
          <button onClick={restart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default HUD;
