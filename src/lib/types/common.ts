/**
 * Represents the color schema for buttons.
 */
export type ColorSchema = 'primary' | 'secondary' | 'tertiary';

/**
 * Represents the schema for a todo item.
 */
export interface TodoFormSchema {
  todo_name: string;
  todo_type: string;
  id?: number;
}
