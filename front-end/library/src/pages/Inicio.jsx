import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/img/miAnimacion.json"; // Ruta del archivo
 export const Inicio = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <h1 className="text-4xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl text-center font-jacques">
      Welcome to the library of your dreams
    </h1>
    <Player
      src={animationData}
      className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 "
      loop
      autoplay
    />
  </div>
  
  )
}


