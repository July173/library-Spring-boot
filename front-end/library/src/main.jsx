import { StrictMode } from 'react';
import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Deshabilitar la consola
(function() {
var noop = function() {}; 
Object.defineProperty(console, 'log', { get: noop });
Object.defineProperty(console, 'warn', { get: noop });
Object.defineProperty(console, 'error', { get: noop });
})();

// Deshabilitar clic derecho
document.addEventListener("contextmenu", function(e) {
e.preventDefault();
});

// Deshabilitar el atajo Ctrl + U
document.addEventListener("keydown", function(e) {
if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
 e.preventDefault();
}
});

// Detectar la apertura de las herramientas de desarrollo
(function() {
var threshold = 100;
var devToolsOpen = false;

var checkDevTools = function() {
 var width = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
 if (width && !devToolsOpen) {
     alert("¡No se permite el acceso a las herramientas de desarrollo!");
     devToolsOpen = true; // Evita que se repita la alerta
 }
};

setInterval(checkDevTools, 1000);  
})();

createRoot(document.getElementById("root")).render(
<StrictMode>
 <App />
</StrictMode>,
);