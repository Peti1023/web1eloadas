// src/pages/FlappyBird.js
import React, { useState, useEffect, useRef } from 'react';

export default function FlappyBird() {
  const containerHeight = 300;
  const pipeWidth = 50;
  const gap = 120; // lyuk mérete
  const birdSize = 20;
  const birdX = 50; // madár x pozíciója
  const pipeSpeed = 2; // cső sebessége (px/frame)

  const [birdY, setBirdY] = useState(containerHeight / 2);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const framesRef = useRef(0);

  // Madár gravitáció + ütközés ellenőrzés
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      framesRef.current += 1;
      setBirdY(y => Math.min(containerHeight - birdSize, y + 2)); // gravitáció

      // Mozgatjuk a csöveket
      setPipes(oldPipes =>
        oldPipes
          .map(pipe => ({ ...pipe, x: pipe.x - pipeSpeed }))
          .filter(pipe => pipe.x + pipeWidth > 0) // letörlés jobbra kiment csövekről
      );
    }, 20);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Új cső generálása
  useEffect(() => {
    if (gameOver) return;
    const pipeInterval = setInterval(() => {
      const topHeight = Math.random() * (containerHeight - gap - 40) + 20;
      setPipes(old => [
        ...old,
        {
          x: 500,
          topHeight,
          bottomHeight: containerHeight - gap - topHeight
        }
      ]);
    }, 2000);
    return () => clearInterval(pipeInterval);
  }, [gameOver]);

  // Ütközés és pontozás
  useEffect(() => {
    if (gameOver) return;

    pipes.forEach(pipe => {
      // Pont akkor, ha épp elhaladtunk a cső mellett
      if (
        pipe.x + pipeWidth < birdX &&
        !pipe.scored
      ) {
        setScore(s => s + 1);
        pipe.scored = true; // ne duplázzuk
      }
      // Ütközés a felső csővel
      if (
        birdX + birdSize > pipe.x &&
        birdX < pipe.x + pipeWidth &&
        (birdY < pipe.topHeight || birdY + birdSize > pipe.topHeight + gap)
      ) {
        setGameOver(true);
      }
    });
  }, [pipes, birdY, gameOver]);

  // Ugrás SPACE / kattintás
  useEffect(() => {
    const handler = e => {
      if (e.code === 'Space' || e.type === 'click') {
        if (!gameOver) {
          setBirdY(y => Math.max(0, y - 50));
        }
      }
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [gameOver]);

  const resetGame = () => {
    setPipes([]);
    setBirdY(containerHeight / 2);
    setScore(0);
    setGameOver(false);
    framesRef.current = 0;
  };

  return (
    <div className="flappy-container">
      {/* Pontszámláló mindig legfelül */}
      <div className="score-board">
        <p>⭐ Pont: {score}</p>
      </div>

      {/* Cső párok */}
      {pipes.map((pipe, idx) => (
        <React.Fragment key={idx}>
          <div
            className="flappy-pipe top"
            style={{
              left: pipe.x,
              height: pipe.topHeight,
              zIndex: 1
            }}
          />
          <div
            className="flappy-pipe bottom"
            style={{
              left: pipe.x,
              height: pipe.bottomHeight,
              zIndex: 1
            }}
          />
        </React.Fragment>
      ))}

      {/* Madár */}
      <div
        className="flappy-bird"
        style={{
          left: birdX,
          top: birdY,
          zIndex: 5
        }}
      />

      {/* Game Over + újra gomb */}
      {gameOver && (
        <div className="game-over">
          Game Over
          <br />
          <button className="btn" onClick={resetGame}>
            Újra
          </button>
        </div>
      )}
    </div>
  );
}
