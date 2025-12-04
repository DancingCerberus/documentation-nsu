import { NavLink } from 'react-router-dom';
import '../App.css';

function Sidebar() {
    return (
        <aside>
            <nav className="navbar">
                <ul className="navbar__list">
                    <li className="navbar__list-item">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Введение
                        </NavLink>
                    </li>
                    <li className="navbar__list-item">
                        <NavLink
                            to="/description"
                            className={({ isActive }) => isActive ? 'active navbar__link--description' : 'navbar__link--description'}
                        >
                            Описание
                        </NavLink>
                    </li>
                    <li className="navbar__list-item">
                        <NavLink
                            to="/posts"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Посты
                        </NavLink>
                    </li>
                    <li className="navbar__list-item">
                        <NavLink
                            to="/conclusion"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Заключение
                        </NavLink>
                    </li>
                    <li className="navbar__list-item">
                        <NavLink
                            to="/api-ui"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            API
                        </NavLink>
                    </li>
                    <li className="navbar__list-item">
                        <NavLink
                            to="/stats"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Статистика
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
