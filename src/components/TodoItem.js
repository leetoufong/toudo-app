
import React from 'react';
import './TodoItem.scss'

export default function TodoItem(props) {
  const {index, title, completed, onClick} = props; // destructuring for easier handling

  function handleCompleteTodo(index) {
    onClick[0](index);
  }
  
  function handleDeleteTodo(index) {
    onClick[1](index);
  }

  return (

    <li className="TodoItem">
      <h2 className="title">{completed ? <strike>{title}</strike> : title}</h2>

      <nav className="nav">
        {completed ? (
          <button className="btn" title="Complete todo" onClick={ () => { handleCompleteTodo(index) } }>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>
          </button>
        ) : (
          <button className="btn" title="Complete todo" onClick={ () => { handleUndoCompleteTodo(index) } }>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
          </button>
        )}
        <button className="btn" title="Delete todo" onClick={ () => { handleDeleteTodo(index) } }>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </button>
      </nav>
    </li>
    
  )
}
