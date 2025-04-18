import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlappyBird from './pages/FlappyBird';
import RPS        from './pages/RPS';

export default function Router() {
  return (
    <Routes>
      {/* alapértelmezett út: ha nincs hash, vagy csak #/ */}
      <Route path="/"      element={<FlappyBird />} />
      {/* két menüpont */}
      <Route path="flappy" element={<FlappyBird />} />
      <Route path="rps"    element={<RPS />} />
      {/* 404 helyett mindig FlappyBird */}
      <Route path="*"      element={<FlappyBird />} />
    </Routes>
  );
}
