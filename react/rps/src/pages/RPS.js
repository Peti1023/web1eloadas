import React, { useState } from 'react';
const OPTIONS = ['✊', '🖐️', '✌️'];

export default function RPS() {
  const [player, setPlayer] = useState('-');
  const [cpu, setCpu] = useState('-');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);

  const play = choice => {
    const comp = OPTIONS[Math.floor(Math.random()*3)];
    setPlayer(choice);
    setCpu(comp);
    let res = 'Döntetlen';
    if ((choice==='✊'&&comp==='✌️')||(choice==='🖐️'&&comp==='✊')||(choice==='✌️'&&comp==='🖐️')) {
      res='Nyertél!'; setScore(s=>s+1);
    } else if (choice!==comp) {
      res='Gép nyert!';
    }
    setResult(res);
  };

  const reset = () => { setPlayer('-'); setCpu('-'); setResult(''); setScore(0); };

  return (
    <div className="game-board" style={{width:300,padding:'2rem'}}>
      <div className="status-bar">⭐ Pont: {score}</div>
      <h2 className="rps-title">✊ 🖐️ ✌️</h2>
      <div style={{textAlign:'center'}}>
        {OPTIONS.map(opt=>(
          <button key={opt} className="btn" onClick={()=>play(opt)}>{opt}</button>
        ))}
      </div>
      <p style={{marginTop:'1rem',textAlign:'center'}}>Te: {player} vs Gép: {cpu}</p>
      <p style={{textAlign:'center'}}>{result}</p>
      <button className="btn" onClick={reset} style={{display:'block',margin:'1rem auto'}}>Újra</button>
    </div>
  );
}