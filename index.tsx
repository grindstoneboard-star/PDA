import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("Munters PDA: System Booting...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Munters PDA: Application successfully mounted.");
  } catch (error) {
    console.error("Munters PDA: Failed to render application:", error);
    container.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #0072bc;">Initialization Error</h2>
        <p style="color: #666;">The application encountered a problem during startup.</p>
        <code style="background: #f0f0f0; padding: 10px; border-radius: 4px; margin-top: 10px;">${error.message}</code>
      </div>
    `;
  }
} else {
  console.error("Munters PDA: Root element not found.");
}