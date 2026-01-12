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
    console.log("Munters PDA: Application mounted successfully.");
  } catch (err) {
    console.error("Critical mounting error:", err);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="color: #0072bc;">Initialization Error</h2>
        <p style="color: #64748b;">The application could not be started.</p>
        <pre style="background: #f1f5f9; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-top: 10px; text-align: left; max-width: 80%; overflow: auto;">${err instanceof Error ? err.message : String(err)}</pre>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0072bc; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Retry</button>
      </div>
    `;
  }
}