import { configureStore } from '@reduxjs/toolkit'
import cryptoMarketPageReducer from 'redux/CryptoMarketPage/reducer'

export const store = configureStore({
  reducer: {
    cryptoMarketData: cryptoMarketPageReducer
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
