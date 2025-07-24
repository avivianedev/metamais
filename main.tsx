import React from 'react';
import App from './App';
import { SearchProvider } from './src/context/AppContext';

export default function Main() {
  return (
    <SearchProvider>
      <App />
    </SearchProvider>
  );
}