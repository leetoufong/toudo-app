import React from 'react';

<<<<<<< HEAD
export default function TodoItem() {

  function handleDeleteTodo(itemIndex) {
    console.log('Hi');
  }

  return (
    <li>
      <input value="Test edit mode" />
      <button onClick={() => handleDeleteTodo()}>delete</button>
    </li>
=======
export default function TodoItem(props) {
  const {todos} = props;

  function handleDelete(itemIndex) {
    console.log('Deleting: ', itemIndex);
  }

  return (
    <>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" />
          {todo.title}
          <button onClick={() => handleDelete(index)}>delete</button>
        </li>
      ))}
    </>
>>>>>>> ef8f40d7edb6e827b7ebb242b048f040e4e937c6
  )
}
