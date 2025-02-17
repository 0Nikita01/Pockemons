import styleFooter from './style.module.css';

const Footer = () => {
    return (
        <footer>
            <div className={styleFooter.wrapper}>
                <h3>THANKS FOR VISITING</h3>
                <p>© 2021 #ReactMarathon.</p>
            </div>
        </footer>
    )
}

export default Footer;