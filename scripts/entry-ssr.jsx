import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from '../src/App.jsx';

export function renderRoute(path) {
  return renderToString(
    React.createElement(StaticRouter, { location: path }, React.createElement(AppContent))
  );
}
