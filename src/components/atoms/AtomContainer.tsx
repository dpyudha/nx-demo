import React from "react";

/**
 * Component representing a container for content.
 * It provides padding and centers its content horizontally.
 * 
 * @param children The content to be placed inside the container.
 */
const AtomContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto pt-12 pb-16 lg:pb-20 lg:px-24 md:px-16 sm:px-8 px-8">
      {children}
    </section>
  );
};

export default AtomContainer;
