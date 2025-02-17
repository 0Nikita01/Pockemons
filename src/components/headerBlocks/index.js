import s from './style.module.css';

import { ReactComponent as ReactLogo } from '../../assets/logo.svg';

const HeaderBlock = ({title, hidebackground = false, descr}) => {
    const styleRoot = hidebackground ? {backgroundImage: 'none'} : {};
    return (
        <div className={s.root} style={styleRoot}>
            <div>
                <ReactLogo />
                {title ? 
                (<h1 className={s.header}>{title}</h1>) : null}
                <p>{descr}</p>
            </div>
        </div>
    )
}

export default HeaderBlock;