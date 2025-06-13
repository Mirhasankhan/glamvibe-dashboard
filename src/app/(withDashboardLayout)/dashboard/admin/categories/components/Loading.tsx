import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-400 h-60 w-full rounded-xl animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Loading;
