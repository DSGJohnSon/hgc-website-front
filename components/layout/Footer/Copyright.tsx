import React from "react";
import Link from "next/link";
import { LuCopyright } from "react-icons/lu";

interface CopyrightProps {
  text: string;
}

const Copyright: React.FC<CopyrightProps> = ({ text }) => {
  return (
    <div className="bg-gray-900 mt-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div
            className="inline-block bg-gray-900 relative font-poppins py-4"
          >
            <p className="text-white text-xs sm:text-sm flex items-center gap-2">
              <LuCopyright className="sm:w-4 sm:h-4 w-3 h-3" />
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
