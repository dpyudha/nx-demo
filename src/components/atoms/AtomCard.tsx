import React from "react";

/**
 * Component representing a card with rounded corners and border.
 * 
 * @param children The content to be placed inside the card.
 */
const AtomCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md p-6 border mb-5">
      {children}
    </div>
  );
};

export default AtomCard;
