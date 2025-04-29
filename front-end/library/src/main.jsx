import { StrictMode } from 'react';
import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Deshabilitar la consola



// Deshabilitar clic derecho
document.addEventListener("contextmenu", function(e) {
e.preventDefault();
});
//
//// Deshabilitar el atajo Ctrl + U
document.addEventListener("keydown", function(e) {
if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
 e.preventDefault();
}
});



createRoot(document.getElementById("root")).render(
<StrictMode>
 <App />
</StrictMode>,
);