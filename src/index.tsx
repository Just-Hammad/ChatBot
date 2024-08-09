// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './app/page'; // Adjust path if needed
import './app/globals.css';


const renderWidget = () => {
  // Create a container div for the widget
  const root = document.createElement('div');
  root.id = 'chat-widget-root';
  document.body.appendChild(root);

  // Render the Page component into the new container
  ReactDOM.render(<Page />, root);
};

// Load the widget when the page is ready
window.addEventListener('load', renderWidget);
