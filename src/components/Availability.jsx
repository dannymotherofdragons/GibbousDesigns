import React, { useState } from "react";

const Availability = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 bg-letuce dark:bg-chocolate bg-opacity-50 text-white p-4 text-xs border border-olive dark:border-pinkish">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <span>MAY</span>
            <span className="text-right">2 SPOTS</span>
            <span>JUNE</span>
            <span className="text-right">2 SPOTS</span>
            <span>JULY</span>
            <span className="text-right">2 SPOTS</span>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="w-[100px] h-[26px] border font-extralight border-olive bg-letuce dark:border-pinkish dark:bg-dirt text-xs text-white flex items-center justify-center transition-colors font-bagnard"
      >
        ● AVAILABLE
      </button>
    </div>
  );
};

export default Availability;
