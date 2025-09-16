import { NavLink } from 'react-router-dom';
import '../App.css'; // если хочешь выносить стили отдельно

function Sidebar() {
    return (
        <aside>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Введение
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/description"
                            className={({ isActive }) => isActive ? 'active navbar-description' : 'navbar-description'}
                        >
                            Описание
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/conclusion"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Заключение
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
