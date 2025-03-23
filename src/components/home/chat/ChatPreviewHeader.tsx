
import React from "react";

const ChatPreviewHeader = () => {
  return (
    <div className="bg-gradient-to-r from-medical-purple to-medical-red p-4 flex items-center gap-2 text-white">
      <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
        <span className="text-white font-semibold text-xs">LA</span>
      </div>
      <span className="font-medium text-sm">1-800-LENY-AI</span>
    </div>
  );
};

export default ChatPreviewHeader;
