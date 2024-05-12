"use client"
import React, { useState } from 'react';

function Page() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000); 
  };

  return (
    <div>
      <style jsx>{`
        .box {
          width: 100px;
          height: 100px;
          background-color: blue;
          transition: transform 1s ease;
        }

        .move {
          transform: translateX(100px);
        }
      `}</style>
      <div
        className={`box ${isAnimating ? 'move' : ''}`}
        onClick={handleAnimation}
      >
        Click me
      </div>
    </div>
  );
}

export default Page;
