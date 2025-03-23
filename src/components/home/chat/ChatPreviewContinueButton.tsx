
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ChatPreviewContinueButton = () => {
  return (
    <Link to="/login">
      <Button className="w-full mt-3 bg-gradient-to-r from-medical-purple to-medical-red hover:opacity-90 group">
        <span>Continue Conversation</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );
};

export default ChatPreviewContinueButton;
