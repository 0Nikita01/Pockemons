import s from './style.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const MENU = [
    {
        title: 'HOME',
        to: '/home',
    },    
    {
        title: 'GAME',
        to: '/game',
    },
    {
        title: 'ABOUT',
        to: '/about',
    },
    {
        title: 'CONTACT',
        to: '/contact',
    },
]

const Menu = ({bClass, onClickLinks}) => {
    return (
        <div className={cn(s.menuContainer , {[s.active]: bClass === true}, {[s.deactive]: bClass === false})}>
        <div className={s.overlay}/>
        <div className={s.menuItems}>
            <ul>
                {
                    MENU.map(({title, to}, index) => (
                        <li key={index}>
                            <Link to={to} onClick={onClickLinks}>
                                {title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        </div>
    );
};

export default Menu;