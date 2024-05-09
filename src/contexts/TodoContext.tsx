import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { TodoFormSchema } from "@/lib/types/common";
import { getTodosData, removeTodoItem } from "@/lib/idb_actions";

/**
 * Defines the properties expected in the context provider.
 */
interface TodoContextProps {
  children: ReactNode; // Define children prop
}

/**
 * Creates a context for managing todo-related data and functions.
 */
export const TodoContext = createContext<{
  todoDatas: TodoFormSchema[]; // Array of todo items
  syncTodosData: () => void; // Function to sync todo data
  removeTodoItem: (id: number | undefined) => void; // Function to remove a todo item
} | undefined>(undefined);

/**
 * Custom hook to access the todo context.
 * @throws Error if used outside the TodoProvider.
 * @returns The todo context.
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

/**
 * Component to provide the todo context to its children.
 * @param children - The child elements to be wrapped by the provider.
 * @returns A provider component.
 */
export const TodoProvider: React.FC<TodoContextProps> = ({ children }) => {
  const [todoDatas, setTodoDatas] = useState<TodoFormSchema[]>([]);

  /**
   * Function to synchronize todo data from the database.
   */
  const syncTodosData = async () => {
    try {
      const todosData: TodoFormSchema[] = await getTodosData();
      setTodoDatas(todosData);
    } catch (error) {
      console.error('Error fetching todos data:', error);
    }
  };

  // Call syncTodosData after component mounts
  useEffect(() => {
    syncTodosData();
  }, []);

  /**
   * Function to remove a todo item.
   * @param id - The ID of the todo item to remove.
   */
  const handleRemoveTodoItem = async (id: number | undefined) => {
    try {
      if (typeof id !== 'undefined') {
        await removeTodoItem(id);
        await syncTodosData();
      }
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  // Provide the context value to its children
  return (
    <TodoContext.Provider value={{ todoDatas, syncTodosData, removeTodoItem: handleRemoveTodoItem }}>
      {children}
    </TodoContext.Provider>
  );
};
