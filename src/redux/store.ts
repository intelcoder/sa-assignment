import { configureStore } from '@reduxjs/toolkit'
import cryptoTrackingReducer from 'redux/CryptoTrackingPage/reducer'

export const store = configureStore({
  reducer: {
    cryptoTracking: cryptoTrackingReducer
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
