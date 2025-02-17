import styleHeader from './style.module.css';

const Header = ({title, descr, clickButton}) => {
    return (
        <header className={styleHeader.root}>
            <div className={styleHeader.forest}></div>
            <div className={styleHeader.silhouette}></div>
            <div className={styleHeader.moon}></div>
            <div className={styleHeader.container}>
                {title ? (<h1>{title}</h1>) : null}
                {descr ? (<p>{descr}</p>) : null}
                <button onClick={clickButton}>
                    Start Game
                </button>
            </div>
        </header>
    )
}

export default Header;