import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from "./router/MainRouter";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <MainRouter/>
        </Provider>
    </BrowserRouter>
);

