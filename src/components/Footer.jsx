import AddTodo from './AddTodo';
import './Footer.scss';

export default function Header(props) {
    const { version } = props;

    return (
        <footer role="contentinfo">
            <small>Version {APP_VERSION}</small>
        </footer>
    )
}
