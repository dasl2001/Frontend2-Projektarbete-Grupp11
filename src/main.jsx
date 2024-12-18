/*
Moduler och komponenter importeras
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

/*
createRoot är en metod som används för att starta en React-applikation.
Den skapar ett React Root, vilket är ett inmatningspunkt där React kopplas till DOM.
document.getElementById('root') letar efter ett HTML-element med id="root"  och anger detta som platsen där React ska rendera innehållet.
render() används för att rendera React-komponenter till DOM:en.
StrictMode> är en inbyggd React-komponent som används för att markera potentiella problem i applikationen.
<Router> används för att navigera mellan olika sidor, hämta URL-parametrar och lyssna på förändringar i URL:en.
<App /> är huvudkomponenten i applikationen och alla andra komponenter och funktioner i applikationen inkluderas eller används via denna komponent.
*/
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

