import React from 'react';

interface LogoProps {
  size?: number; // Controls the size of the image and font
  layout?: 'row' | 'col'; // Determines if the layout is row or column
  showText?: boolean
}

export function Logo({ size = 6, layout = 'row', showText = true }: LogoProps) {
  return (
    <div
      className={`inline-flex ${
        layout === 'row' ? 'flex-row' : 'flex-col'
      } items-center gap-${size > 8 ? '3' : '2'}`}
    >
      <div
        className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
        style={{
          padding: size, // Padding scales with size
        }}
      >
        <div
          style={{
            width: `${size * 4}px`,
            height: `${size * 4}px`,
          }}
        >
          <img
            src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
            alt="HouseGPT"
            className="w-full h-full"
          />
        </div>
      </div>
      {showText && (<h1
        className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent -mt-1"
        style={{
          fontSize: `${size * 2}px`, // Increased text size
          lineHeight: `${size * 2}px`, // Balanced line height
          paddingTop: layout === 'col' ? `${size * 0.3}px` : '0',
        }}
      >
        HouseGPT
      </h1>)}
    </div>
  );
}
