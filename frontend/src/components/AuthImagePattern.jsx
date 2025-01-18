import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-black p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-red-700/50 ${
                i % 2 === 0 ? "animate-glitch" : ""
              }`}
              style={{
                animationDuration: `${Math.random() * 1.5 + 0.5}s`,
              }}
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold text-red-400 mb-4">{title}</h2>
        <p className="text-red-200">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
