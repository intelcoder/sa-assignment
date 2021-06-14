import React, { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import CryptoMarketPage from './pages/CryptoTrackingPage'
import Header from 'components/Header'

function App() {

  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Header />
      <CryptoMarketPage />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
