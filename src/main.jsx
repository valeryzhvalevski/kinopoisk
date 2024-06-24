import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/index.scss'
import { BrowserRouter} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebase from '../firebase.js';

initializeApp(firebase)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
