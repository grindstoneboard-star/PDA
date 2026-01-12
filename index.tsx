import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Basic safety check for the root element
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
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h2 style="color: #0072bc;">Initialization Error</h2>
        <p>The application could not be started.</p>
        <pre style="background: #f1f1f1; padding: 10px; border-radius: 4px; display: inline-block;">${err.message}</pre>
      </div>
    `;
  }
}