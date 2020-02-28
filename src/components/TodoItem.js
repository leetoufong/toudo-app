import React, {useState} from 'react';

export default function TodoItem() {
  const [isEditMode, setIsEditMode] = useState(false);

  function handleCompleteTodo() {
    
  }

  function handleDeleteTodo() {

  }

  function handleEditTodo(e) {
    if (!isEditMode) {
      setIsEditMode(true);
    } else {

      setIsEditMode(false);
    }
  }

  return (
    <li>
      <input type="checkbox" onChange={() => handleCompleteTodo()} />
      {isEditMode ? (
        <input value="Test edit mode" />
      ) : (
        'Test'
      )}
      <button onClick={handleEditTodo}>{!isEditMode ? 'edit' : 'save'}</button>
      <button onClick={() => handleDeleteTodo()}>delete</button>
    </li>
  )
}
