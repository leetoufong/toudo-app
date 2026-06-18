import AddTodo from './AddTodo';
import './Header.scss';

export default function Header(props) {
    const { todos, setTodos } = props;

    return (
        <header className="App-header">
            <h1 className="App-title">Toudo App</h1>
            <AddTodo todos={todos} setTodos={setTodos} />
        </header>
    )
}
