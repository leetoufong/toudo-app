import React from 'react';
import './AddTodo.scss';

export default function AddTodo(props) {
  const {error, action} = props; // destructuring for easier handling

  function handleAddTodo(event) {
    action(event);
  }

  return (
    <form className="AddTodo" onSubmit={handleAddTodo}>
      <label htmlFor="add-todo" className="form-label">Add a todo:</label>
      <input type="text" id="add-todo" className="input-control" />
      <button type="submit" className="btn" title="Click to add todo">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </button>
      {error && <span className="error">Opps, try again...</span>}
    </form>
  )
}
