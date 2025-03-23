
import React from "react";

const ChatPreviewTypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-medical-purple to-medical-red flex-shrink-0 flex items-center justify-center">
        <span className="text-white font-semibold text-xs">LA</span>
      </div>
      <div className="bg-gradient-to-r from-medical-purple/10 to-medical-red/10 p-3 rounded-2xl rounded-tl-none w-16">
        <div className="flex space-x-1 justify-center items-center">
          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreviewTypingIndicator;
