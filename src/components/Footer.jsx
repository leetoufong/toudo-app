import AddTodo from './AddTodo';
import './Footer.css';

export default function Header(props) {
    const { version } = props;

    return (
        <footer role="contentinfo">
            <small>Version {APP_VERSION}</small>
        </footer>
    )
}
