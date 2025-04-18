import Button from '../components/Button';

const TodoItemNav = (props) => {
    const { todo, handleTodoStatus, handleDeleteTodo, editMode } = props;

    return (
        <nav className="TodoItem-nav">
            <Button onClick={() => handleTodoStatus(todo)} variant={`TodoItem`} title={`Complete todo`} disabled={editMode ? true : false}>
                {!todo.completed ? (
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><title>Complete todo</title><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e3e3e3" viewBox="0 -960 960 960"><title>Uncomplete todo</title><path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/></svg>
                )}
            </Button>
            
            <Button onClick={() => handleDeleteTodo(todo)} variant={`TodoItem`} title={`Delete todo`} disabled={editMode ? true : false}>
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </Button>
        </nav>
    )
}

export default TodoItemNav