import React from 'react';
import { HashRouter } from 'react-router-dom';     // <-- HashRouter
import Navbar from './components/Navbar';
import Router from './router';
import './css/style.css';

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <a href="../index.html" className="btn-back">
          ← Vissza a főoldalra
        </a>

        <header className="app-header">
          <h1>React Játékok</h1>
        </header>

        <Navbar />

        <main id="content">
          <Router />
        </main>
      </div>
    </HashRouter>
  );
}
