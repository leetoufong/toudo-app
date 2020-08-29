import React from 'react';
import './AddTodo.scss';

export default function AddTodo(props) {
  const {handleAddTodo} = props;

  return (
    <form onSubmit={handleAddTodo} className="AddTodo form">
      <label htmlFor="add-todo" className="form-label">Add a todo:</label>
      <input type="text" id="add-todo" className="form-control" />
      <button className="AddTodo-btn btn" title="Add a todo"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg></button>
    </form>
  )
}
