import image from "../../images/spinloader.svg"
import './SpinnerLoader.css'

    //. Side effects are anything that interacts with the outside world, such as:
    //Fetching data from an API
    // Directly manipulating the DOM (e.g., setting focus, adding event listeners)
    //Setting up subscriptions or timers
    import React, { useEffect, useState } from "react";

    export default function SpinnerLoader() {
      // Initialize state variables

      const [showImg, setShowImg] = useState(true);  // Show image by default
  
      const [text, setText] = useState('');          // Initialize with an empty string
    
      // Side effect for setting a timeout to switch from spinner to text
      useEffect(() => {
        const timer = setTimeout(() => {
          setShowImg(false);     // Hide the image after 3 seconds
         
        }, 3500);
    
        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
      }, []);
    

      return (
        <>
        {showImg && (
          <div className="loader" >
              <img src={image} alt="Loading spinner" />
          </div>
            )}
        </>
      );
    }
    