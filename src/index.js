import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './App';
import { AnimatePresence } from 'framer-motion';
import { persistor, store } from './redux/store';
import { app } from './firebase.config';
import { PersistGate } from 'redux-persist/integration/react';
import CartContextProvider from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store} app={app}>
        <PersistGate loading={"loading"} persistor={persistor}>
            <CartContextProvider>
                <Router>
                    <AnimatePresence>
                        <App/>
                    </AnimatePresence>
                </Router>
            </CartContextProvider>
        </PersistGate>
    </Provider>
);