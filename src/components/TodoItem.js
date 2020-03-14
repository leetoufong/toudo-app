
import React from 'react';
import './TodoItem.scss'

export default function TodoItem(props) {
  const {index, title, completed, onClick, onChange} = props; // destructuring for easier handling

  function handleDeleteTodo(index) {
    onClick(index);
  }

  return (
    <li className="TodoItem">
      <span>{title}</span>
      <button className="delete" onClick={() => {handleDeleteTodo(index)}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>  
    </li>
  )
}
