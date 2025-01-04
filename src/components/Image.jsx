import React, { useState } from "react"

const Image = ({ src, alt }) => {

   const [loading, setLoading] = useState(true)

   const handleLoad = () => {
      setLoading(false)
   }

   return (
      <div className='size-full py-10 total-center'>
         {loading && <div className="absolute loader "></div>}
         <img
            src={src} alt={alt}
            onLoad={handleLoad}
            className='object-contain rounded-xl h-full'
         />
      </div>
   )
}

export default Image