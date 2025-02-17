import s from './style.module.css';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import {ReactComponent as LoginSVG} from "../../assets/login.svg";
import {ReactComponent as UserSVG} from "../../assets/user.svg";
import {ReactComponent as PokeballSVG} from "../../assets/pokeball.svg";
import { useSelector } from 'react-redux';
import { selectLocalID, selectUserLoading } from '../../store/user';

const Navbar = ({onClickHaburger, bClass, bgActive = false, onClickLogin}) => {
	const history = useHistory();
	const isLoadingUser = useSelector(selectUserLoading);
	const localId = useSelector(selectLocalID);
    const handlerClick = () => {
        onClickHaburger();
    }

	const handleClickUser = () => {
		history.replace('/user');
	}
    return (
        <nav id={s.navbar} className={cn({[s.bgActive]: bgActive})}>
        <div className={s.navWrapper}>
			<p className={s.brand}>
			LOGO
			</p>
			<div className={s.loginAndMenu}>
				{
					(!isLoadingUser && !localId) && (
						<div 
							className={s.loginWrap}
							onClick={onClickLogin}
						>		
							<LoginSVG />
						</div>
				)}
				{
					(!isLoadingUser && localId) && (
						<div 
							className={s.loginWrap}
							onClick={handleClickUser}
						>
							<UserSVG />
						</div>
				)}
				<div className={cn(s.menuButton, {[s.active]: bClass})} onClick={handlerClick}>
					<span />
				</div>
			</div>
        </div>
      </nav>
    );
};

export default Navbar;