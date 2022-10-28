import { useState, useRef, useEffect } from 'react'

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(480);
  
  useEffect(() => {
    if(elementRef.current && elementRef.current.scrollWidth && elementRef.current.clientWidth){
      setWidth(elementRef.current.clientWidth);
    }
    
  }, []);

  
  return { width, elementRef }; 
}

export default useSizeElement;