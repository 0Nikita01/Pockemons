import s from "./style.module.css";
import cn from 'classnames';
import {ReactComponent as SpinnerSVG} from "../../assets/pokeball.svg";


const Spinner = ({halfHidden = false}) => {
    return (
        <div className={cn(s.wrapper, {[s.halfhidden] : halfHidden})}>
            <div className={s.spinner}>
                <SpinnerSVG />
            </div>
        </div>
    )
}

export default Spinner;