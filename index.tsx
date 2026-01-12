import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Mounting Error:", err);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="color: #0072bc;">System Error</h2>
        <p style="color: #64748b;">Failed to initialize the PDA application.</p>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0072bc; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Retry Initialization
        </button>
      </div>
    `;
  }
}