
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
      <button onClick={() => {handleDeleteTodo(index)}}>delete</button>  
    </li>
  )
}
