
import React from 'react';

export const Logo: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Background Shield/Circle Shape */}
        <circle cx="50" cy="50" r="48" fill="currentColor" className="text-blue-600 opacity-10" />
        <path
          d="M50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5ZM50 88C29.0132 88 12 70.9868 12 50C12 29.0132 29.0132 12 50 12C70.9868 12 88 29.0132 88 50C88 70.9868 70.9868 88 50 88Z"
          fill="currentColor"
          className="text-blue-600"
        />
        
        {/* Stylized S and L representation */}
        <path
          d="M35 35C35 32.2386 37.2386 30 40 30H60C62.7614 30 65 32.2386 65 35V45C65 47.7614 62.7614 50 60 50H45V60C45 62.7614 47.2386 65 50 65H65"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        />
        
        {/* Growth/Revenue Bars */}
        <rect x="70" y="45" width="6" height="25" rx="3" fill="#F59E0B" />
        <rect x="78" y="35" width="6" height="35" rx="3" fill="#F59E0B" />
        
        {/* Center Node */}
        <circle cx="50" cy="50" r="6" fill="#F59E0B" className="animate-pulse" />
      </svg>
    </div>
  );
};
