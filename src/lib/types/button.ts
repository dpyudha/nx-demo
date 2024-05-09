import { ColorSchema } from "./common";

/**
 * Represents the schema for a button component.
 */
export interface ButtonSchema {
  color: ColorSchema; // The color schema for the button
  to?: string | undefined; // Optional URL to navigate to when clicked
}
