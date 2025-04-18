import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="toggle-btn">
        <NavLink to="flappy" className={({isActive})=>isActive?'active':''}>
          🐦 Flappy Bird
        </NavLink>
        <NavLink to="rps" className={({isActive})=>isActive?'active':''}>
          ✊ 🖐️ ✌️
        </NavLink>
      </div>
    </div>
  );
}
