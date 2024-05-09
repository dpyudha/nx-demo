import React from 'react';
import AtomButton from '../atoms/AtomButton';
import AtomCard from '../atoms/AtomCard';
import { removeTodoItem } from '@/lib/idb_actions';
import { useTodoContext } from '@/contexts/TodoContext';

/**
 * Component representing a single todo item.
 * Renders the todo name, type, and a delete button.
 * Allows users to delete the todo item.
 * @param todo_name - The name of the todo item.
 * @param todo_type - The type of the todo item.
 * @param item_id - The ID of the todo item.
 */
const MoleculesTodoItem = ({ todo_name, todo_type, item_id }: { todo_type: string; todo_name: string; item_id: number | undefined }) => {
  // Access todo context for syncing data
  const { syncTodosData } = useTodoContext();

  /**
   * Function to delete a todo item.
   * Shows a confirmation dialog before deleting the item.
   * @param id - The ID of the todo item to be deleted.
   */
  function deleteItem(id: number | undefined) {
    if (typeof id === 'undefined') return;
    if (confirm('Are you sure ?')) {
      removeTodoItem(id); // Remove the todo item from the database
      syncTodosData(); // Sync todo data after deletion
    }
  }

  return (
    <AtomCard>
      <div className="grid grid-cols-3 content-center todo-item">
        <div className="flex items-center">
          <h2>{todo_name}</h2>
        </div>
        <div className="flex items-center">
          <h2>{todo_type}</h2>
        </div>
        <div className="flex items-center">
          <AtomButton color="secondary" onClick={() => deleteItem(item_id)}>
            DELETE
          </AtomButton>
        </div>
      </div>
    </AtomCard>
  );
};

export default MoleculesTodoItem;
