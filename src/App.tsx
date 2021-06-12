import React, { useEffect } from 'react';

import './App.css';
import CryptoMarketPage from './pages/CryptoMarketPage'
import Header from 'components/Header'

function App() {

  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Header />
      <CryptoMarketPage />
    </div>
  );
}

export default App;
