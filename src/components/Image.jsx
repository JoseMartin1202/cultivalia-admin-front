import React, { useState } from "react"

const Image = ({ src, alt }) => {

   const [loading, setLoading] = useState(true)

   const handleLoad = () => {
      setLoading(false)
   }

   return (
      <div className='size-full total-center '>
         {loading && <div className="absolute loader "></div>}
         <img
            src={src} alt={alt}
            onLoad={handleLoad}
            className='object-contain border-blue-200 border-2 max-w-full max-h-full'
         />
      </div>
   )
}

export default Image