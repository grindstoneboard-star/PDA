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
    console.log("Munters PDA: App successfully mounted.");
  } catch (error) {
    console.error("Critical mounting error:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #0072bc; font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="margin-bottom: 10px;">Initialization Failed</h2>
        <p style="color: #64748b; margin-bottom: 20px;">The application encountered a critical error during startup.</p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; text-align: left; max-width: 80%; overflow: auto;">
          ${error instanceof Error ? error.message : String(error)}
        </div>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 24px; background: #0072bc; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
          Retry Loading
        </button>
      </div>
    `;
  }
}