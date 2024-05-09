import React, { ButtonHTMLAttributes } from "react";
import { ButtonSchema } from "@/lib/types/button";
import { ColorSchema } from "@/lib/types/common";
import Link from "next/link";

/**
 * Defines the CSS classes for different button colors.
 */
export const ButtonThemeConstant: Record<ColorSchema, string> = {
  primary: 'border-indigo-600 bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 active:text-indigo-500',
  secondary: 'border-red-600 bg-red-600 text-white hover:bg-transparent hover:text-red-600 active:text-red-500',
  tertiary: 'border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white active:text-white'
}

/**
 * Defines the props for the AtomButton component.
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonSchema;

/**
 * Represents a button component with customizable color and behavior.
 * 
 * @param color The color schema of the button (primary, secondary, or tertiary).
 * @param onClick The function to be called when the button is clicked.
 * @param children The content of the button.
 * @param type The type of button.
 * @param to The link to navigate to when the button is clicked.
 */
const AtomButton = ({ color, onClick, children, type, to }: ButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      {to ? (
        <Link href={to} className={`px-6 py-3 inline-block rounded border text-sm font-medium focus:outline-none focus:ring ${ButtonThemeConstant[color ?? 'primary']}`}>{children}</Link>
      ) : (
        <button
          type={type ? type : 'button'}
          className={`px-6 py-3 inline-block rounded border text-sm font-medium focus:outline-none focus:ring ${ButtonThemeConstant[color ?? 'primary']}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default AtomButton;
