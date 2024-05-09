import React, { useState } from 'react';
import AtomButton from '../atoms/AtomButton';
import { TodoFormSchema } from '@/lib/types/common';
import { addTodoItem } from '@/lib/idb_actions';
import MoleculesTodoItem from '../molecules/MoleculesTodoItem';
import { useTodoContext } from '@/contexts/TodoContext';

/**
 * Component representing a list of todo items.
 * Fetches todo data from context, allows adding new todos, and renders todo items.
 */
const OrganismsTodoList = () => {
  // Access todo context for syncing data and retrieving todo items
  const { syncTodosData, todoDatas } = useTodoContext();

  // State for managing form data
  const [formData, setFormData] = useState<TodoFormSchema>({
    todo_name: '',
    todo_type: '',
  });

  /**
   * Function to handle form input changes.
   * Updates the formData state with the input values.
   * @param e - The change event triggered by input elements.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /**
   * Function to handle form submission.
   * Adds a new todo item to the database and syncs data.
   * @param e - The form submission event.
   */
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addTodoItem(formData);
    await syncTodosData();
  }

  return (
    <>
      <h2 className="text-xl mb-4">Todo list app</h2>
      <form onSubmit={submit} method="post" className='todo-form'>
        <input
          type="text"
          value={formData.todo_name}
          onChange={handleChange}
          name="todo_name"
          className="border p-4 border-gray-500 rounded-md h-[46px] mr-4"
          required
        />
        <select
          value={formData.todo_type}
          onChange={handleChange}
          className="border py-0 px-4 border-gray-500 rounded-md h-[46px] mr-4"
          name="todo_type"
          required
        >
          <option value="" disabled>
            --
          </option>
          <option value="work">Work</option>
          <option value="hobby">Hobby</option>
          <option value="other">Other</option>
        </select>
        <AtomButton color="primary" type="submit">
          Submit
        </AtomButton>
      </form>
      <div className="mt-10">
        {/* Render each todo item */}
        {todoDatas.map((item, index) => (
          <MoleculesTodoItem
            todo_name={item.todo_name}
            todo_type={item.todo_type}
            item_id={item.id}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default OrganismsTodoList;
