import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/img/miAnimacion.json"; // Ruta del archivo
 export const Inicio = () => {
  return (
    <div>
      <h1 className='text-9xl m-4 mb-0 text-center font-jacques'>Welcome to the library your dreams</h1>
      <Player
      src={animationData}
      className="w-72 h-72 "
      loop
      autoplay
    />
    </div>
  )
}


