'use client'
/**
 * This module provides functions to interact with an IndexedDB database
 * storing todo items.
 */

import { openDB, IDBPDatabase, DBSchema } from 'idb';
import { TodoFormSchema } from './types/common';

/**
 * Defines the structure of the todo database schema.
 */
interface TodoDB extends DBSchema {
  todos: {
    key: number;
    value: TodoFormSchema;
    indexes: {
      'by-todotype': string;
    };
  };
}

const dbName = 'todos-db';

/**
 * Initializes the todo database by creating object stores and indexes.
 * @returns The opened todo database.
 */
async function initDatabase(): Promise<IDBPDatabase<TodoDB>> {
  return await openDB<TodoDB>(dbName, 1, {
    upgrade(db) {
      const todoDatas = db.createObjectStore('todos', {
        keyPath: 'id',
        autoIncrement: true,
      });
      todoDatas.createIndex('by-todotype', 'todo_type');
    },
  });
}

/**
 * Opens the todo database, initializing it if it doesn't exist.
 * @returns The opened todo database.
 */
async function getTodosDb(): Promise<IDBPDatabase<TodoDB>> {
  await initDatabase(); // Initialize the database if it doesn't exist
  const openDb = await openDB<TodoDB>(dbName, 1);
  return openDb;
}

/**
 * Retrieves all todo items from the database.
 * @returns A promise resolving to an array of todo items.
 */
export async function getTodosData(): Promise<TodoFormSchema[]> {
  const db = await getTodosDb();
  return await db.getAllFromIndex('todos', 'by-todotype');
}

/**
 * Adds a new todo item to the database.
 * @param values - The todo item to add.
 * @returns A promise resolving to a boolean indicating success or failure.
 */
export async function addTodoItem(values: TodoFormSchema): Promise<boolean> {
  const db = await getTodosDb();
  const tx = db.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');

  try {
    await store.add(values);
    await tx.done;
    return true;
  } catch (error) {
    console.error('Error adding todo item:', error);
    throw error;
  }
}

/**
 * Removes a todo item from the database.
 * @param id - The ID of the todo item to remove.
 */
export async function removeTodoItem(id: number): Promise<void> {
  const db = await getTodosDb();
  const tx = db.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');

  try {
    await store.delete(id);
    await tx.done;
  } catch (error) {
    console.error('Error removing todo item:', error);
    throw error;
  }
}

/**
 * Updates a todo item in the database.
 * @param id - The ID of the todo item to update.
 * @param updatedValues - The new values to update the todo item with.
 */
export async function updateTodoItem(
  id: number,
  updatedValues: Partial<TodoFormSchema>
): Promise<void> {
  const db = await getTodosDb();
  const tx = db.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');

  try {
    const existingItem = await store.get(id);
    if (existingItem) {
      const updatedItem = { ...existingItem, ...updatedValues };
      await store.put(updatedItem);
    } else {
      throw new Error(`Todo item with id ${id} not found.`);
    }
    await tx.done;
  } catch (error) {
    console.error('Error updating todo item:', error);
    throw error;
  }
}
