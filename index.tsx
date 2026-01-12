import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Munters PDA: App mounted.");
  } catch (error) {
    console.error("Critical mounting error:", error);
    container.innerHTML = `
      <div style="padding: 50px; text-align: center; color: #0072bc; font-family: sans-serif;">
        <h2>Technical Initialization Error</h2>
        <p style="color: #666;">The application failed to start correctly.</p>
        <pre style="display: inline-block; padding: 10px; background: #f0f0f0; border-radius: 4px; font-size: 12px; margin-top: 10px;">${error.message}</pre>
        <br/>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #0072bc; color: white; border: none; border-radius: 4px; cursor: pointer;">Retry</button>
      </div>
    `;
  }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}