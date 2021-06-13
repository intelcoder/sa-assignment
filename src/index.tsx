import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableMapSet } from "immer"
import './index.css';
import App from './App';
import { store } from 'redux/store';
import * as serviceWorker from './serviceWorker';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

enableMapSet()

 // Create a client
 export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
